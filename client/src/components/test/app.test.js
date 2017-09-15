import React from 'react';
import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {App} from '../app';
import {QuestionPage} from '../question-page';
import {Header} from '../header';

describe('<App /> ', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
})