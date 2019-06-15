import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import SpeedTest from './SpeedTest';
import SetupTest from './SetupTest';
import TestResults from './TestResults';

class App extends Component {
  state = {
    step: 'setup',
    started: false,
    numbers: [
      {value: 0, selected: false},
      {value: 1, selected: false},
      {value: 2, selected: false},
      {value: 3, selected: false},
      {value: 4, selected: false},
      {value: 5, selected: false},
      {value: 6, selected: false},
      {value: 7, selected: false},
      {value: 8, selected: false},
      {value: 9, selected: false},
      {value: 10, selected: false},
      {value: 11, selected: false},
      {value: 12, selected: false},
    ],
    answers: null,
    operation: '*',
    score: null,
    totalQuestionCount: null,
    currentQuestionNumber: null,
  };

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
      totalQuestionCount: 20,
      currentQuestionNumber: 1,
      score: 0,
      answers: [],
    });
  }

  onNumberToggle = event => {
    const toggledNumber = Number(event.target.innerHTML),
      updatedNumbers = this.state.numbers.map(number => {
      return {value: number.value, selected: toggledNumber === number.value ? !number.selected : number.selected};
    });
    this.setState({numbers: updatedNumbers});
  }

  onTimerExpire = () => {
    console.log('timer expired');
  }

  onAnswerSubmit = (question, answer) => {
    const updatedAnswers = this.state.answers.slice(),
      nextQuestionNumber = this.state.currentQuestionNumber + 1,
      step = nextQuestionNumber > this.state.totalQuestionCount ? 'results' : 'test',
      correct = Number(question.correctAnswer) === Number(answer);
    updatedAnswers.push({question, answer, correct});
    this.setState({
      step,
      answers: updatedAnswers,
      currentQuestionNumber: nextQuestionNumber,
    });
  }

  render() {
    return (
      <Container textAlign='center'>
        <AppHeader step={this.state.step} takeTestDisabled={this.state.numbers.filter(n => n.selected).length < 2} onSetupTest={this.onSetupTest} onTakeTest={this.onStartTest} />
        {this.state.step === 'setup' && <SetupTest
              onStartClick={this.onStartTest}
              onNumberClick={this.onNumberToggle}
              numbers={this.state.numbers}
            />}
        {this.state.step === 'test' && <SpeedTest
              testNumbers={this.state.numbers}
              testOperation={this.state.operation}
              onAnswerSubmit={this.onAnswerSubmit}
              totalQuestionCount={this.state.totalQuestionCount}
              currentQuestionNumber={this.state.currentQuestionNumber}
              onTimerExpire={this.onTimerExpire}
              onSubmitAnswer={this.onAnswerSubmit}
              permittedTime={10}
            />}
        {this.state.step === 'results' && <TestResults results={this.state.answers} />}
      </Container>
    );
  }
}

export default App;
