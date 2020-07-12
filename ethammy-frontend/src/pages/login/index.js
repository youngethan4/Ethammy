import React from 'react'
import { useHistory } from 'react-router-dom';
import LoginForm from './login.js';

const Login = () => {
    let history = useHistory();

    return (
        <div>
            <p>Login to your account.</p>
            <LoginForm history={history}/>
        </div>
    )
}

export default Login;