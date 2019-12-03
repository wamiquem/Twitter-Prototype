import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import {Redirect} from 'react-router';
import Sidebar from './Sidebar';
import Home from './Home';
import Messages from './messages/Messages';
import User from './User';

class Page extends Component {

    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                
                <Sidebar options = {['Home', 'Messages', 'Bookmarks', 'Profile']}/>
                <div >
                  <Switch>
                      <Route path="/home" component={Home}/>
                      <Route path="/messages" component={Messages}/>
                      <Route path="/user/:userId" component={User}/>
                  </Switch>
                </div>
                {/* <div class="vl"></div>                 */}
            </div>
        )
    }
}

export default Page;