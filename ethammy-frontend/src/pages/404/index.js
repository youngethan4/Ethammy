import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <h2>Error: 404 Not Found.</h2>
            <Link to='/'>Back to application</Link>
        </div>
    )
}

export default NotFoundPage;
