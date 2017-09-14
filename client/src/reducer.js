// import { LOGOUT_USER, LOGIN_USER } from "./actions/types";
import { RESTART_APP, RESET_STATE } from "./actions/types";

const initialState = { 
  auth: false, 
  questionOneScore: 0, 
  questionTwoScore: 0, 
  questionThreeScore: 0, 
  questionFourScore: 0, 
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