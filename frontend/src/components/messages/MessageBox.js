import React,{Component} from 'react';
import {userUrl} from '../../config'
import MessagesModal from './MessagesModal';

class MessageBox extends Component {
     constructor(props){
        super(props);
        this.state = {
            username:"",
            image: "",
            showMessageModal: false,
            message: ""
        }
        this.showMessageModal = this.showMessageModal.bind(this);
        this.hideMessageModal = this.hideMessageModal.bind(this);
    }

    componentDidMount(){
        var receiverId = "";
        if(parseInt(localStorage.getItem('id')) === this.props.conversation.users[0]){
            receiverId = this.props.conversation.users[1];
        }else{
            receiverId = this.props.conversation.users[0];
        }
        const token = localStorage.getItem('token');
        fetch(`${userUrl}/profile/getSpecificUser/?id=${receiverId}`,{
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
            },
        credentials: 'include',
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    this.setState({
                        username: data.user.username,
                        image: data.user.image
                    })
                });
            }else{
                res.json().then(data => {
                    let responseMessage = data.message;
                    this.setState({
                        message: responseMessage
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
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
        return(
            <div >
                <div style={{display:'flex'}} className="message-box" onClick={this.showMessageModal}>
                    <div class = "profile-image">
                        <img className="float-left img-thumbnail" id="pic" 
                        src = {this.state.image} alt="Responsive image"></img>
                    </div>
                    <p>{`@${this.state.username}`}</p>   
                    <p style={{marginLeft: 'auto'}}>{this.props.conversation.updated}</p>          
                </div>
                {this.state.showMessageModal ? <MessagesModal 
                conversation = {this.props.conversation}
                hideMessageModal={this.hideMessageModal}/> : null}      
            </div>
        )
    }
}

export default MessageBox;