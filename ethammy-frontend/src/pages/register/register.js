import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    RegisterUser,
    CheckPassword,
    CheckPasswordMatch,
    CheckEmail 
} from '../../actions/registerActions.js'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
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

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="name">First Name:</label>
                    <input type="text" name="name" onChange={this.onChange}/><br/>

                    <label for="email">Email:</label>
                    <input type="text" name="email" onChange={this.onChange}/><br/>

                    <label for="username">Create Username:</label>
                    <input type="text" name="username" onChange={this.onChange}/><br/>

                    <label for="password">Create Password:</label>
                    <input type="text" name="email" onChange={this.onChange}/><br/>

                    <label for="confirmPassword">Confrim Password:</label>
                    <input type="text" name="confirmPassword" onChange={this.onChange}/><br/>
                    <button type="submit">Create Account</button>
                </form>
                <div>
                    {errorMessage}
                </div>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    RegisterUser: PropTypes.func.isRequired,
    CheckPassword: PropTypes.func.isRequired,
    CheckPasswordMatch: PropTypes.func.isRequired,
    CheckEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    var { registerError,  matchPasswordError, passwordError, emailError} = state.register;
    var clickable = 

    return {
        registerError: registerError,
        matchPasswordError: matchPasswordError,
        passwordError: passwordError,
        emailError: emailError
    }
}
    
);

export default connect(mapStateToProps, { 
    RegisterUser,
    CheckPassword,
    CheckPasswordMatch,
    CheckEmail   
})(RegisterForm);
