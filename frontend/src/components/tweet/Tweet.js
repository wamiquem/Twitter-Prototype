import React,{Component} from 'react';
import {userUrl} from '../../config'
import {Link} from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import likeIcon from '../../images/tweet-like-icon.png'
import unlikeIcon from '../../images/tweet-unlike-icon.png'
import retweetIcon from '../../images/tweet-rewteet-icon.png'
import replyIcon from '../../images/tweet-reply-icon.png'
import menuImage from '../../images/twitter-logo.png'
import bookmarkIcon from '../../images/tweet-bookmark-icon.png'

const images = [
    'https://twitter-prototype-project.s3-us-west-1.amazonaws.com/twitter%3A1573709844546.jpeg',
    'https://twitter-prototype-project.s3-us-west-1.amazonaws.com/default_profile_pic.jpg',
    'https://twitter-prototype-project.s3-us-west-1.amazonaws.com/twitter%3A1573709844546.jpeg',
    'https://twitter-prototype-project.s3-us-west-1.amazonaws.com/default_profile_pic.jpg',
  ];
class Tweet extends Component {
     constructor(props){
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    componentDidMount(){
        
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
        return(
            <div>
                <div style={{display:'flex'}}>
                    <div class = "tweet-profile-image">
                        <img className="float-left img-thumbnail" id="pic" 
                        src = {menuImage} alt="Responsive image"></img>
                    </div>
                    <div>
                        <div style={{display:'flex'}}>
                            <Link to="/user">@username</Link>
                            <p>{` - Date`}</p>
                        </div>
                        <p style={{verticalAlign: 'top'}}>username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username username </p>
                        <div style = {{display:'flex', flexWrap:'wrap'}} onClick={() => this.setState({ isOpen: true })}>
                            <div class="tweet-add-image">
                                <img class="rounded float-left img-thumbnail" 
                                src= "" alt="Responsive image"/>
                            </div>
                            <div class="tweet-add-image">
                                <img class="rounded float-left img-thumbnail" 
                                src= "" alt="Responsive image"/>
                            </div>
                            <div class="tweet-add-image">
                                <img class="rounded float-left img-thumbnail" 
                                src= "" alt="Responsive image"/>
                            </div>
                            <div class="tweet-add-image">
                                <img class="rounded float-left img-thumbnail" 
                                src= "" alt="Responsive image"/>
                            </div>
                            {/* add image opener here */}
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', maxWidth:'90%'}}>
                            <img className= "twitter-icon" src={likeIcon}/>
                            {/* <img className= "twitter-icon" src={unlikeIcon}/> */}
                            <img className= "twitter-icon" src={replyIcon}/>
                            <img className= "twitter-icon" src={retweetIcon}/>
                            <img className= "twitter-icon" src={bookmarkIcon}/>
                        </div>
                    </div>
                </div>
                {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })
                    }
                />
                )}
            </div>
        )
    }
}

export default Tweet;