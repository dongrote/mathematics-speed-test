import _ from 'lodash';
import React from 'react';
import { Grid, Card, Form, Input } from 'semantic-ui-react';

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

const SpeedTest = ({testNumbers, testOperation, totalQuestionCount, currentQuestionNumber}) => {
  const question = generateQuestion(testNumbers.filter(n => n.selected).map(n => n.value), testOperation);
  return (
    <Grid centered>
      <Card>
        <Card.Content>
          <Card.Meta>{currentQuestionNumber} / {totalQuestionCount}</Card.Meta>
          <Card.Header>{question.left}</Card.Header>
          <Card.Header>{question.operation} {question.right}</Card.Header>
          <Card.Header><hr /></Card.Header>
          <Form>
            <Input size='massive' focus placeholder={question.correctAnswer}></Input>
          </Form>
        </Card.Content>
      </Card>
    </Grid>
  );
};

export default SpeedTest;
