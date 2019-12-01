import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import likeIcon from '../../images/tweet-like-icon.png'
import unlikeIcon from '../../images/tweet-unlike-icon.png'
import retweetIcon from '../../images/tweet-rewteet-icon.png'
import replyIcon from '../../images/tweet-reply-icon.png'
import bookmarkIcon from '../../images/tweet-bookmark-icon.png'
import deleteIcon from '../../images/tweet-delete-icon.png'
import {connect} from 'react-redux';
import {deleteTweet, likeTweet, unlikeTweet} from '../../redux/actions/tweetsAction';

class Tweet extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            liked: false
        };
    }

    componentDidMount(){
        if(this.props.tweet.liked_by.includes(localStorage.getItem('id'))){
            this.setState(
                {
                    liked: true
                }
            )
        }
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
        var heartIcon = (
            <img onClick={this.handleLike} className= "twitter-icon" src={unlikeIcon}/>
        );
        if(this.state.liked){
            heartIcon = (
                <img onClick={this.handleUnlike} className= "twitter-icon" src={likeIcon}/>
            )
        };

        return(
            <div className = "tweet-box">
                <div style={{display:'flex'}}>
                    <div class = "tweet-profile-image">
                        <img className="float-left img-thumbnail" id="pic" 
                        src = {this.props.tweet.user_image} alt="Responsive image"></img>
                    </div>
                    <div>
                        <div style={{display:'flex'}}>
                            <Link to="/user">{`@${this.props.tweet.user_username}`}</Link>
                            <p>{` - ${this.props.tweet.created_date_time}`}</p>
                            {this.props.tweet.user_id === localStorage.getItem('id') ? 
                            <img onClick={this.handleDelete} style={{marginLeft:'30px'}} className= "twitter-icon" src={deleteIcon}/> :
                            null}
                        </div>
                        <p style={{verticalAlign: 'top'}}>{this.props.tweet.content}</p>
                        <div style = {{display:'flex', flexWrap:'wrap'}} onClick={() => this.setState({ isOpen: true })}>
                            {
                                this.props.tweet.images_path ? 
                                this.props.tweet.images_path.map((image_path,index)=>(
                                    <div class="tweet-add-image" key={index}>
                                        <img class="rounded float-left img-thumbnail" 
                                        src= {image_path} alt="Responsive image"/>
                                    </div>
                                ))
                                :
                                null
                            }
                            {/* add image opener here */}
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', maxWidth:'90%'}}>
                            <div style={{display:'flex'}}>
                                {heartIcon}
                                <b>{this.props.tweet.liked_by.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                <img className= "twitter-icon" src={replyIcon}/>
                                <b>{this.props.tweet.replies.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                <img className= "twitter-icon" src={retweetIcon}/>
                                <b>{this.props.tweet.retweeted_by.length}</b>
                            </div>
                            <div style={{display:'flex'}}>
                                <img className= "twitter-icon" src={bookmarkIcon}/>
                                <b>{this.props.tweet.bookmarked_by.length}</b>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTweet: id => {dispatch(deleteTweet(id))},
        likeTweet: id => {dispatch(likeTweet(id))},
        unlikeTweet: id => {dispatch(unlikeTweet(id))}
    }
}

const mapStateToProps = state => {
    return {
        responseMessage: state.tweets.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);