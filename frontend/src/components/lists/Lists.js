import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Owned from './Owned';
import CreateList from './CreateList';

//Create a Main Functional Component
function Lists() {
  return (
    <div>
        <Switch>
          <Route path="/lists/owned/:userId" component={Owned}/>
          <Route path="/lists/createList" component={CreateList}/>
        </Switch>
    </div>
  );
}

//Export The Lists Component
export default Lists;