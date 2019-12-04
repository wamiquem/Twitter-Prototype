import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import {Redirect} from 'react-router';
import Sidebar from './Sidebar';
import Home from './Home';
import Messages from './messages/Messages';
import User from './User';
import Hashtag from './Hashtag';
import Dashboard from './Dashboard';
import Bookmark from './Bookmark';
import Lists from './lists/Lists'

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
                
                <Sidebar options = {['Home', 'Messages', 'Bookmark', 'Profile', 'Lists', 'Dashboard']}/>
                <div >
                  <Switch>
                      <Route path="/home" component={Home}/>
                      <Route path="/messages" component={Messages}/>
                      <Route key= {this.props.location.pathname} path="/user/:userId" component={User}/>
                      <Route key= {this.props.location.pathname} path="/hashtag/:hashtag" component={Hashtag}/>
                      <Route path="/dashboard" component={Dashboard}/>
                      <Route path="/bookmark" component={Bookmark}/>
                      <Route path="/lists/:id" component={Lists}/>
                  </Switch>
                </div>
                {/* <div class="vl"></div>                 */}
            </div>
        )
    }
}

export default Page;