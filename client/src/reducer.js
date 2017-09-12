import { FETCH_USER } from "./actions/types";

export default function(state = {}, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if user is not logged in, return false in payload data
    default:
      return state;
  }
}