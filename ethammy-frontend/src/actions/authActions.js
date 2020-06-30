import { authTypes } from './types';
import { HashPassword } from '../helpers/passwordHash.js'

export const authUser = (email, password) => dispatch => {
  const credentials = {
    email: email,
    username: HashPassword(password)
  }
  fetch("http://173.22.77.190:3000/api/auth", {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body : JSON.stringify(credentials)
  })
  .then(res => {
    if(!res.ok || res.statusText !== "OK"){
        throw new Error("Network response problem.");
    }
    return res.json();
  })
  .then(user => {
    dispatch({
      type: authTypes.AUTH_SUCCESS,
      payload: user
    });
    localStorage.setItem('user', JSON.stringify(user));
  })
  .catch((error) => {
    dispatch({
      type: authTypes.AUTH_ERROR,
      error: "Email or password not correct"
    });
  });
}
