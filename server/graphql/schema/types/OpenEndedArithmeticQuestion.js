'use strict';

exports = module.exports = `
  type AnswerCheck {
    question: String!
    correct: Boolean!
    submittedAnswer: String!
    correctAnswer: String!
  }

  type Query {
    OpenEndedArithmeticQuestion(leftTerm: Int!, operation: String!, rightTerm: Int!): String
    checkOpenEndedArithmeticQuestionAnswer(leftTerm: Int!, operation: String!, rightTerm: Int!, answer: Int!): AnswerCheck
  }
`;
