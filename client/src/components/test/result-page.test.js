import React from 'react';
import {shallow} from 'enzyme';
import {Result} from '../result-page';
import {restartApp} from '../../actions/index'

describe('<Result /> ', () => {
  it('Renders without crashing', () => {
    shallow(<Result />);
  });

  it('Dispatches restartApp when start over button is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Result dispatch={dispatch}/>);
    wrapper.find('.button').simulate('click', {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual(restartApp());
  });
})