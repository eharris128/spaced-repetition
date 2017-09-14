import { RESTART_APP, RESET_STATE} from "./types";

export const restartApp = () => {
  return {type: RESTART_APP} 
} 

export const resetState = () => {
  return {type: RESET_STATE} 
} 