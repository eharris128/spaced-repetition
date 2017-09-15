import React from 'react';
import {shallow} from 'enzyme';
import {QuestionPage} from '../question-page';

describe('<QuestionPage /> ', () => {
  it('Renders without crashing', () => {
    shallow(<QuestionPage />);
  });
})