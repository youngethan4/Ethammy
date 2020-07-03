import { registerTypes } from './types';
import { HashPassword } from '../helpers/passwordHash.js';
import { APIRegister } from '../helpers/api';

export const RegisterUser = (details) => dispatch => {
    dispatch({
        type: registerTypes.REGISTER_REGISTERING,
        payload: true
    })
    let registrationDetails = {
        ...details,
        password: HashPassword(details.password)
    }
    return APIRegister(registrationDetails)
    .then(data => {
        if(data.status === 200){
            dispatch({
                type: registerTypes.REGISTER_SUCCESS,
                payload: true
            });
        } else {
            throw new Error("Error with backend.");
        }  
    })
    .catch((error) => {
        dispatch({
            type: registerTypes.REGISTER_ERROR,
            payload: true
        });
    });
}