import React,{Component} from 'react';
import menuImage from '../../images/twitter-logo.png'
import uploadIcon from '../../images/image-upload-icon.png'
import {messageUrl} from '../../config';

class TweetAddForm extends Component {
     constructor(props){
        super(props);
        this.state = {
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount(){
    }

    //input change handler to update state variable with the text entered by the user
    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="add-tweet-form">
                        <div className="main-div">
                            <p className="font-weight-bold" >Home</p>
                            <hr/>
                            <div style={{display:'flex'}}>
                                <div class = "tweet-profile-image">
                                    <img className="float-left img-thumbnail" id="pic" 
                                        src = {menuImage} alt="Responsive image"></img>
                                </div>
                                <div>
                                    <form onSubmit = {this.submitAdd} >
                                        <div style={{paddingBottom:'10px', paddingLeft:'10px'}}>
                                            <textarea autoFocus class="form-control desc-textarea" style={{borderColor:'white'}}
                                            rows="3" name="description" onChange = {this.changeHandler}
                                            placeholder="What's happening?"/>
                                        </div>
                                    </form>
                                    <div style={{display:'flex'}}>
                                        <div class="image-upload">
                                            <label for="upload">
                                                <img src={uploadIcon}/>
                                            </label>
                                            <input  type="file" id="upload" onChange= {this.handleFileUpload}/>
                                        </div>
                                        <button onClick={this.submitSignup} className="custom-btn">Tweet</button>
                                    </div>
                            
                                    <div style = {{display:'flex', flexWrap:'wrap'}}>
                                        <div class="tweet-add-image">
                                            <img class="rounded float-left img-thumbnail" 
                                            src= "" alt="Responsive image"/>
                                        </div>
                                        {/* <div class="tweet-add-image">
                                            <img class="rounded float-left img-thumbnail" 
                                            src= "" alt="Responsive image"/>
                                        </div>
                                        <div class="tweet-add-image">
                                            <img class="rounded float-left img-thumbnail" 
                                            src= "" alt="Responsive image"/>
                                        </div>
                                        <div class="tweet-add-image">
                                            <img class="rounded float-left img-thumbnail" 
                                            src= "" alt="Responsive image"/>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default TweetAddForm;