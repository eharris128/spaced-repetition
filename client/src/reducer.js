import { RESTART_APP, RESET_STATE } from "./actions/types";

const initialState = { 
  restartApplication: null
}

export default function(state, action) {
  state = state || initialState;
  switch (action.type) {
    case RESTART_APP:
      return {...state, restartApplication: true}
    case RESET_STATE:
      return {...state, restartApplication: null}
    default:
      return state;
  }
}