import React from 'react';
import {shallow} from 'enzyme';

// brackets?
import LoginPage from '../login-page';

describe('<LoginPage /> ', () => {
  it('Renders without crashing', () => {
    shallow(<LoginPage />);
  });
})