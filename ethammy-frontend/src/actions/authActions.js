import { authTypes } from './types';
import { HashPassword } from '../helpers/passwordHash'
import { APIAuth } from '../helpers/api'

export const AuthUser = (email, password) => dispatch => {
  dispatch({
    type: authTypes.AUTH_AUTHENTICATING,
    payload: true
  })

  const credentials = {
    email: email,
    password: HashPassword(password)
  }
  
  return APIAuth(credentials)
  .then(res => {
    if(res.status === 200){
      dispatch({
        type: authTypes.AUTH_SUCCESS,
        payload: true,
        user : res.data
      });
      localStorage.setItem('user', JSON.stringify(res.data));
    } else {
      throw new Error();
    }
  })
  .catch((error) => {
    dispatch({
      type: authTypes.AUTH_ERROR,
      payload: "Invalid email or password."
    });
  });
}
