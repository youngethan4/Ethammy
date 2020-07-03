import { registerTypes } from '../actions/types';

const initialState = { 
  registered: false,
  registering: false, 
  registerError: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case registerTypes.REGISTER_SUCCESS:
      return{
        ...state,
        registered: action.payload,
        registering: false
      };
    case registerTypes.REGISTER_REGISTERING:
      return{
        ...state,
        registering: action.payload,
        registerError: false
      }
    case registerTypes.REGISTER_ERROR:
      return{
        ...state,
        registerError: action.payload,
        registering: false
      };
    default:
      return state;
  }
}
