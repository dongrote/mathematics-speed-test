import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {remainingTime: props.permittedTime};
    this.timeoutId = setTimeout(this.timeout, 1000);
  }

  timeout = () => {
    this.setState({remainingTime: this.state.remainingTime - 1});
    this.timeoutId = setTimeout(this.timeout, 1000);
  }

  render() {
    return <Progress indicating value={this.state.remainingTime} total={permittedTime} />
  }
}

export default Timer;
