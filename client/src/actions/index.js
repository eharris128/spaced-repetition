import axios from "axios";
import { RESTART_APP } from "./types";

export const restartApp = () => {
  // console.log('me restart');
  return {type: RESTART_APP} 
} 












// action creator with axios
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/me")
//       .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
//   };
// };


// package.json has now proxy target for /api
// react component calls an action, action creator returns an action which is sent to the dispatch function which sends the action to all the different reducers in the store, causing them to instantly recalculate/rerender the app state.

// export const loginUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/auth/github")
//       .then(res => dispatch({ type: LOGIN_USER, payload: res.data }));
//   };
// };


// export const loginUser = () => {
//   console.log('logged in');
//   return {type: LOGIN_USER} 
// } 
// export const logoutUser = () => {
//   console.log('logged out');
//   return {type: LOGOUT_USER} 
// } 
// export const logoutUser = () => { type: LOGOUT_USER };

// export const logoutUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/auth/logout")
//       .then(res => dispatch({ type: LOGOUT_USER, payload: res.data }));
//   };
// };
