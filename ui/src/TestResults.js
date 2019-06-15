import React from 'react';
import { Card } from 'semantic-ui-react';
import TestResultCard from './TestResultCard';

const TestResults = ({results}) => (
  <Card.Group centered>
    {results.map((result, idx) => <TestResultCard key={idx}>{result}</TestResultCard>)}
  </Card.Group>
);

export default TestResults;
