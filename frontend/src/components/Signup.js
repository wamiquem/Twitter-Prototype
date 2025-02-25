import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {userUrl} from '../config';

//create the Signup Component
class Signup extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            fname : "",
            lname : "",
            email : "",
            password: "",
            phone: "",
            success: false
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    //Call the Did Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            success : false
        })
    }

    //Name and email change handlers to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const username = `${this.state.fname}${this.state.lname}${Math.floor((Math.random() * 1000) + 1)}`;
        const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            email : this.state.email,
            password : this.state.password,
            phone: this.state.phone,
            username: username
        }

        fetch(`${userUrl}/account/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            if(res.status === 200){
                res.text().then(data => { 
                    console.log(data);
                    this.setState({
                        success : true
                    });

                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data);
                    this.setState({
                        success : false,
                        message: responseMessage.message
                    });
                });
                
            }
        })
        .catch(err => console.log(err));
    }
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        // if(localStorage.getItem('token')){
        //     redirectVar = <Redirect to= "/buyer/home"/>
        // }
        if(this.state.success){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="modal signup-modal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create your account</h5>
                            </div>
                            <form onSubmit={this.submitSignup}>
                                <div className="modal-body">
                                    <h6 style= {{color:"red"}}>{this.state.message}</h6>
                                    <div className="md-form">
                                        <input type="text" id="fname" name="fname" className="form-control validate"
                                        onChange = {this.changeHandler} required/>
                                        <label htmlFor="fname">First name</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="text" id="lname" name="lname" className="form-control validate"
                                        onChange = {this.changeHandler} required/>
                                        <label htmlFor="lname">Last name</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="email" id="email" name="email" className="form-control validate"
                                        onChange = {this.changeHandler} required/>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="password" id="password" name="password" className="form-control validate"
                                        onChange = {this.changeHandler} required/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="number" min="1" step="1" id="phone" name="phone" className="form-control validate"
                                        onChange = {this.changeHandler} required/>
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="custom-btn">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default Signup;