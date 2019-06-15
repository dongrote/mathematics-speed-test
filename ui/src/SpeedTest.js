import _ from 'lodash';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
      remainingTime: props.permittedTime,
      question: ,
    };
  }

  render() {
    const {testNumbers, testOperation, totalQuestionCount, currentQuestionNumber, onSubmitAnswer, permittedTime} = this.props;
    const {remainingTime, question} = this.state;
    return (
      <Grid centered>
        <QuestionCard
          question={generateQuestion(testNumbers.filter(n => n.selected).map(n => n.value), testOperation)}
          onSubmitAnswer={onSubmitAnswer}
          currentQuestionNumber={currentQuestionNumber}
          totalQuestionCount={totalQuestionCount}
        />
      </Grid>
    );
  }
}

export default SpeedTest;
