import { RESTART_APP, RESET_STATE, USER_LOGIN} from "./types";

export const restartApp = () => {
  return {type: RESTART_APP} 
} 

export const resetState = () => {
  return {type: RESET_STATE} 
} 

export const userLogin = userId => {
  return {type: USER_LOGIN, userId}
}