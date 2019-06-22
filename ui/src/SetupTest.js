import _ from 'lodash';
import React from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';

const SetupTest = ({onNumberClick, onSelectNoneClick, onSelectAllClick, onStartClick, onOperationClick, numbers, operations}) => (
    <Grid centered>
      <Grid.Row centered>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Available Numbers
            </Card.Header>
            {numbers.map(({value, selected}) => <Button key={value} onClick={onNumberClick} primary={selected}>{value}</Button>)}
          </Card.Content>
          <Card.Content extra>
            <Button disabled={!_.some(numbers, n => n.selected)} onClick={onSelectNoneClick}>Select None</Button>
            <Button disabled={_.every(numbers, n => n.selected)} onClick={onSelectAllClick}>Select All</Button>
          </Card.Content>
        </Card>
      </Grid.Row>
      <Grid.Row>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Operation
            </Card.Header>
            {operations.map(({value, selected}) => <Button key={value} onClick={onOperationClick} primary={selected}>{value}</Button>)}
          </Card.Content>
        </Card>
      </Grid.Row>
      <Grid.Row>
        <Button size='huge' disabled={!(_.some(numbers, n => n.selected) && _.some(operations, o => o.selected))} onClick={onStartClick}>Start</Button>
      </Grid.Row>
    </Grid>
);

export default SetupTest;
