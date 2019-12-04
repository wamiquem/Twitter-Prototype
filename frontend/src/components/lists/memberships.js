import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Memberships extends Component {
    constructor(props){
        super(props);

        this.state = {
            ownerName : "",
            ownerUserName : "",
            lists : [],
            searchMessage : ""
        }
    }

    componentDidMount(){
        fetch(`${userUrl}/lists/UserMemberLists/?ownerId=`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            let searchMessage = "";

            const lists = data.lists;
            if(lists.length === 0){
                searchMessage = "This user has not been added any list."
            }
            this.setState({
                lists: lists,
                searchMessage: searchMessage
            })
        });
    }
    render(){
        let navBar = null;
        let navOwned = null;
        let navSubscribed = null;

        navOwned = <li><Link to="/lists/owned">Owned</Link></li>;
        navSubscribed = <li><Link to="/lists/subscriptions">Subscribed</Link></li>;

        navBar = (
            <ul className="nav navbar-nav navbar-right ">
                {navOwned}
                {navSubscribed}
                <li>Member</li>
            </ul>
        );

        return(
            <div>
                <div>
                    <h5>Lists</h5>
                    <Link to="/lists/createList">Create List</Link>
                    {navBar}
                </div>
                <div>
                {
                (this.state.lists.length!==0) ? 
                  this.state.lists.map(list => (
                    <div style={{display:'flex'}} className="user-box" key={list.listId}
                    onClick = {() => this.addConversation(list.listId)}>
                      <div class = "profile-image">
                          <img className="float-left img-thumbnail" id="pic" 
                          src = {list.listOwnerImage} alt="Responsive image"></img>
                      </div>
                      <p>{`${list.listOwnerName}`}</p>
                      &nbsp;
                      <p>{`@${list.listOwnerUserName}`}</p><br/>
                      <p>{`${list.listName}`}</p><br/>
                      <p>{`${list.listDescription}`}</p>
                    </div>
                    )
                  ):
                    <p>{this.state.searchMessage}</p>
                }
                </div>
            </div>
        )
    }
}

export default Memberships;