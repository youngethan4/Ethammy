import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import registerReducer from './registerReducer.js';

export default combineReducers({
  auth: authReducer,
  register: registerReducer
});
