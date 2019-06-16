import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

const SetupTest = ({onNumberClick, onSelectAllClick, onStartClick, numbers}) => (
    <Grid centered>
      <Grid.Row centered>
        {numbers.map(number => <Button key={number.value} onClick={onNumberClick} primary={number.selected}>{number.value}</Button>)}
      </Grid.Row>
      <Grid.Row centered>
        <Button onClick={onSelectAllClick}>Select All</Button>
        <Button disabled={numbers.filter(n => n.selected).length < 1} onClick={onStartClick}>Start</Button>
      </Grid.Row>
    </Grid>
);

export default SetupTest;
