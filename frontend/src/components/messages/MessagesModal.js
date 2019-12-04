import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addConversationDB, updateConversation} from '../../redux/actions/conversationsAction';

class MessagesModal extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.state = {
            message: ""
        }
    }

    componentDidMount(){
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    hideModal = e => {
        this.props.hideMessageModal();
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    clearMessage(e) {
        this.setState({
            message: ""
        })
    }

    submitSend = (e) => {
        //prevent page from refresh
        e.preventDefault();
        if(this.props.conversation._id){
            let conversation = {
                _id: this.props.conversation._id,
                message: {
                    senderName: localStorage.getItem('username'),
                    sentDate: new Date().toLocaleString(),
                    text : this.state.message
                }
            }
            this.props.updateConversation(conversation);
        } else {
            let conversation = {
                users: this.props.conversation.users,
                message: {
                    senderName: localStorage.getItem('username'),
                    sentDate: new Date().toLocaleString(),
                    text : this.state.message
                }
            }
            this.props.addConversationDB(conversation);
        }
        this.setState({
            message: ""
        })
    }
    
    render(){
        return (
            <div className="modal message-modal" data-backdrop="false">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Conversation</h4>
                    <button type="button" className="close" onClick = {this.hideModal}
                    data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <form onSubmit = {this.submitSend}>
                  <div className="modal-body">
                  {this.props.conversation.messages.length > 0 ? 
                    this.props.conversation.messages.map(message => {
                        return(
                            <div>
                                <h6 className="msg-info">{`@${message.senderName}(${message.sentDate})`}</h6>
                                <p className="bg-info msg-text">{message.text}</p>
                            </div>
                        )
                    }) :
                    <p>No messages related to this user</p>}
                    
                    <div ref={el => { this.el = el; }} />
                    
                    <textarea required onChange = {this.changeHandler} placeholder="New Message"
                        type="text" value = {this.state.message} className="form-control msg-textarea" name="message" rows='3' 
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick = {this.hideModal}
                    className="custom-btn" data-dismiss="modal">Close</button>
                    <button type="button" onClick = {this.clearMessage} className="custom-btn">Clear</button>
                    <button type="submit" className="custom-btn">Send</button>
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
        addConversationDB: conversation => {dispatch(addConversationDB(conversation))},
        updateConversation: conversation => {dispatch(updateConversation(conversation))}
    }
}

const mapStateToProps = (state) => {
    return {
        responseMessage: state.conversations.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesModal);