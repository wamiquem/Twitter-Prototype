import React,{Component} from 'react';
import locationIcon from '../images/location-icon.png'
import calendarIcon from '../images/calendar-icon.png'
import ProfileModal from './ProfileModal';
import {Link} from 'react-router-dom';
import TweetAddForm from '../components/tweet/TweetAddForm';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getProfile} from '../redux/actions/profileAction';

//create the Sidebar Component
class User extends Component {
    constructor(props){
        super(props);

    this.state = {
        showProfileModal: false
    }
    this.showProfileModal = this.showProfileModal.bind(this);
    this.hideProfileModal = this.hideProfileModal.bind(this);
    }

    componentDidMount(){
        this.props.getProfile(this.props.match.params.userId);
    }

    showProfileModal = e => {
        this.setState({
            showProfileModal: true
        });
    }

    hideProfileModal = e => {
        this.setState({
            showProfileModal: false
        });
    }
    
    render(){
        // console.log("this.props===",this.props)
        return(
            <div>
                <div className="container">
                    <div className="user-view-form">
                        <div className="main-div">
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>Home</h5>
                            <hr/>
                            <h6 style= {{color:"red"}}>{this.props.profile.responseMessage}</h6>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div className = "user-profile-image">
                                    <img className="float-left img-thumbnail" id="pic" 
                                        src = {this.props.profile.imageUrl} alt="Responsive image"></img>
                                </div>
                                <div className="user-page-button">
                                    <button onClick= {this.showProfileModal} className="custom-btn-lg">Edit Profile</button>
                                </div>
                            </div>
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>{`${this.props.profile.fname} ${this.props.profile.lname}`}</h5>
                            <h6 className="text-muted" style={{marginLeft:'10px'}}>{`@${this.props.profile.username}`}</h6>
                            {
                                this.props.profile.bio ? 
                                <p style={{marginLeft:'10px', fontWeight:'bolder'}}>{this.props.profile.bio}</p>
                                :
                                null
                            }
                            <div style={{display:'flex'}}>
                                {
                                    this.props.profile.city ? 
                                    (<div style={{display:'flex'}}>
                                        <img className= "twitter-icon" src={locationIcon}/>
                                        <b>{`${this.props.profile.city}, ${this.props.profile.state}, ${this.props.profile.zip}`}</b>
                                    </div>)
                                    :
                                    null
                                }
                                <div style={{display:'flex'}}>
                                    <img className= "twitter-icon" src={calendarIcon}/>
                                    <b>{`Joined ${this.props.profile.added}`}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "container">
                    <div className = "tweet-separator font-weight-bold">
                        <h6 className="font-weight-bold" style={{marginLeft:'10px'}}>Tweets</h6>
                    </div>
                </div>
                {this.state.showProfileModal ? <ProfileModal profile = {this.props.profile}
                hideProfileModal={this.hideProfileModal} userId = {this.props.match.params.userId}/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: id => {dispatch(getProfile(id))}
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);