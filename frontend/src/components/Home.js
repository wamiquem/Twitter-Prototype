import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import TweetAddForm from '../components/tweet/TweetAddForm';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getTweetsByUsers} from '../redux/actions/tweetsAction';

//create the Sidebar Component
class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const users = localStorage.getItem('tweetUsers');
        this.props.getTweetsByUsers(users);
    }
    
    render(){
        console.log("this.props===",this.props)
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