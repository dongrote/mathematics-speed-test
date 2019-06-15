import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

const SetupTest = ({onNumberClick, onStartClick, numbers}) => (
    <Grid centered>
      <Grid.Row centered>
        {numbers.map(number => <Button key={number.value} onClick={onNumberClick} primary={number.selected}>{number.value}</Button>)}
      </Grid.Row>
      <Grid.Row centered>
        <Button disabled={numbers.filter(n => n.selected).length < 2} onClick={onStartClick}>Start</Button>
      </Grid.Row>
    </Grid>
);

export default SetupTest;
