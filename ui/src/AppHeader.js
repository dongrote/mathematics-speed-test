import React from 'react';
import { Header, Icon, Grid, Step } from 'semantic-ui-react';

const AppHeader = ({step, takeTestDisabled, onSetupTest, onTakeTest}) => (
  <Header as='h1' icon textAlign='center'>
    <Grid centered>
      <Grid.Row centered>
        <Icon name='calculator' circular />
      </Grid.Row>
      <Grid.Row centered>
        <Header.Subheader>Mathematics Speed Test</Header.Subheader>
      </Grid.Row>
      <Grid.Row centered>
        <Step.Group>
          <Step active={step === 'setup'} onClick={onSetupTest} >
            <Icon name='settings' />
            <Step.Content>
              <Step.Title>Setup Test</Step.Title>
              <Step.Description>Choose set of numbers.</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled={takeTestDisabled} active={step === 'test'} onClick={onTakeTest} >
            <Icon name='list' />
            <Step.Content>
              <Step.Title>Take Test</Step.Title>
              <Step.Description>Answer randomly generated test questions.</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled={step !== 'results'} active={step === 'results'}>
            <Icon name='clipboard check' />
            <Step.Content>
              <Step.Title>Results</Step.Title>
              <Step.Description>Check test results.</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </Grid.Row>
    </Grid>
  </Header>
);

export default AppHeader;
