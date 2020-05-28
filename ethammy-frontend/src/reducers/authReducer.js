import { AUTH_SUCCESS } from '../actions/types';
import { AUTH_ERROR } from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, error: "" } : {error: "", user: {}, loggedIn: false};

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return{
        ...state,
        user: action.payload
      };
    case AUTH_ERROR:
      return{
        ...state,
        error: "Email or password not correct"
      } 
    default:
      return state;
  }
}
