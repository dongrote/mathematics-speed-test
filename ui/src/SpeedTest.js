import _ from 'lodash';
import React, { Component } from 'react';
import { Grid, Card, Form, Progress } from 'semantic-ui-react';
import NumberInput from './NumberInput';

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
      remainingTime: props.permittedTime,
      question: generateQuestion(props.testNumbers.filter(n => n.selected).map(n => n.value), props.testOperation),
    };
  }

  tick = () => {
    let remainingTime = this.state.remainingTime - 1;
    if (remainingTime === -1) {
      this.props.onTimerExpire(this.question, null);
      remainingTime = this.props.permittedTime;
    }
    this.setState({remainingTime});
  }

  render() {
    const {totalQuestionCount, currentQuestionNumber, onSubmitAnswer, permittedTime} = this.props;
    const {remainingTime, question} = this.state;
    setTimeout(this.tick, 1000);
    return (
      <Grid centered>
        <Card>
          <Card.Content>
            <Card.Meta><Progress indicating progress='value' value={remainingTime} total={permittedTime} /></Card.Meta>
            <Card.Header>{question.left}</Card.Header>
            <Card.Header>{question.operation} {question.right}</Card.Header>
            <Card.Header><hr /></Card.Header>
            <Form>
              <NumberInput size='massive' placeholder={question.correctAnswer} onSubmit={({value}) => onSubmitAnswer(question, value)}></NumberInput>
            </Form>
          </Card.Content>
          <Card.Content extra>
            {currentQuestionNumber} / {totalQuestionCount}
          </Card.Content>
        </Card>
      </Grid>
    );
  }
}

export default SpeedTest;
