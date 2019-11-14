import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Landing from './Landing'

//Create a Main Functional Component
function Main() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={Landing}/>
        </Switch>
    </div>
  );
}

//Export The Main Component
export default Main;