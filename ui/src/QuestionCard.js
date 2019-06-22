import React from 'react';
import { Header, Card, Form, Progress, Placeholder } from 'semantic-ui-react';
import NumberInput from './NumberInput';
import Timer from './Timer';

const QuestionCard = ({question, onSubmitAnswer, currentQuestionNumber, totalQuestionCount}) => (
  <Card>
    <Card.Content>
      <Card.Meta>{question ? <Timer permittedTime={10} onExpired={() => onSubmitAnswer(question, null)} /> : <Placeholder><Placeholder.Line /></Placeholder>}</Card.Meta>
      <Card.Header><Header size='huge'>{question ? question.question : <Placeholder><Placeholder.Line/></Placeholder>}</Header></Card.Header>
      <Card.Header><hr /></Card.Header>
      <Form>
        <NumberInput disabled={!Boolean(question)} size='massive' placeholder='Answer' onSubmit={({value}) => onSubmitAnswer(question, value)}></NumberInput>
      </Form>
    </Card.Content>
    <Card.Content extra>
      <Progress value={currentQuestionNumber} total={totalQuestionCount} progress='ratio' size='small' color='blue' />
    </Card.Content>
  </Card>
);

export default QuestionCard;
