'use strict';
const _ = require('lodash'),
  MAX_MATH_TERM_VALUE = Number(_.get(process.env, 'MAX_MATH_TERM_VALUE', 12));

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

const termGenerators = {
  '+': (n, m) => {
    const terms = [];
    for (let i=0; i<=m; i++) {
      terms.push({left: n, right: i});
    }
    return terms;
  },
  '-': (n, m) => {
    const terms = [];
    for (let i=0; i<=m; i++) {
      terms.push({left: n + i, right: n});
    }
    return terms;
  },
  '*': (n, m) => {
    const terms = [];
    for (let i=0; i<=m; i++) {
      terms.push({left: n, right: i});
    }
    return terms;
  },
  '/': (n, m) => {
    const terms = [];
    for (let i=1; i<=m; i++) {
      terms.push({left: n * i, right: n});
    }
    return terms;
  },
};

const ArithmeticQuestionTerms = (number, operation) => _.map(_.get(termGenerators, operation, () => [])(number, MAX_MATH_TERM_VALUE), terms => _.set(terms, 'operation', operation));
const OpenEndedArithmeticQuestion = (leftTerm, operation, rightTerm) => `${leftTerm} ${_.get(operationDisplayCharacters, operation, '?')} ${rightTerm} =`;
const solve = (leftTerm, operation, rightTerm) => _.get(operationMethods, operation, () => null)(leftTerm, rightTerm);
const checkOpenEndedArithmeticQuestionAnswer = (leftTerm, operation, rightTerm, answer) => solve(leftTerm, operation, rightTerm) === Number(answer);

exports = module.exports = {
  ArithmeticQuestionTerms,
  OpenEndedArithmeticQuestion,
  checkOpenEndedArithmeticQuestionAnswer,
  solve,
};
