import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
// import burger from '../images/main_page_burger.jpg'
import landingLeft from '../images/landing-left-half.jpg'

//create the Landing Component
function Landing() {
    let redirectVar = null;
    if(localStorage.getItem('token')){
        redirectVar = <Redirect to="/home"/>;
    }
    return (
        <div className="container-fluid container-margin">
        {redirectVar}
            <div class = "login-image">
                <img width = '100%' height = 'auto' src={landingLeft} alt="Responsive image"></img>
            </div>
            
            <div class = "login-links">
                <p>See what's happening in the world right now</p>
                <Link to="/signup">
                <button className="signup-btn">
                    Sign up
                </button>
                </Link>
                <div className="separator"/>
                <Link to="/login">
                <button className="login-btn">
                    Log in
                    </button>
                </Link>
            </div>
        </div>
    );
  }

export default Landing;