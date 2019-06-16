import _ from 'lodash';
import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';

const generateQuestions = (numbers, operation) => {
  const questions = [];
  _.each(numbers, left => {
    for(let right = 0; right < 13; right++) {
      const correctAnswer = operation === '×' ? left * right : left / right;
      questions.push({left, right, operation, correctAnswer});
    }
  });
  return questions;
};

class SpeedTest extends Component {
  constructor(props) {
    super(props);
    const questions = _.shuffle(generateQuestions(props.testNumbers, props.testOperation));
    this.state = {
      display: 'test',
      remainingTime: props.permittedTime,
      answers: [],
      currentQuestionNumber: 1,
      questions,
      question: _.first(questions),
    };
  }

  onSubmitAnswer = (question, answer) => {
    let display;
    if (this.state.display !== 'test') {
      // may have gotten here via expired setTimeout; ignore it
      return;
    }
    const updatedAnswers = this.state.answers.slice(),
      nextQuestionNumber = this.state.currentQuestionNumber + 1,
      correct = answer === null ? false : Number(question.correctAnswer) === Number(answer),
      nextQuestion = this.state.questions[this.state.currentQuestionNumber];
    if (answer === null) {
      display = 'time-out';
    } else {
      display = correct ? 'correct' : 'incorrect';
    }
    updatedAnswers.push({question, answer, correct});
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
  }

  render() {
    const {question, display, currentQuestionNumber} = this.state;
    if (display === 'time-out' || display === 'incorrect') {
      return (
        <Grid centered>
          <Grid.Row>
            <Header size='huge'>{display === 'time-out' ? `Time's Up!` : `Incorrect!`}</Header>
          </Grid.Row>
          <Grid.Row>
            <Header size='medium'>
              {_.last(this.state.answers).question.left} {_.last(this.state.answers).question.operation} {_.last(this.state.answers).question.right} = {_.last(this.state.answers).question.correctAnswer}
            </Header>
          </Grid.Row>
        </Grid>
      );
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
