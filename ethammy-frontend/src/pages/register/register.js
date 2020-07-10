import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../actions/registerActions.js';
import Validate from './registerHelper.js';
import * as constant from '../../constants/register';
import './register.scss';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            nameError: constant.BLANK,
            emailError: constant.BLANK,
            usernameError: constant.BLANK,
            passwordError: constant.BLANK,
            confirmPasswordError: constant.BLANK
        };
    }

    componentDidUpdate() {
        this.checkRegistered();
    }

    componentDidMount() {
        this.checkRegistered();
    }

    checkRegistered = () => {
        let { registered, history } = this.props;
        if(registered) history.push("/login");
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, username, password } = this.state;
        this.props.RegisterUser({
            name: name, 
            email: email, 
            username: username,
            password: password
        });
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
        const { name, email, username, password, confirmPassword, nameError, emailError, usernameError, passwordError, confirmPasswordError } = this.state;
        const { registerError } = this.props;

        let nameErrorP, emailErrorP, usernameErrorP, passwordErrorP, confirmPasswordErrorP, registerErrorP, button;
        if(nameError === constant.ERROR) nameErrorP = <p>{constant.nameErrorMsg}</p>;
        if(emailError === constant.ERROR) emailErrorP = <p>{constant.emailErrorMsg}</p>;
        if(usernameError === constant.ERROR) usernameErrorP = <p>{constant.usernameErrorMsg}</p>;
        if(passwordError === constant.ERROR) passwordErrorP = <p>{constant.passErrorMsg}</p>;
        if(confirmPasswordError === constant.ERROR) confirmPasswordErrorP = <p>{constant.passMatchErrorMsg}</p>;
        if(registerError) registerErrorP = <p>{constant.registerErrorMsg}</p>;

        const clickable = nameError === constant.ACCEPTED && emailError === constant.ACCEPTED && usernameError === constant.ACCEPTED && passwordError === constant.ACCEPTED && confirmPasswordError === constant.ACCEPTED;
        if(clickable) button = <button type="submit" onClick={this.onSubmit}>Create Account</button>;
        else button = <button type="submit" disabled>Create Account</button>;

        return (
            <div className="form">
                <p>Already have an account? <Link to='/login'>login</Link></p>
                <form spellCheck="false">
                    <label htmlFor="name">First Name:</label>
                    <input className="name" type="text" id="name" name="name" onChange={this.onNameChange} value={name}/>
                    {nameErrorP}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={this.onEmailChange} value={email}/>
                    {emailErrorP}

                    <label htmlFor="username">Create Username:</label>
                    <input type="text" id="username" name="username" onChange={this.onUsernameChange} value={username}/>
                    {usernameErrorP}

                    <label htmlFor="password">Create Password:</label>
                    <input type="password" id="password" name="password" onChange={this.onPasswordChange} value={password} autoComplete="off"/>
                    {passwordErrorP}

                    <label htmlFor="confirmPassword">Confrim Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={this.onConfirmPasswordChange} value={confirmPassword} autoComplete="off"/>
                    {confirmPasswordErrorP}

                    {button}

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
    registerError: state.register.registerError,
    registering: state.register.registering,
    registered: state.register.registered
});

export default connect(mapStateToProps, { RegisterUser })(RegisterForm);