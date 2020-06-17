import { registerTypes } from './types';

import { HashPassword } from '../helpers/passwordHash.js';

export const RegisterUser = (name, email, username, password) => dispatch => {
    let registrationDetails = {
        name: name,
        email: email,
        username: username,
        password: HashPassword(password)
    }
    fetch("http://173.22.77.190:3000/api/register", {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(registrationDetails)
    })
    .then(res => {
        if(!res.ok || res.statusText !== "OK"){
            throw new Error("Network response problem.");
        }
        return res.json();
    })
    .then(data => {
        if(data.success){
            dispatch({
                type: registerTypes.REGISTER_SUCCESS,
                payload: true
            });
        } else {
            throw new Error("Error with backend.");
        }  
    })
    .catch((error) => {
        console.error('Error:', error);
        dispatch({
            type: registerTypes.REGISTER_ERROR,
            payload: true
        });
    });
}