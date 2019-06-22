'use strict';
const controllers = require('../../../controllers/OpenEndedArithmeticQuestion');

const ArithmeticQuestionTerms = (root, {number, operation}) => controllers
  .ArithmeticQuestionTerms(number, operation);
const OpenEndedArithmeticQuestion = (root, {leftTerm, operation, rightTerm}) => controllers
  .OpenEndedArithmeticQuestion(leftTerm, operation, rightTerm);
const checkOpenEndedArithmeticQuestionAnswer = (root, {leftTerm, operation, rightTerm, answer}) => ({
  question: controllers.OpenEndedArithmeticQuestion(leftTerm, operation, rightTerm),
  correct: controllers.checkOpenEndedArithmeticQuestionAnswer(leftTerm, operation, rightTerm, answer),
  submittedAnswer: answer,
  correctAnswer: controllers.solve(leftTerm, operation, rightTerm),
});

const Query = {
  ArithmeticQuestionTerms,
  OpenEndedArithmeticQuestion,
  checkOpenEndedArithmeticQuestionAnswer,
};

exports = module.exports = {Query};
