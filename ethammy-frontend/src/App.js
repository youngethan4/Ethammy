import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import LoginForm from './pages/login';
import HomePage from './pages/home';
import NotFoundPage from './pages/404';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/404' component={NotFoundPage}/>
          <Redirect to='/404'/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
