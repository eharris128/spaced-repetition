'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const should = chai.should();

describe('Test', function () {
  it('should succeed', function () {
    true.should.be.true;
  });
});


const generateQuestionData = () => {
  return {
    question: faker.lorem.words,
    answer: faker.lorem.word
  };
};
