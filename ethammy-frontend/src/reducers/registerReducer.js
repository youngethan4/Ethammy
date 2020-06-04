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
        registered: action.payload
      };
    case registerTypes.REGISTER_ERROR:
      return{
        ...state,
        registerError: action.payload
      };
    default:
      return state;
  }
}
