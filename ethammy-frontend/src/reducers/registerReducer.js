import { registerTypes } from '../actions/types';

const initialState = { 
  registered: false, 
  registerError: false,
  matchPasswordError: false,
  passwordError:  false,
  emailError:  false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case registerTypes.REGISTER_SUCCESS:
      return{
        ...state,
        registered: true,
      };
    case registerTypes.REGISTER_ERROR:
      return{
        ...state,
        registerError: action.payload
      };
    case registerTypes.REGISTER_PASSWORD_ERROR:
      return{
        ...state,
        passwordError: action.payload
      };
    case registerTypes.REGISTER_PASSWORD_MATCH_ERROR:
      return{
        ...state,
        matchPasswordError: action.payload
      };
    case registerTypes.REGISTER_EMAIL_ERROR:
      return{
        ...state,
        emailError: action.payload
      };
    default:
      return state;
  }
}
