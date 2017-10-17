import { RESTART_APP, RESET_STATE, USER_LOGIN} from "./actions/types";

const initialState = { 
  restartApplication: null,
  userId: null
}

export default function(state, action) {
  state = state || initialState;
  switch (action.type) {
    case RESTART_APP:
      return {...state, restartApplication: true}
    case RESET_STATE:
      return {...state, restartApplication: null, userId: null}
    case USER_LOGIN:
      console.log('userId: ', action);
      return {...state, userId: action.userId}
    default:
      return state;
  }
}