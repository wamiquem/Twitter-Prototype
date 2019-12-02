import React,{Component} from 'react';
import {connect} from 'react-redux';
import {replyTweet} from '../../redux/actions/tweetsAction';

class RepliesModal extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.clearReply = this.clearReply.bind(this);
        this.state = {
            reply: ""
        }
    }

    hideModal = e => {
        this.props.hideReplyModal();
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    clearReply(e) {
        this.setState({
            reply: ""
        })
    }

    submitReply = (e) => {
        e.preventDefault();
        const data = {
            tweet_id: this.props.tweet_id,
            reply: {
                user_id: localStorage.getItem('id'),
                user_username: localStorage.getItem('username'),
                user_image: localStorage.getItem('image'),
                date: new Date().toLocaleString(),
                text : this.state.reply
            }
        }
        this.props.replyTweet(data);
        this.hideModal(e);
    }
    
    render(){
        return (
            <div className="modal message-modal" data-backdrop="false">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Reply this tweet</h4>
                    <button type="button" className="close" onClick = {this.hideModal}
                    data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <form onSubmit = {this.submitReply}>
                  <div className="modal-body">                    
                    <textarea required onChange = {this.changeHandler} placeholder="New Reply"
                        type="text" value = {this.state.reply} className="form-control msg-textarea" 
                        name="reply" rows='3' 
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick = {this.hideModal}
                    className="custom-btn" data-dismiss="modal">Close</button>
                    <button type="button" onClick = {this.clearReply} className="custom-btn">Clear</button>
                    <button type="submit" className="custom-btn">Reply</button>
                  </div>
                  </form>
                </div>
                
              </div>
            </div>
          )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        replyTweet: data => {dispatch(replyTweet(data))}
    }
}

const mapStateToProps = (state) => {
    return {
        responseMessage: state.tweets.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesModal);