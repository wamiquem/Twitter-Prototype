import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getTweetsByListUsers} from '../../redux/actions/tweetsAction';
import TweetsList from '../tweet/TweetsList'

//create the Sidebar Component
class ListTweetFeed extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getTweetsByListUsers(this.props.match.params.listId);
    }
    
    render(){
        return(
            <div>
                <div className="container">
                    <div className="bookmark-view-form">
                        <div className="main-div">
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>List Tweets</h5>
                        </div>
                    </div>
                </div>
                <div className = "container">
                    <div className = "tweet-separator font-weight-bold">
                        <h6 className="font-weight-bold" style={{marginLeft:'10px', marginBottom:'0'}}>Tweets</h6>
                    </div>
                </div>
                <TweetsList tweets={this.props.tweets}/>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
         getTweetsByListUsers: listId => {dispatch(getTweetsByListUsers(listId))},
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTweetFeed);