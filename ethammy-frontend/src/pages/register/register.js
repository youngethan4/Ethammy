import React, { Component } from 'react'

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
        const registrationDetails = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
    
        this.props.registerUser(registrationDetails);
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

export default RegisterForm;
