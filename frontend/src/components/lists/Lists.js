import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Owned from './Owned';
import Subscriptions from './Subscriptions';
import Memberships from './Memberships';
import CreateList from './CreateList';
import AddMemberToList from './AddMemberToList';
import ListTweetFeed from './ListTweetFeed';

//Create a Main Functional Component
function Lists() {
  return (
    <div>
        <Switch>
          <Route path="/lists/owned/:userId" component={Owned}/>
          <Route path="/lists/subscriptions/:userId" component={Subscriptions}/>
          <Route path="/lists/memberships/:userId" component={Memberships}/>
          <Route path="/lists/createList" component={CreateList}/>
          <Route path="/lists/addMemberToList" component={AddMemberToList}/>
          <Route path="/lists/listTweetFeed/:listId" component={ListTweetFeed}/>
        </Switch>
    </div>
  );
}

//Export The Lists Component
export default Lists;