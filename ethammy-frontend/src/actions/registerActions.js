import { registerTypes } from './types';

import { HashPassword } from '../pages/register/registerHelper.js';

export const RegisterUser = (name, email, username, password) => dispatch => {
    var registrationDetails = {
        name: name,
        email: email,
        username: username,
        password: HashPassword(password)
    }
    fetch("http://localhost:3001/api/register", {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(registrationDetails)
    })
    .then(res => res.json())
    .then(user => {
        dispatch({
            type: registerTypes.REGISTER_SUCCESS,
            payload: true
        });
        localStorage.setItem('user', JSON.stringify(user));
    },
    error => {
        dispatch({
            type: registerTypes.REGISTER_ERROR,
            payload: true
        });
    }
    );
}