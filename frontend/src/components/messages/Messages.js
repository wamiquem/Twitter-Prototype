import React,{Component} from 'react';
import menuImage from '../../images/twitter-logo.png'
import messageIcon from '../../images/new-message-icon.png'
import {messageUrl} from '../../config';
import UsersModal from './UsersModal';
import MessageBox from './MessageBox';
import {connect} from 'react-redux';
import {getConversations} from '../../redux/actions/conversationsAction';

class Messages extends Component {
     constructor(props){
        super(props);
        
        this.state = {
            showUserModal: false
        }
        this.showUserModal = this.showUserModal.bind(this);
        this.hideUserModal = this.hideUserModal.bind(this);
    }

    showUserModal = e => {
        this.setState({
            showUserModal: true
        });
    }

    hideUserModal = e => {
        this.setState({
            showUserModal: false
        });
    }

    componentDidMount(){
        this.props.getConversations();
    }

    //input change handler to update state variable with the text entered by the user
    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    //submit Login handler to send a request to the node backend
    submitAdd = (e) => {
        //prevent page from refresh
        e.preventDefault();

        let section = this.state.sections.find(section => section.name === this.state.section);
        const data = {
            sectionId: section.id,
            name : this.state.name,
            description: this.state.description,
            price: this.state.price
        }

        this.postMenuData(data, (success, menuId) => {
            if(this.state.isNewImage){
                const formData = new FormData();
                formData.append('image', document.querySelector('input[type="file"]').files[0]);
                formData.append('menuId', menuId);
                
                fetch(`${messageUrl}/upload/menu-image`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                .then(res => {
                    res.text().then(data => {
                        console.log(data);
                        this.setState({
                            message: JSON.parse(data).message + " " + success
                        })
                    });
                })
            }
        });
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="messages-page">
                        <div className="main-div">
                           
                        <div style={{display:'flex'}}>
                            <h5 className="font-weight-bold" style={{marginLeft:'10px'}}>Messages</h5>
                                <img style={{marginLeft: 'auto', marginRight:'20px'}} className= "twitter-icon" src={messageIcon}
                                onClick= {this.showUserModal}/>
                            </div>
                            <div className="message-separator"></div>
                            {
                                (this.props.conversations.length!==0) ? 
                                    this.props.conversations.map(conversation => 
                                    <MessageBox conversation={conversation} key={conversation._id}/>
                                    ):
                                    (
                                        <div className="user-box" style={{textAlign:'-webkit-center'}}>
                                            <button className="custom-btn-lg" 
                                            onClick={this.showUserModal}>Start a Conversation</button>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                </div>
                {this.state.showUserModal ? <UsersModal 
                hideUserModal={this.hideUserModal}/> : null} 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getConversations: () => {dispatch(getConversations())}
    }
}

const mapStateToProps = state => {
    return {
        conversations: state.conversations.conversations,
        responseMessage: state.conversations.responseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);