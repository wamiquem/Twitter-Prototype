import React,{Component} from 'react';
import locationIcon from '../images/location-icon.png'
import calendarIcon from '../images/calendar-icon.png'
import ProfileModal from './ProfileModal';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getProfile} from '../redux/actions/profileAction';
import {getTweetsByUserId} from '../redux/actions/tweetsAction';
import {userUrl} from '../config';
import {Redirect} from 'react-router-dom';

//create the Sidebar Component
class User extends Component {
    constructor(props){
        super(props);

    this.state = {
        showProfileModal: false,
        following: false,
        responseMessage:""
    }
    this.showProfileModal = this.showProfileModal.bind(this);
    this.hideProfileModal = this.hideProfileModal.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('tweetUsers').includes(this.props.match.params.userId)){
            this.setState(
                {
                    following: true
                }
            )
        }
        this.props.getProfile(this.props.match.params.userId);
        this.props.getTweetsByUserId(this.props.match.params.userId);
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

    deleteAccount = e => {
        e.preventDefault();
        fetch(`${userUrl}/profile/delete/?id=${localStorage.getItem('id')}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    localStorage.clear();
                    this.setState({
                        responseMessage: resData.message
                    })
                });
            }else{
                res.json().then(resData => {
                    this.setState({
                        responseMessage: resData.message
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    followUser = e => {
        e.preventDefault();
        const data = {
            follower: localStorage.getItem('id'),
            leader: this.props.match.params.userId,
            leader_username: this.props.profile.username
        }
        fetch(`${userUrl}/profile/follow`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    var followedUsers = JSON.parse(localStorage.getItem('tweetUsers'));
                    localStorage.setItem('tweetUsers',JSON.stringify([...followedUsers, this.props.match.params.userId]));
                    var followedUsersDetails = JSON.parse(localStorage.getItem('tweetUsersDetails'));
                    followedUsersDetails[data.leader] = data.leader_username;
                    localStorage.setItem('tweetUsersDetails',JSON.stringify(followedUsersDetails));
                    this.setState({
                        following: !this.state.following
                    })
                });
            }else{
                res.json().then(resData => {
                    this.setState({
                        message: resData.message
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    unfollowUser = e => {
        e.preventDefault();
        const data = {
            follower: localStorage.getItem('id'),
            leader: this.props.match.params.userId
        }
        fetch(`${userUrl}/profile/unfollow`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    var followedUsers = JSON.parse(localStorage.getItem('tweetUsers'));
                    followedUsers.splice( followedUsers.indexOf(data.leader), 1 );
                    localStorage.setItem('tweetUsers',JSON.stringify(followedUsers));
                    var followedUsersDetails = JSON.parse(localStorage.getItem('tweetUsersDetails'));
                    delete followedUsersDetails[data.leader];
                    localStorage.setItem('tweetUsersDetails',JSON.stringify(followedUsersDetails));
                    this.setState({
                        following: !this.state.following
                    })
                });
            }else{
                res.json().then(resData => {
                    this.setState({
                        message: resData.message
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    render(){
        var activeButton = <button onClick= {this.showProfileModal} className="custom-btn-lg">Edit Profile</button>;
        var deleteButton = <button style={{marginTop:'10px'}} onClick= {this.deleteAccount} className="custom-btn-lg">Delete Account</button>
        var viewButton = null;
        if(this.props.match.params.userId !== localStorage.getItem('id')){
            activeButton = <button onClick= {this.followUser} className="custom-btn-lg">Follow</button>;
            if(this.state.following){
                activeButton = <button onClick= {this.unfollowUser} className="custom-btn-lg">Following</button>;
            }
            deleteButton = null;
            viewButton = <button style={{marginTop:'10px'}} className="custom-btn-lg">Subscribe List</button>
        }
        if(!this.props.profile.username){
            activeButton = null;
            viewButton = null;
        }
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= {{ pathname: "/login"}}/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                    <div className="user-view-form">
                        <div className="main-div">
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>{`${this.props.profile.fname} ${this.props.profile.lname}`}</h5>
                            <hr/>
                            <h6 style= {{color:"red"}}>{this.props.profile.responseMessage}</h6>
                            <h6 style= {{color:"red"}}>{this.state.responseMessage}</h6>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div className = "user-profile-image">
                                    <img className="float-left img-thumbnail" id="pic" 
                                        src = {this.props.profile.imageUrl} alt=""></img>
                                </div>
                                <div className="user-page-button">                                        
                                    {activeButton}
                                    {deleteButton}
                                    {viewButton}
                                    {/* <button onClick= {this.showProfileModal} className="custom-btn-lg">Edit Profile</button> */}
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
                        <h6 className="font-weight-bold" style={{marginLeft:'10px', marginBottom:'0'}}>Tweets</h6>
                    </div>
                </div>
                {
                    this.props.profile.fname ? 
                    <TweetsList tweets={this.props.tweets}/>
                    :
                    null
                }
                {this.state.showProfileModal ? <ProfileModal profile = {this.props.profile}
                hideProfileModal={this.hideProfileModal} userId = {this.props.match.params.userId}/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: id => {dispatch(getProfile(id))},
        getTweetsByUserId: id => {dispatch(getTweetsByUserId(id))},
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);