import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import twitterLogo from '../images/twitter-logo.png';

//create the Sidebar Component
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.clear();
    }
    
    render(){
        let menuOptions = this.props.options.map(option => {
            
            return(
                <li>
                    <Link to={`/${option.toLowerCase()}`}>{option}</Link>
                </li>
            )
        })
        return(
            <div>
            <nav className="navbar navbar-inverse navbar-fixed-left sidebar-custom">
                  <div>
                    <ul class="nav navbar-nav">
                        <li>
                            <Link to="/home">
                                <img src={twitterLogo} height="30" alt="twitter logo"></img>
                            </Link>
                        </li>
                      {menuOptions}
                      <li>
                            <Link to="/login" onClick = {this.handleLogout}>
                                Log out
                            </Link>
                        </li>
                    </ul>
                  </div>
            </nav>
            <div className="search-section" >
                <input className="form-control" type="search" name = "username" 
                onChange = {this.changeHandler} placeholder="&#xF002; Search for people" />
            </div>
          </div>
        )
    }
}

export default Sidebar;