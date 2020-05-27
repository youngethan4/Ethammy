import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authUser } from './authActions.js'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this
  }

  onSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.authUser(credentials);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.props.user;

    var errorMessage;
    if (error && error !== ""){
      errorMessage = 
        <p>{ error }</p>
    }

    return (
      <div>
        {errorMessage}
      </div>
    );
  }
}

LoginForm.propTypes = {
  authUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.user.error
});

export default connect(mapStateToProps, { authUser })(LoginForm);
