import { SET_ERROR, CLEAR_ERROR } from "./types";
export const error = data => {
  return {
    type: SET_ERROR,
    payload: data
  };
};
export const clear = () => {
  return {
    type: CLEAR_ERROR
  };
};
