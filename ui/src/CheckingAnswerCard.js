import React from 'react';
import { Card, Header, Placeholder } from 'semantic-ui-react';

const CheckingAnswerCard = () => (
  <Card>
    <Card.Content>
      <Card.Meta><Placeholder><Placeholder.Line /></Placeholder></Card.Meta>
      <Card.Header><Header size='huge'><Placeholder><Placeholder.Line size='huge' /></Placeholder></Header></Card.Header>
      <Card.Header><hr /></Card.Header>
      <Placeholder><Placeholder.Line size='huge' /></Placeholder>
    </Card.Content>
    <Card.Content extra>
      <Placeholder><Placeholder.Line/></Placeholder>
    </Card.Content>
  </Card>
);

export default CheckingAnswerCard;
