import { SAVE_USER, REMOVE_USER } from "../actions/types";
const initial_state = {
  user: null,
  loading: true
};
export default function user(state = initial_state, action) {
  switch (action.type) {
    case SAVE_USER:
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
