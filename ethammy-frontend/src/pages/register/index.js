import React from 'react'
import { useHistory } from 'react-router-dom';
import RegisterForm from './register.js';

const Register = () => {
    let history = useHistory();

    return (
        <div>
            <p>Register for an account.</p>
            <RegisterForm history={history}/>
        </div>
    )
}

export default Register;