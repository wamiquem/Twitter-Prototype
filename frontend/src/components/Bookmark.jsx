import React,{Component} from 'react';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getTweetsByUserId} from '../redux/actions/tweetsAction';

//create the Sidebar Component
class Bookmark extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(localStorage.getItem('tweetUsers').includes(this.props.match.params.userId)){
            this.setState(
                {
                    following: true
                }
            )
        }
        // this.props.getProfile(this.props.match.params.userId);
        // this.props.getTweetsByUserId(this.props.match.params.userId);
    }

    // followUser = e => {
    //     e.preventDefault();
    //     const data = {
    //         follower: localStorage.getItem('id'),
    //         leader: this.props.match.params.userId,
    //         leader_username: this.props.profile.username
    //     }
    //     fetch(`${userUrl}/profile/follow`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json,  text/plain, */*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //         credentials: 'include',
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => {
    //         if(res.status === 200){
    //             res.json().then(resData => {
    //                 var followedUsers = JSON.parse(localStorage.getItem('tweetUsers'));
    //                 localStorage.setItem('tweetUsers',JSON.stringify([...followedUsers, this.props.match.params.userId]));
    //                 var followedUsersDetails = JSON.parse(localStorage.getItem('tweetUsersDetails'));
    //                 followedUsersDetails[data.leader] = data.leader_username;
    //                 localStorage.setItem('tweetUsersDetails',JSON.stringify(followedUsersDetails));
    //                 this.setState({
    //                     following: !this.state.following
    //                 })
    //             });
    //         }else{
    //             res.json().then(resData => {
    //                 this.setState({
    //                     message: resData.message
    //                 })
    //             }) 
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    // unfollowUser = e => {
    //     e.preventDefault();
    //     const data = {
    //         follower: localStorage.getItem('id'),
    //         leader: this.props.match.params.userId
    //     }
    //     fetch(`${userUrl}/profile/unfollow`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json,  text/plain, */*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //         credentials: 'include',
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => {
    //         if(res.status === 200){
    //             res.json().then(resData => {
    //                 var followedUsers = JSON.parse(localStorage.getItem('tweetUsers'));
    //                 followedUsers.splice( followedUsers.indexOf(data.leader), 1 );
    //                 localStorage.setItem('tweetUsers',JSON.stringify(followedUsers));
    //                 var followedUsersDetails = JSON.parse(localStorage.getItem('tweetUsersDetails'));
    //                 delete followedUsersDetails[data.leader];
    //                 localStorage.setItem('tweetUsersDetails',JSON.stringify(followedUsersDetails));
    //                 this.setState({
    //                     following: !this.state.following
    //                 })
    //             });
    //         }else{
    //             res.json().then(resData => {
    //                 this.setState({
    //                     message: resData.message
    //                 })
    //             }) 
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }
    
    render(){
        return(
            <div>
                <div className="container">
                    <div className="bookmark-view-form">
                        <div className="main-div">
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>Bookmarked Tweets</h5>
                        </div>
                    </div>
                </div>
                <div className = "container">
                    <div className = "tweet-separator font-weight-bold">
                        <h6 className="font-weight-bold" style={{marginLeft:'10px', marginBottom:'0'}}>Tweets</h6>
                    </div>
                </div>
                {/* <TweetsList tweets={this.props.tweets}/>
                {this.state.showProfileModal ? <ProfileModal profile = {this.props.profile}
                hideProfileModal={this.hideProfileModal} userId = {this.props.match.params.userId}/> : null} */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getBookmarkedTweetsByUserId: id => {dispatch(getBookmarkedTweetsByUserId(id))},
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);