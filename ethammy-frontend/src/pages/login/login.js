import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser } from '../../actions/authActions.js'
import './login.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { error, email, password } = this.props;

    var errorMessage;
    if (error && error !== ""){
      errorMessage = 
        <p>{ error }</p>
    }

    return (
      <div className="form">
        <p>No account? Register <Link to='/register'>here</Link>.</p>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={this.onChange} value={email}/>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={this.onChange} value={password}/>
          <button type="submit">Log In</button>
          {errorMessage}
        </form>
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
