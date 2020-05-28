import { AUTH_SUCCESS } from './types';
import { AUTH_ERROR } from './types';

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
      type: AUTH_SUCCESS,
      payload: user
    });
    localStorage.setItem('user', JSON.stringify(user));
  },
  error => {
    dispatch({
      type: AUTH_ERROR
    })
  }
  );
}
