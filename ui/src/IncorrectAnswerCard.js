import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

const IncorrectAnswerCard = ({message, correction}) => (
  <Grid centered>
    <Grid.Row>
      <Header size='huge'>{message}</Header>
    </Grid.Row>
    <Grid.Row>
      <Header size='large'>{correction}</Header>
    </Grid.Row>
  </Grid>
);

export default IncorrectAnswerCard;
