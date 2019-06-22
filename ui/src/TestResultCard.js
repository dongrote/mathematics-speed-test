/* eslint-disable */
import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

const TestResultCard = ({children}) => {
  const {question, correct, correctAnswer, submittedAnswer} = children;
  return (
    <Card>
      <Card.Content>
        <Card.Description>
          <Icon color={correct ? 'green' : 'red'} name={correct ? 'check circle' : 'close'} />
          {question} {submittedAnswer ? submittedAnswer : '--'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {correct ? 'Correct!' : `${submittedAnswer ? 'Incorrect' : 'Not answered' }; expected ${correctAnswer}.`}
      </Card.Content>
    </Card>
  );
};

export default TestResultCard;
