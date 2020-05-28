import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Ethammy!!!</p>
                <Link to='/login' > Login</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(Home);

