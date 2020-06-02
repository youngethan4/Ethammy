import { registerTypes } from '../actions/types';

const initialState = { 
    registered: false, 
    errors : {
        registerError: '',
        matchPasswordError: '',
        exceptingPasswordError: '',
        emailError: ''
    }
} ;

export default function(state = initialState, action) {
  switch(action.type) {
    case registerTypes.REGISTER_SUCCESS:
      return{
        ...state,
        user: action.payload,
        loggedIn: true,
        error:''
      };
    case registerTypes.REGISTER_ERROR:
      return{
        ...state,
        error: action.payload
      } 
    default:
      return state;
  }
}
