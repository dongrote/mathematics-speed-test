import React from 'react';
import { Header, Card, Form, Progress } from 'semantic-ui-react';
import NumberInput from './NumberInput';
import Timer from './Timer';

const QuestionCard = ({question, onSubmitAnswer, currentQuestionNumber, totalQuestionCount}) => (
  <Card>
    <Card.Content>
      <Card.Meta><Timer permittedTime={10} onExpired={() => onSubmitAnswer(question, null)} /></Card.Meta>
      <Card.Header><Header size='huge'>{question.left} {question.operation} {question.right}</Header></Card.Header>
      <Card.Header><hr /></Card.Header>
      <Form>
        <NumberInput size='massive' placeholder={question.correctAnswer} onSubmit={({value}) => onSubmitAnswer(question, value)}></NumberInput>
      </Form>
    </Card.Content>
    <Card.Content extra>
      <Progress value={currentQuestionNumber} total={totalQuestionCount} progress='ratio' size='small' color='blue' />
    </Card.Content>
  </Card>
);

export default QuestionCard;
