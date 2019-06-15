import React from 'react';
import { Grid, Card, Rating } from 'semantic-ui-react';
import TestResultCard from './TestResultCard';

const TestResults = ({results}) => {
  const numberCorrect = results.reduce((acc, val) => acc + (val.correct ? 1 : 0), 0),
    percentCorrect = numberCorrect / results.length;
  return (
    <Grid centered>
      <Grid.Row>
        {numberCorrect} out of {results.length} correct. ({percentCorrect * 100}%)
      </Grid.Row>
      <Grid.Row>
        <Rating disabled maxRating={10} defaultRating={10 * percentCorrect}></Rating>
      </Grid.Row>
      <Grid.Row>
        <Card.Group centered>
          {results.map((result, idx) => <TestResultCard key={idx}>{result}</TestResultCard>)}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
}

export default TestResults;
