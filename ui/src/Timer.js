import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {remainingTime: props.permittedTime};
    this.timeoutId = setTimeout(this.timeout, 500);
  }

  timeout = () => {
    const remainingTime = this.state.remainingTime - 1;
    if (remainingTime === 0) {
      return this.props.onExpired();
    }
    this.setState({remainingTime});
    this.timeoutId = setTimeout(this.timeout, 500);
  }

  render() {
    return <Progress indicating size='tiny' value={this.state.remainingTime} total={this.props.permittedTime} />
  }
}

export default Timer;
