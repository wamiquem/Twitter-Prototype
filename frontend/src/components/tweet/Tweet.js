import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import likeIcon from '../../images/tweet-like-icon.png'
import unlikeIcon from '../../images/tweet-unlike-icon.png'
import retweetIcon from '../../images/tweet-retweet-icon.png'
import unretweetIcon from '../../images/tweet-untweet-icon.png'
import replyIcon from '../../images/tweet-reply-icon.png'
import bookmarkIcon from '../../images/tweet-bookmark-icon.png'
import unbookmarkIcon from '../../images/tweet-unbookmark-icon.png'
import deleteIcon from '../../images/tweet-delete-icon.png'
import {connect} from 'react-redux';
import RepliesModal from './RepliesModal';
import {deleteTweet, likeTweet, unlikeTweet, bookmarkTweet, unbookmarkTweet, retweetTweet, unretweetTweet} 
from '../../redux/actions/tweetsAction';
import ReplyBox from './ReplyBox';
import Hypertext from '../Hypertext';

class Tweet extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.showReplyModal = this.showReplyModal.bind(this);
        this.hideReplyModal = this.hideReplyModal.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            liked: false,
            bookmarked: false,
            showReplyModal: false,
            retweetText: "",
            retweeted: false
        };
    }

    componentDidMount(){
        const id = localStorage.getItem('id');
        if(this.props.tweet.liked_by.includes(id)){
            this.setState(
                {
                    liked: true
                }
            )
        }
        if(this.props.tweet.bookmarked_by.includes(id)){
            this.setState(
                {
                    bookmarked: true
                }
            )
        }
        if(this.props.tweet.retweeted_by.includes(id)){
            this.setState(
                {
                    retweeted: true
                }
            )
        }
        if(this.props.tweet.retweeted_by.length>0){
            const tweetUsers = JSON.parse(localStorage.getItem('tweetUsers'));
            var retweetLeaders = tweetUsers.filter(user=> this.props.tweet.retweeted_by.includes(user));
            if(retweetLeaders.length >0 && retweetLeaders.length === 1){
                if(retweetLeaders[0]!== localStorage.getItem('id')){
                    var leaderUsername = JSON.parse(localStorage.getItem('tweetUsersDetails'))[retweetLeaders[0]]
                    this.setState(
                        {
                            retweetText: `Retweeted by @${leaderUsername}`
                        }
                    )
                }else{
                    this.setState(
                        {
                            retweetText: `Retweeted by you`
                        }
                    )
                }
            } else if(retweetLeaders.length > 1){
                this.setState(
                    {
                        retweetText: `Retweeted by multiple following users`
                    }
                )
            }
        }

    }

    showReplyModal = e => {
        this.setState({
            showReplyModal: true
        });
    }

    hideReplyModal = e => {
        this.setState({
            showReplyModal: false
        });
    }

    handleDelete = e => {
        e.preventDefault();
        this.props.deleteTweet(this.props.tweet._id);
    }

    handleLike = e => {
        e.preventDefault();
        this.props.likeTweet(this.props.tweet._id);
        this.setState({
            liked: !this.state.liked
        })
    }

    handleUnlike = e => {
        e.preventDefault();
        this.props.unlikeTweet(this.props.tweet._id);
        this.setState({
            liked: !this.state.liked
        })
    }

    handleBookmark = e => {
        e.preventDefault();
        this.props.bookmarkTweet(this.props.tweet._id);
        this.setState({
            bookmarked: !this.state.bookmarked
        })
    }

    handleUnbookmark = e => {
        e.preventDefault();
        this.props.unbookmarkTweet(this.props.tweet._id);
        this.setState({
            bookmarked: !this.state.bookmarked
        })
    }

    handleRetweet = e => {
        e.preventDefault();
        this.props.retweetTweet(this.props.tweet._id);
        this.setState({
            retweeted: !this.state.retweeted
        })
    }

    handleUnretweet = e => {
        e.preventDefault();
        this.props.unretweetTweet(this.props.tweet._id);
        this.setState({
            retweeted: !this.state.retweeted
        })
    }

    showMessageModal = e => {
        this.setState({
            showMessageModal: true
        });
    }

    hideMessageModal = e => {
        this.setState({
            showMessageModal: false
        });
    }

    render(){
        const { photoIndex, isOpen } = this.state;
        var likedIcon = (
            <img onClick={this.handleLike} alt="" className= "twitter-icon" src={unlikeIcon}/>
        );
        if(this.state.liked){
            likedIcon = (
                <img onClick={this.handleUnlike} alt="" className= "twitter-icon" src={likeIcon}/>
            )
        };

        var bookmarkedIcon = (
            <img onClick={this.handleBookmark} alt="" className= "twitter-icon" src={unbookmarkIcon}/>
        );
        if(this.state.bookmarked){
            bookmarkedIcon = (
                <img onClick={this.handleUnbookmark} alt="" className= "twitter-icon" src={bookmarkIcon}/>
            )
        };

        var retweetedIcon = (
            <img onClick={this.handleRetweet} alt="" className= "twitter-icon" src={unretweetIcon}/>
        );
        if(this.state.retweeted){
            retweetedIcon = (
                <img onClick={this.handleUnretweet} alt="" className= "twitter-icon" src={retweetIcon}/>
            )
        };

        return(
            <div className = "tweet-box">
                <p>{this.state.retweetText}</p>
                <div style={{display:'flex'}}>
                    <div className = "tweet-profile-image">
                        <img className="float-left img-thumbnail" id="pic" 
                        src = {this.props.tweet.user_image} alt=""></img>
                    </div>
                    <div style={{marginLeft:'10px'}}>
                        <div style={{display:'flex'}}>
                            <Link to={`/user/${this.props.tweet.user_id}`}>{`@${this.props.tweet.user_username}`}</Link>
                            <p>{` - ${this.props.tweet.created_date_time}`}</p>
                            {this.props.tweet.user_id === localStorage.getItem('id') ? 
                            <img alt="" onClick={this.handleDelete} style={{marginLeft:'30px'}} className= "twitter-icon" src={deleteIcon}/> :
                            null}
                        </div>
                        {/* <p style={{verticalAlign: 'top'}}>{this.props.tweet.content}</p> */}
                        <Hypertext content = {this.props.tweet.content}/>
                        <div style = {{display:'flex', flexWrap:'wrap'}} onClick={() => this.setState({ isOpen: true })}>
                            {
                                this.props.tweet.images_path ? 
                                this.props.tweet.images_path.map((image_path,index)=>(
                                    <div className="tweet-add-image" key={index}>
                                        <img className="rounded float-left img-thumbnail" 
                                        src= {image_path} alt=""/>
                                    </div>
                                ))
                                :
                                null
                            }
                            {/* add image opener here */}
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', maxWidth:'90%'}}>
                            <div style={{display:'flex'}}>
                                {likedIcon}
                                <b>{this.props.tweet.liked_by.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                <img alt="" onClick={this.showReplyModal} className= "twitter-icon" src={replyIcon}/>
                                <b>{this.props.tweet.replies.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                {retweetedIcon}
                                <b>{this.props.tweet.retweeted_by.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                {bookmarkedIcon}
                                <b>{this.props.tweet.bookmarked_by.length}</b>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.tweet.replies ? 
                    this.props.tweet.replies.map(reply =>(
                        <ReplyBox key={reply.user_id} reply={reply}/>
                    ))
                    :
                    null
                }
                {isOpen && (
                <Lightbox
                    mainSrc={this.props.tweet.images_path[photoIndex]}
                    nextSrc={this.props.tweet.images_path[(photoIndex + 1) % this.props.tweet.images_path.length]}
                    prevSrc={this.props.tweet.images_path[(photoIndex + this.props.tweet.images_path.length - 1) % this.props.tweet.images_path]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + this.props.tweet.images_path.length - 1) % this.props.tweet.images_path.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % this.props.tweet.images_path.length,
                    })
                    }
                />
                )}
                {this.state.showReplyModal ? <RepliesModal 
                tweet_id = {this.props.tweet._id} tweet_username = {this.props.tweet.user_username}
                hideReplyModal={this.hideReplyModal}/> : null} 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTweet: id => {dispatch(deleteTweet(id))},
        likeTweet: id => {dispatch(likeTweet(id))},
        unlikeTweet: id => {dispatch(unlikeTweet(id))},
        bookmarkTweet: id => {dispatch(bookmarkTweet(id))},
        unbookmarkTweet: id => {dispatch(unbookmarkTweet(id))},
        retweetTweet: id => {dispatch(retweetTweet(id))},
        unretweetTweet: id => {dispatch(unretweetTweet(id))}
    }
}

const mapStateToProps = state => {
    return {
        responseMessage: state.tweets.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);