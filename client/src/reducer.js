// import { LOGOUT_USER, LOGIN_USER } from "./actions/types";
// import { FETCH_USER, LOGOUT_USER, LOGIN_USER } from "./actions/types";

const initialState = { 
  auth: false, 
  questionOneScore: 0, 
  questionTwoScore: 0, 
  questionThreeScore: 0, 
  questionFourScore: 0, 
  questionFiveScore: 0, 
  questionSixScore: 0,
  questionSevenScore: 0,
  questionEightScore: 0,
  questionNineScore: 0,
  questionTenScore: 0
}

export default function(state, action) {
  state = state || initialState;
  switch (action.type) {
    default:
      return state;
  }
}