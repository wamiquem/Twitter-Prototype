import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {userUrl} from '../config';
import twitterLogo from '../images/twitter-logo.png';

//create the Login Component
class Login extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            message: "",
            username: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            authFlag : false
        })
    }
    //input change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }

        fetch(`${userUrl}/account/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    console.log(data);
                    localStorage.setItem('id',data.result.id);
                    localStorage.setItem('username',data.result.username);
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('image',data.result.image);
                    localStorage.setItem('tweetUsers',JSON.stringify(data.result.tweetUsers));
                    localStorage.setItem('tweetUsersDetails',JSON.stringify(data.result.tweetUsersDetails));

                    this.setState({
                        authFlag : true,
                        username: data.username
                    });
                });
            }else{
                res.json().then(data => {
                    console.log(data);
                    this.setState({
                        authFlag : false,
                        message: data.message
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
    }
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(localStorage.getItem('token')){
            redirectVar = <Redirect to= {{ pathname: "/home", username: this.props.username}}/>
        }
        return(
            <div className = "login-page">
                {redirectVar}
                <nav className="navbar navbar-custom">
                <a className="navbar-brand" href="#">
                    <img src={twitterLogo} height="30" alt="twitter logo"></img>
                    Home
                </a>
                </nav>
                
                <div className="container">
                    <form onSubmit = {this.submitLogin}>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2 className="modal-title">Log in to Twitter</h2>
                                </div>
                                <div className="form-group">
                                    <h6 style= {{color:"red"}}>{this.state.message}</h6>
                                    <input className="login-form-control" required onChange = {this.changeHandler} 
                                    type="email"  name="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input className="login-form-control" required onChange = {this.changeHandler} 
                                    type="password" name="password" placeholder="Password"/>
                                </div>
                                <button type="submit" className="custom-btn">Log in</button>           
                            </div> 
                        </div>
                    </form>
                    <div className="login-info">
                        <p>New to Twitter? <Link to="/signup">Sign up now</Link></p> 
                    </div>
                </div>
            </div> 
        )
    }
}

export default Login;