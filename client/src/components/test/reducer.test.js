import reducer from "../../reducer";
import { restartApp, resetState } from "../../actions/index";

describe("Reducer", () => {
  it("Should set the initial state when nothing is passed in", () => {
    const state = reducer(undefined, { type: "UNKNOWN" });
    expect(state.restartApplication).toEqual(null);
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    const state = reducer(currentState, { type: "__UNKNOWN" });
    expect(state).toBe(currentState);
  });

  describe('restartApp', () => {
    it('Should restart the application', () => {
      let state = {
        restartApplication: 'text'
      };
      state = reducer(state,restartApp());
      expect(state.restartApplication).toEqual(true);
    })
  })

  describe('resetState', () => {
    it('Should reset the state', () => {
      let state = {
        restartApplication: 'More text'
      }
      state = reducer(state,resetState());
      expect(state.restartApplication).toEqual(null);
    })
  })
});

