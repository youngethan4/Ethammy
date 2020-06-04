import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegisterUser } from '../../actions/registerActions.js';
import {
    CheckName,
    CheckEmail,
    CheckUsername,
    CheckPassword,
    MatchPasswords,
} from './registerHelper.js';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            nameError: 'blank',
            emailError: 'blank',
            usernameError: 'blank',
            passwordError: 'blank',
            confirmPasswordError: 'blank'
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        var { name, email, username, password } = this.state;
        this.props.RegisterUser(name, email, username, password);
    }
    
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onNameChange = (e) => {
        this.onChange(e);
        this.setState({ nameError: CheckName(e.target.value) });
    }

    onEmailChange = (e) => {
        this.onChange(e);
        this.setState({ emailError: CheckEmail(e.target.value) });
    }

    onUsernameChange = (e) => {
        this.onChange(e);
        this.setState({ usernameError: CheckUsername(e.target.value) });
    }

    onPasswordChange = (e) => {
        this.onChange(e);
        this.setState({ passwordError: CheckPassword(e.target.value) });
    }

    onConfirmPasswordChange = (e) => {
        this.onChange(e);
        this.setState({ confirmPasswordError: MatchPasswords(this.state.password, e.target.value) });
    }

    render() {
        const { name, email, username, password, confirmPassword, nameError, emailError, usernameError, passwordError, confirmPasswordError, registerError } = this.state;
        const clickable = nameError === '' && emailError === '' && usernameError === '' && passwordError === '' && confirmPasswordError === '';
        var nameErrorP, emailErrorP, usernameErrorP, passwordErrorP, confirmPasswordErrorP, registerErrorP, button;
        if(nameError === 'error') nameErrorP = <p>Names can only contain letters.</p>;
        if(emailError === 'error') emailErrorP = <p>Please make sure this is an email address.</p>;
        if(usernameError === 'error') usernameErrorP = <p>Unsupported character in useranme.</p>;
        if(passwordError === 'error') passwordErrorP = <p>Passwords must be at least 10 characters with 2 character types. Character types are uppercase letters, lowercase letters, numbers, and special characters.</p>;
        if(confirmPasswordError === 'error') confirmPasswordErrorP = <p>Passwords do not match.</p>;
        if(registerError) registerErrorP = <p>Error regiistering account. Please try again.</p>;

        if(clickable) button = <button type="submit" disabled>Create Account</button>;
        else button = <button type="submit">Create Account</button>;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="name">First Name:</label>
                    <input type="text" name="name" onChange={this.onNameChange} value={name}/><br/>
                    {nameErrorP}

                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={this.onEmailChange} value={email}/><br/>
                    {emailErrorP}

                    <label htmlFor="username">Create Username:</label>
                    <input type="text" name="username" onChange={this.onUsernameChange} value={username}/><br/>
                    {usernameErrorP}

                    <label htmlFor="password">Create Password:</label>
                    <input type="text" name="password" onChange={this.onPasswordChange} value={password}/><br/>
                    {passwordErrorP}

                    <label htmlFor="confirmPassword">Confrim Password:</label>
                    <input type="text" name="confirmPassword" onChange={this.onConfirmPasswordChange} value={confirmPassword}/><br/>
                    {confirmPasswordErrorP}

                    <button type="submit">Create Account</button>
                </form>
                <div>
                    {registerErrorP}
                </div>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    RegisterUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    registerError: state.register.registerError
});

export default connect(mapStateToProps, { RegisterUser })(RegisterForm);
