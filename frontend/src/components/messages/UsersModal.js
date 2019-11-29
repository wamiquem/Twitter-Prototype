import React,{Component} from 'react';
import {userUrl} from '../../config';
import menuImage from '../../images/twitter-logo.png'
import {connect} from 'react-redux';
import {addConversationStore} from '../../redux/actions/conversationsAction';

class UsersModal extends Component {
     //call the constructor method
    constructor(props){
      //Call the constrictor of Super class i.e The Component
      super(props);
      this.hideModal = this.hideModal.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.searchUser = this.searchUser.bind(this);
      this.addConversation = this.addConversation.bind(this);
      this.state = {
          message:"",
          searchMessage:"",
          username:"",
          users: []
      }
  }

  hideModal = e => {
      this.props.hideUserModal();
  }

  changeHandler(e) {
    e.preventDefault();
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  clearMessage(e) {
      this.setState({
          message: ""
      })
  }

  addConversation = id =>{
    this.props.addConversation(id);
    this.props.hideUserModal();
  }

  searchUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`${userUrl}/profile/getAllMatchingUsers/?username=${this.state.username}`,{
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
                let searchMessage = "";
                
                const users = data.users.filter(user => user.id.toString() !== localStorage.getItem('id'));
                if(users.length === 0){
                  searchMessage = "No such user. Please try again"
                }
                this.setState({
                    users: users,
                    searchMessage: searchMessage
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
  
  render(){
      return (
          <div className="modal user-modal" data-backdrop="false">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Search and select a User</h4>
                  <button type="button" className="close" onClick = {this.hideModal}
                  data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                
                <div className="modal-body">
                <h6 style= {{color:"red"}}>{this.state.message}</h6>
                <div style={{display:'flex'}}>
                  <div className="col-xs-6 search-people-modal" >
                    <input className="form-control" type="search" name = "username" 
                    onChange = {this.changeHandler} placeholder="&#xF002; Search for people" />
                  </div>
                  <div style={{paddingLeft:'20px'}}>
                    <button className="custom-btn" onClick={this.searchUser}>Search</button>
                  </div>
                </div>
              {
                (this.state.users.length!==0) ? 
                  this.state.users.map(user => (
                    <div style={{display:'flex'}} className="user-box" key={user.id}
                    onClick = {() => this.addConversation(user.id)}>
                      <div class = "profile-image">
                          <img className="float-left img-thumbnail" id="pic" 
                          src = {user.image} alt="Responsive image"></img>
                      </div>
                      <p>{`@${user.username}`}</p>                        
                    </div>
                    )
                  ):
                    <p>{this.state.searchMessage}</p>
              }
              
              </div>
              </div>
              
            </div>
          </div>
        )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addConversation: id => {dispatch(addConversationStore(id))}
  }
}

export default connect(null, mapDispatchToProps)(UsersModal);