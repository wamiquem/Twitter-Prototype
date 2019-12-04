import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import twitterLogo from '../images/twitter-logo.png';
import SearchSection from './SearchSection';

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
            if(option === 'Profile'){
                return(
                    <li key={option}>
                        <Link to={`/user/${localStorage.getItem('id')}`}>{option}</Link>
                    </li>
                )
            }
            if(option === 'Lists'){
                return(
                    <li key={option}>
                        <Link to={`/lists/owned/${localStorage.getItem('id')}`}>{option}</Link>
                    </li>
                )
            }
            return(
                <li key={option}>
                    <Link to={`/${option.toLowerCase()}`}>{option}</Link>
                </li>
            )
        })
        return(
            <div>
            <nav className="navbar navbar-inverse navbar-fixed-left sidebar-custom">
                  <div>
                    <ul className="nav navbar-nav">
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
            <SearchSection/>
          </div>
        )
    }
}

export default Sidebar;