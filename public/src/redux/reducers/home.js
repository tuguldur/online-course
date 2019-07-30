import { SET_ERROR, CLEAR_ERROR } from "../actions/types";
const initial_state = {
  loading: true,
  error: ""
};
export default function home(state = initial_state, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
}
