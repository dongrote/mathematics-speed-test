import React, { Component } from 'react';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {remainingTime: props.permittedTime};
  }
}

export default QuestionCard;
