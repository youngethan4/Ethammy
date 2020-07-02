import { authTypes } from './types';
import { HashPassword } from '../helpers/passwordHash'
import { APIAuth } from '../helpers/api'

export const AuthUser = (email, password) => dispatch => {
  const credentials = {
    email: email,
    password: HashPassword(password)
  }
  
  return APIAuth(credentials)
  .then(res => {
    console.log(res);
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
    console.error(error);
    dispatch({
      type: authTypes.AUTH_ERROR,
      error: "Invalid email or password."
    });
  });
}
