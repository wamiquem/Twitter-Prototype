import React,{Component} from 'react';
import TweetsList from '../components/tweet/TweetsList'
import {connect} from 'react-redux';
import {getTweetsByHashtag} from '../redux/actions/tweetsAction';

class Hashtag extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getTweetsByHashtag(this.props.match.params.hashtag);
    }
    
    render(){
        return(
            <div>
                <div className="container">
                    <div className="hashtag-view-form">
                        <div className="main-div">
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>{`#${this.props.match.params.hashtag}`}</h5>
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
        getTweetsByHashtag: hashtag => {dispatch(getTweetsByHashtag(hashtag))},
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hashtag);