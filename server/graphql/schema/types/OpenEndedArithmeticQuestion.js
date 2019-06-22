'use strict';

exports = module.exports = `
  type ArithmeticQuestionTerms {
    left: Int!
    right: Int!
    operation: String!
  }

  type AnswerCheck {
    question: String!
    correct: Boolean!
    submittedAnswer: String
    correctAnswer: String!
  }

  type Query {
    ArithmeticQuestionTerms(number: Int!, operation: String!): [ArithmeticQuestionTerms!]
    OpenEndedArithmeticQuestion(leftTerm: Int!, operation: String!, rightTerm: Int!): String
    checkOpenEndedArithmeticQuestionAnswer(leftTerm: Int!, operation: String!, rightTerm: Int!, answer: Int): AnswerCheck
  }
`;
