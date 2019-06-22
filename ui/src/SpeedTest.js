import _ from 'lodash';
import Promise from 'bluebird';
import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';
import IncorrectAnswerCard from './IncorrectAnswerCard';
import CheckingAnswerCard from './CheckingAnswerCard';

const graphql = (query, variables) => fetch('/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query, variables}),
})
.then(res => res.json())
.then(({data}) => data);

const fetchTerms = (number, operation) => graphql(`query ($number: Int! $operation: String!) {
  terms: ArithmeticQuestionTerms(number: $number operation: $operation) {
    left right operation
  }
}`, {number, operation})
.then(({terms}) => terms);

const fetchHumanReadableQuestion = ({left, right, operation}) => graphql(`query ($left: Int! $operation: String! $right: Int!) {
  humanReadable: OpenEndedArithmeticQuestion(leftTerm: $left operation: $operation rightTerm: $right)
}`, {left, right, operation})
.then(({humanReadable}) => humanReadable);

const generateQuestions = (numbers, operation) => Promise
  .map(numbers, number => fetchTerms(number, operation))
  .then(_.flatten)
  .then(termsArray => Promise
    .map(termsArray, terms => fetchHumanReadableQuestion(terms)
      .then(humanReadableQuestion => _.set(terms, 'question', humanReadableQuestion))));

const checkAnswer = ({left, right, operation}, answer) => graphql(`query ($left: Int! $operation: String! $right: Int! $answer: Int) {
  AnswerCheck: checkOpenEndedArithmeticQuestionAnswer(leftTerm: $left operation: $operation rightTerm: $right answer: $answer) {
    question correct submittedAnswer correctAnswer
  }
}`, {left, operation, right, answer})
.then(({AnswerCheck}) => AnswerCheck);

class SpeedTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'test',
      remainingTime: props.permittedTime,
      answers: [],
      currentQuestionNumber: 1,
      questions: [],
      question: null,
    };
  }

  componentDidMount() {
    generateQuestions(this.props.testNumbers, this.props.testOperation)
      .then(termsArray => {
        const questions = _.shuffle(termsArray);
        this.setState({
          questions,
          question: _.first(questions),
        });
      })
      .catch(console.error);
  }

  onSubmitAnswer = (question, answer) => {
    if (this.state.display !== 'test' && this.state.display !== 'check') {
      // may have gotten here via expired setTimeout; ignore it
      return;
    }
    this.setState({display: 'check'});
    checkAnswer(question, Number(answer))
      .then(answerCheck => {
        let display;
        const updatedAnswers = this.state.answers.slice(),
          nextQuestionNumber = this.state.currentQuestionNumber + 1,
          nextQuestion = this.state.questions[this.state.currentQuestionNumber];
        if (answer === null) {
          display = 'time-out';
        } else {
          display = answerCheck.correct ? 'correct' : 'incorrect';
        }
        updatedAnswers.push(answerCheck);
        if (nextQuestionNumber > this.state.questions.length) {
          return this.props.onTestComplete(updatedAnswers);
        }    
        this.setState({
          display,
          question: nextQuestion,
          answers: updatedAnswers,
          currentQuestionNumber: nextQuestionNumber,
        });
        setTimeout(() => this.setState({display: 'test'}), display === 'correct' ? 500 : 3000);
      })
      .catch(console.error);
  }

  render() {
    const {question, display, currentQuestionNumber} = this.state;
    if (display === 'check') {
      return <CheckingAnswerCard />
    }
    if (display === 'time-out' || display === 'incorrect') {
      return <IncorrectAnswerCard
        message={display === 'time-out' ? `Time's Up!` : `Incorrect!`}
        correction={`${_.last(this.state.answers).question} ${_.last(this.state.answers).correctAnswer}`}
      />
    }
    if (display === 'correct') {
      return (
        <Grid centered>
          <Grid.Row>
            <Header size='huge'>Correct!</Header>
          </Grid.Row>
        </Grid>
      );
    }
    return (
      <Grid centered>
        <QuestionCard
          question={question}
          onSubmitAnswer={this.onSubmitAnswer}
          currentQuestionNumber={currentQuestionNumber}
          totalQuestionCount={this.state.questions.length}
        />
      </Grid>
    );
  }
}

export default SpeedTest;
