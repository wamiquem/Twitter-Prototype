import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import Page from './Page';

//Create a Main Functional Component
function Main() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/:id" component={Page}/>
        </Switch>
    </div>
  );
}

//Export The Main Component
export default Main;