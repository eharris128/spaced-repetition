import {
  RESTART_APP,
  RESET_STATE
} from '../../actions/types'
import {
  restartApp,
  resetState
} from '../../actions/index'

describe('restartApp', () => {
  it('Should return the action', () => {
    const action = restartApp();
    expect(action.type).toEqual(RESTART_APP);
  })
})

describe('resetState', () => {
  it('Should return the action', () => {
    const action = resetState();
    expect(action.type).toEqual(RESET_STATE);
  })
})