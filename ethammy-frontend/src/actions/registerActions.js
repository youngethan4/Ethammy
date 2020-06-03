import { registerTypes } from './types';

import { 
    VerifyEmail,
    MatchPasswords,
    AcceptPassword,
    HashPassword
} from '../helpers/registerHelper.js';

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

export const CheckPassword = (password) => dispatch => {
    var accept = AcceptPassword(password);
    dispatch({
        type: registerTypes.REGISTER_PASSWORD_ERROR,
        matchPasswordError: !accept
    });
}

export const CheckPasswordMatch = (password, confirmPassword) => dispatch => {
    var match = MatchPasswords(password, confirmPassword);
    dispatch({
        type: registerTypes.REGISTER_PASSWORD_MATCH_ERROR,
        matchPasswordError: !match
    });
}

export const CheckEmail = (email) => dispatch => {
    var check = VerifyEmail(email);
    dispatch({
        type: registerTypes.REGISTER_PASSWORD_MATCH_ERROR,
        matchPasswordError: !check
    });
}