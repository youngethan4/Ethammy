import { authTypes } from "../actions/types";
const initial = {
  error: "",
  user: {},
  loggedIn: false,
  authenticating: false,
};
let user = localStorage.getItem("user");
const initialState = user
  ? {
      ...initial,
      user,
    }
  : {
      initial,
    };

export default function (state = initialState, action) {
  switch (action.type) {
    case authTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.payload,
        authenticating: false,
      };
    case authTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        authenticating: false,
      };
    case authTypes.AUTH_AUTHENTICATING:
      return {
        ...state,
        error: "",
        authenticating: action.payload,
      };
    default:
      return state;
  }
}
