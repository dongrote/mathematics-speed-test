import React from 'react';
import NumberInput from './NumberInput';
import Timer from './Timer';

const QuestionCard = ({question, onSubmitAnswer, currentQuestionNumber, totalQuestionCount}) => (
  <Card>
    <Card.Content>
      <Card.Meta><Timer permittedTime={5} /></Card.Meta>
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
);

export default QuestionCard;
