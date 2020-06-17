import React from 'react'
import { useHistory } from 'react-router-dom';
import RegisterForm from './register.js';

const Register = () => {
    let history = useHistory();

    return (
        <div>
            <RegisterForm history={history}/>
        </div>
    )
}

export default Register;