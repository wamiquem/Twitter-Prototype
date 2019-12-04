import React,{Component} from 'react';
import TweetAddForm from '../components/tweet/TweetAddForm';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getTweetsByUsers} from '../redux/actions/tweetsAction';

//create the Sidebar Component
class Home extends Component {

    componentDidMount(){
        const users = JSON.parse(localStorage.getItem('tweetUsers'));
        this.props.getTweetsByUsers(JSON.stringify([...users, localStorage.getItem('id')]));
    }
    
    render(){
        return(
            <div>
                <TweetAddForm />
                <div className = "container">
                    <div className = "tweet-separator"></div>
                </div>
                <TweetsList tweets={this.props.tweets}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTweetsByUsers: users => {dispatch(getTweetsByUsers(users))}
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);