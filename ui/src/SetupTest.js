import _ from 'lodash';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

const SetupTest = ({onNumberClick, onSelectNoneClick, onSelectAllClick, onStartClick, numbers}) => (
    <Grid centered>
      <Grid.Row centered>
        {numbers.map(({value, selected}) => <Button key={value} onClick={onNumberClick} primary={selected}>{value}</Button>)}
      </Grid.Row>
      <Grid.Row centered>
        <Button disabled={!_.some(numbers, n => n.selected)} onClick={onSelectNoneClick}>Select None</Button>
        <Button disabled={_.every(numbers, n => n.selected)} onClick={onSelectAllClick}>Select All</Button>
        <Button disabled={numbers.filter(n => n.selected).length < 1} onClick={onStartClick}>Start</Button>
      </Grid.Row>
    </Grid>
);

export default SetupTest;
