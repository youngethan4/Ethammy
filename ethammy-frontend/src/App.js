import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login';
import HomePage from './pages/home';
import NotFoundPage from './pages/404';
import Register from './pages/register';

function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/404' component={NotFoundPage}/>
        <Redirect to='/404'/> 
      </Switch>
    </div>
  );
}

export default App;
