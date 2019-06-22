'use strict';
const _ = require('lodash');

const operationDisplayCharacters = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

const operationMethods = {
  '+': (l, r) => Number(l) + Number(r),
  '-': (l, r) => Number(l) - Number(r),
  '*': (l, r) => Number(l) * Number(r),
  '/': (l, r) => Number(l) / Number(r),
};


const OpenEndedArithmeticQuestion = (leftTerm, operation, rightTerm) => `${leftTerm} ${_.get(operationDisplayCharacters, operation, '?')} ${rightTerm} =`;
const solve = (leftTerm, operation, rightTerm) => _.get(operationMethods, operation, () => null)(leftTerm, rightTerm);
const checkOpenEndedArithmeticQuestionAnswer = (leftTerm, operation, rightTerm, answer) => solve(leftTerm, operation, rightTerm) === Number(answer);

exports = module.exports = {
  OpenEndedArithmeticQuestion,
  checkOpenEndedArithmeticQuestionAnswer,
  solve,
};
