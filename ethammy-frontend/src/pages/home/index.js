import React, { Component } from 'react';


class Home extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <p>Welcome back {user.name}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = auth;
  };

  export default connect(mapStateToProps, { authUser })(Home);

