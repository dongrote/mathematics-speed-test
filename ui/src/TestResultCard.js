/* eslint-disable */
import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

const TestResultCard = ({children}) => {
  const {question, answer, correct} = children;
  return (
    <Card>
      <Card.Content>
        <Card.Description>
          <Icon color={correct ? 'green' : 'red'} name={correct ? 'check circle' : 'close'} />
          {question.left}{question.operation}{question.right} = {answer === null ? '--' : answer}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {correct ? 'Correct!' : `${answer === null ? 'Not answered' : 'Incorrect'}; expected ${question.correctAnswer}.`}
      </Card.Content>
    </Card>
  );
};

export default TestResultCard;
