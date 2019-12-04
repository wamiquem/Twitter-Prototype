import React,{Component} from 'react';
import {connect} from 'react-redux';
import {inputChangeHandler, imageChangeHandler, updateProfile} from '../redux/actions/profileAction';
import {USStatesAbbr, USStatesNames} from '../config';

class ProfileModal extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            image:"",
            invalidZipMessage: "",
            invalidStateMessage: ""
        }
        this.hideModal = this.hideModal.bind(this);
        this.imageChangeHandler = this.imageChangeHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.validateZip = this.validateZip.bind(this);
        this.validateState = this.validateState.bind(this);
    }

    componentDidMount(){
    }

    hideModal = e => {
        this.props.hideProfileModal();
    }

    refreshPage = e => {
        window.location.reload();
    }

    inputChangeHandler(e) {
        this.props.inputChangeHandler(e);
    }

    imageChangeHandler = (e) => {
        var imageUrl = URL.createObjectURL(e.target.files[0]);
        this.setState(
            { 
                image: e.target.files[0]
            }
        )
        this.props.imageChangeHandler(imageUrl);
    }

    submitUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        if (!this.validateZip(this.props.profile.zip)) {
            this.setState({ invalidZipMessage: "Invalid Zip Format" });
        return;
        } else {
            this.setState({ invalidZipMessage: "" });
        }
        if (!this.validateState(this.props.profile.state.toUpperCase())) {
            this.setState({ invalidStateMessage: "Invalid State Name/Code" });
        return;
        } else {
            this.setState({ invalidStateMessage: "" });
        }
        this.props.updateProfile(this.props.userId, this.props.profile, this.state.image);
        this.hideModal(e);
    }

    validateZip(zip) {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    }

    validateState(state) {
        return (USStatesAbbr.includes(state) || USStatesNames.includes(state));
    }
    
    render(){
        
        return (
            <div className="modal profile-modal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Profile</h5>
                                </div>
                            <form onSubmit={this.submitUpdate}>
                                <div className="modal-body">
                                    <div class="image-upload">
                                        <label htmlFor="upload">
                                            <div class = "user-profile-image">
                                                <img className="float-left img-thumbnail" id="pic" 
                                                src = {this.props.profile.imageUrl} alt=""></img>
                                            </div>
                                        </label>
                                        <input type="file" id="upload" onChange= {this.imageChangeHandler}/>
                                    </div>
                                    <div className="md-form">
                                        <input type="text" id="fname" name="fname" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.fname}/>
                                        <label className="active" for="fname">First name</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="text" id="lname" name="lname" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.lname}/>
                                        <label className="active" for="lname">Last name</label>
                                    </div>
                                    <h6 style= {{color:"red"}}>{this.state.message}</h6>
                                    <div className="md-form">
                                        <input type="text" id="username" name="username" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.username}/>
                                        <label className="active" for="username">Username</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="number" min="1" step="1" id="phone" name="phone" className="form-control validate"
                                        onChange = {this.inputChangeHandler} required 
                                        value={this.props.profile.phone}/>
                                        <label className="active" for="phone">Phone</label>
                                    </div>
                                    <div className="md-form">
                                        <textarea type="text" id="bio" name="bio" className="form-control md-textarea"
                                        rows="2" onChange = {this.inputChangeHandler} required value={this.props.profile.bio}/>
                                        <label className="active" for="bio">Bio</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="text" id="city" name="city" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.city}/>
                                        <label className="active" for="city">City</label>
                                    </div>
                                    <h6 style= {{color:"red"}}>{this.state.invalidStateMessage}</h6>
                                    <div className="md-form">
                                        <input type="text" id="state" name="state" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.state}/>
                                        <label className="active" for="state">State</label>
                                    </div>
                                    <h6 style= {{color:"red"}}>{this.state.invalidZipMessage}</h6>
                                    <div className="md-form">
                                        <label className="active" for="zip">Zip</label>
                                        <input type="number" min="1" step="1" id="zip" name="zip" className="form-control"
                                        onChange = {this.inputChangeHandler} required value={this.props.profile.zip}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick = {this.refreshPage}
                                    className="custom-btn" data-dismiss="modal">Close</button>
                                    <button type="submit" className="custom-btn">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
          )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputChangeHandler: e => {dispatch(inputChangeHandler(e))},
        imageChangeHandler: imageUrl => {dispatch(imageChangeHandler(imageUrl))},
        updateProfile: (id, profile,image) => {dispatch(updateProfile(id, profile,image))},
    }
}

const mapStateToProps = (state) => {
    return {
        responseMessage: state.profile.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);