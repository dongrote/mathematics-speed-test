import _ from 'lodash';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import AppHeader from './AppHeader';
import SpeedTest from './SpeedTest';
import SetupTest from './SetupTest';
import TestResults from './TestResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'setup',
      started: false,
      numbers: [],
      operations: [
        {value: 'Addition', selected: false},
        {value: 'Subtraction', selected: false},
        {value: 'Multiplication', selected: false},
        {value: 'Division', selected: false},
      ],
      answers: null,
      operation: null,
      score: null,
      currentQuestionNumber: null,
      startTime: null,
      finishTime: null,
    };
    for(let value=1; value<13; value++) {
      this.state.numbers.push({value, selected: false});
    }
  }

  onSetupTest = () => {
    this.setState({
      step: 'setup',
      started: false,
    });
  }

  onStartTest = () => {
    this.setState({
      step: 'test',
      started: true,
      currentQuestionNumber: 1,
      score: 0,
      answers: [],
      startTime: Date.now(),
    });
  }

  onNumberToggle = event => {
    const toggledNumber = Number(event.target.innerHTML),
      updatedNumbers = this.state.numbers.map(number => {
      return {value: number.value, selected: toggledNumber === number.value ? !number.selected : number.selected};
    });
    this.setState({numbers: updatedNumbers});
  }

  onOperationToggle = event => {
    const toggledOperation = event.target.innerHTML,
      updatedOperations = this.state.operations.map(operation => {
        return {value: operation.value, selected: toggledOperation === operation.value};
      });
    this.setState({
      operations: updatedOperations,
      operation: {
        Addition: '+',
        Subtraction: '-',
        Multiplication: '*',
        Division: '/',
      }[toggledOperation],
    });
  }

  onSelectAllNumbers = () => this.setState({numbers: this.state.numbers.map(({value}) => ({value, selected: true}))})
  onSelectNoNumbers = () => this.setState({numbers: this.state.numbers.map(({value}) => ({value, selected: false}))})

  onTestComplete = results => {
    this.setState({
      step: 'results',
      answers: results,
      finishTime: Date.now(),
    });
  }

  render() {
    return (
      <Container textAlign='center'>
        <AppHeader step={this.state.step} takeTestDisabled={!(_.some(this.state.numbers, n => n.selected) && _.some(this.state.operations, o => o.selected))} onSetupTest={this.onSetupTest} onTakeTest={this.onStartTest} />
        {this.state.step === 'setup' && <SetupTest
              onStartClick={this.onStartTest}
              onSelectNoneClick={this.onSelectNoNumbers}
              onSelectAllClick={this.onSelectAllNumbers}
              onNumberClick={this.onNumberToggle}
              onOperationClick={this.onOperationToggle}
              numbers={this.state.numbers}
              operations={this.state.operations}
            />}
        {this.state.step === 'test' && <SpeedTest
              testNumbers={this.state.numbers.filter(n => n.selected).map(n => n.value)}
              testOperation={this.state.operation}
              currentQuestionNumber={this.state.currentQuestionNumber}
              onTimerExpire={this.onTimerExpire}
              permittedTime={10}
              onTestComplete={this.onTestComplete}
            />}
        {this.state.step === 'results' && <TestResults results={this.state.answers} duration={moment.duration(moment(this.state.finishTime).diff(this.state.startTime))} />}
      </Container>
    );
  }
}

export default App;
