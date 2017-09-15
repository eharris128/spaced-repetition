import React from 'react';
import {shallow} from 'enzyme';

import {App} from '../app';

describe('<App /> ', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
})