import { authTypes } from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, error: "" } : {error: "", user: {}, loggedIn: false};

export default function(state = initialState, action) {
  switch(action.type) {
    case authTypes.AUTH_SUCCESS:
      return{
        ...state,
        user: action.payload,
        loggedIn: true,
        error:''
      };
    case authTypes.AUTH_ERROR:
      return{
        ...state,
        error: action.payload
      } 
    default:
      return state;
  }
}
