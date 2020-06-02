import { authTypes } from './types';

export const authUser = (credentials) => dispatch => {
  fetch("http://localhost:3001/api/auth", {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body : JSON.stringify(credentials)
  })
  .then(res => res.json())
  .then(user => {
    dispatch({
      type: authTypes.AUTH_SUCCESS,
      payload: user
    });
    localStorage.setItem('user', JSON.stringify(user));
  },
  error => {
    dispatch({
      type: authTypes.AUTH_ERROR,
      error: "Email or password not correct"
    });
  }
  );
}
