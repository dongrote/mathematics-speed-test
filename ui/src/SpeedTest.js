import _ from 'lodash';
import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';

const generateQuestion = (numbers, operation) => {
  const q = {
    left: _.sample(numbers),
    right: _.sample(numbers),
    operation: operation === '*' ? '×' : '÷',
  };
  q.correctAnswer = operation === '*'
    ? q.left * q.right
    : q.left / q.right;
  return q;
};

class SpeedTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'test',
      remainingTime: props.permittedTime,
      answers: [],
      currentQuestionNumber: 1,
      question: generateQuestion(props.testNumbers.filter(n => n.selected).map(n => n.value), props.testOperation),
    };
  }

  onSubmitAnswer = (question, answer) => {
    let display;
    const updatedAnswers = this.state.answers.slice(),
      nextQuestionNumber = this.state.currentQuestionNumber + 1,
      correct = Number(question.correctAnswer) === Number(answer),
      nextQuestion = generateQuestion(this.props.testNumbers.filter(n => n.selected).map(n => n.value), this.props.testOperation);
    if (answer === null) {
      display = 'time-out';
    } else {
      display = correct ? 'correct' : 'incorrect';
    }
    updatedAnswers.push({question, answer, correct});
    if (nextQuestionNumber > this.props.totalQuestionCount) {
      return this.props.onTestComplete(updatedAnswers);
    }
    this.setState({
      display,
      question: nextQuestion,
      answers: updatedAnswers,
      currentQuestionNumber: nextQuestionNumber,
    });
    setTimeout(() => this.setState({display: 'test'}), display === 'incorrect' ? 3000 : 500);
  }

  render() {
    const {totalQuestionCount} = this.props;
    const {question, display, currentQuestionNumber} = this.state;
    console.log('display', display);
    if (display === 'time-out') {
      return (
        <Grid centered>
          <Grid.Row>
            <Header as='h1'>Time's Up!</Header>
          </Grid.Row>
        </Grid>
      );
    }
    if (display === 'correct') {
      return (
        <Grid centered>
          <Grid.Row>
            <Header as='h1'>Correct!</Header>
          </Grid.Row>
        </Grid>
      );
    }
    if (display === 'incorrect') {
      return (
        <Grid centered>
          <Grid.Row>
            <Header as='h1'>Incorrect!</Header>
          </Grid.Row>
          <Grid.Row>
            The correct answer is {question.correctAnswer}
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
          totalQuestionCount={totalQuestionCount}
        />
      </Grid>
    );
  }
}

export default SpeedTest;
