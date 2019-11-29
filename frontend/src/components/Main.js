import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import User from './User';

//Create a Main Functional Component
function Main() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/:id" component={User}/>
        </Switch>
    </div>
  );
}

//Export The Main Component
export default Main;