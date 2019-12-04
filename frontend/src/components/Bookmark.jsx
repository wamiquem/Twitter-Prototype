import React,{Component} from 'react';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getBookmarkedTweetsByUserId} from '../redux/actions/tweetsAction';

//create the Sidebar Component
class Bookmark extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getBookmarkedTweetsByUserId(localStorage.getItem('id'));
    }
    
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
                <TweetsList tweets={this.props.tweets}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBookmarkedTweetsByUserId: id => {dispatch(getBookmarkedTweetsByUserId(id))},
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);