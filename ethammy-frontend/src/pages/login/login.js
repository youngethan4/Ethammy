import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authUser } from '../../actions/authActions.js'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.authUser(credentials);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.props;

    var errorMessage;
    if (error && error !== ""){
      errorMessage = 
        <p>{ error }</p>
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label for="email">Email:</label>
          <input type="text" name="email" onChange={this.onChange}/><br/>
          <label for="password">Password:</label>
          <input type="text" name="password" onChange={this.onChange}/><br/>
          <button type="submit">Log In</button>
        </form>
        <div>
          {errorMessage}
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  authUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { authUser })(LoginForm);
