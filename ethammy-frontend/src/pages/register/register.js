import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegisterUser } from '../../actions/registerActions.js';
import Validate from './registerHelper.js';
import { BLANK, ACCEPTED, ERROR } from './registerHelper.js';
import Styles from './register.scss';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            nameError: BLANK,
            emailError: BLANK,
            usernameError: BLANK,
            passwordError: BLANK,
            confirmPasswordError: BLANK
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
        this.setState({ nameError: Validate.CheckName(e.target.value) });
    }

    onEmailChange = (e) => {
        this.onChange(e);
        this.setState({ emailError: Validate.CheckEmail(e.target.value) });
    }

    onUsernameChange = (e) => {
        this.onChange(e);
        this.setState({ usernameError: Validate.CheckUsername(e.target.value) });
    }

    onPasswordChange = (e) => {
        this.onChange(e);
        this.setState({ passwordError: Validate.CheckPassword(e.target.value) });
    }

    onConfirmPasswordChange = (e) => {
        this.onChange(e);
        this.setState({ confirmPasswordError: Validate.MatchPasswords(this.state.password, e.target.value) });
    }

    render() {
        const { name, email, username, password, confirmPassword, nameError, emailError, usernameError, passwordError, confirmPasswordError, registerError } = this.state;
        const clickable = nameError === ACCEPTED && emailError === ACCEPTED && usernameError === ACCEPTED && passwordError === ACCEPTED && confirmPasswordError === ACCEPTED;
        var nameErrorP, emailErrorP, usernameErrorP, passwordErrorP, confirmPasswordErrorP, registerErrorP, button;
        if(nameError === ERROR) nameErrorP = <p>Names can only contain letters.</p>;
        if(emailError === ERROR) emailErrorP = <p>Please make sure this is an email address.</p>;
        if(usernameError === ERROR) usernameErrorP = <p>Unsupported character in useranme.</p>;
        if(passwordError === ERROR) passwordErrorP = <p>Passwords must be at least 10 characters with 2 character types. Character types are uppercase letters, lowercase letters, numbers, and special characters.</p>;
        if(confirmPasswordError === ERROR) confirmPasswordErrorP = <p>Passwords do not match.</p>;
        if(registerError) registerErrorP = <p>Error regiistering account. Please try again.</p>;

        if(clickable) button = <button type="submit" disabled>Create Account</button>;
        else button = <button type="submit">Create Account</button>;

        return (
            <div className="registerForm">
                <p>Create Account</p>
                <form onSubmit={this.onSubmit} spellCheck="false">
                    <label htmlFor="name">First Name:</label>
                    <input className="name" type="text" name="name" onChange={this.onNameChange} value={name}/><br/>
                    {nameErrorP}

                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={this.onEmailChange} value={email}/><br/>
                    {emailErrorP}

                    <label htmlFor="username">Create Username:</label>
                    <input type="text" name="username" onChange={this.onUsernameChange} value={username}/><br/>
                    {usernameErrorP}

                    <label htmlFor="password">Create Password:</label>
                    <input type="text" name="password" onChange={this.onPasswordChange} value={password} autoComplete="off"/><br/>
                    {passwordErrorP}

                    <label htmlFor="confirmPassword">Confrim Password:</label>
                    <input type="text" name="confirmPassword" onChange={this.onConfirmPasswordChange} value={confirmPassword} autoComplete="off"/><br/>
                    {confirmPasswordErrorP}

                    <button type="submit">Register</button>

                    {registerErrorP}
                </form>
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