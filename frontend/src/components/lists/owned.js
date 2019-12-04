import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class owned extends Component {
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
        fetch(`${userUrl}/lists/UserLists/?ownerId=`,{
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
                searchMessage = "This user does not have any list."
            }
            this.setState({
                lists: lists,
                searchMessage: searchMessage
            })
        });
    }
    render(){
        let navBar = null;
        let navSubscribed = null;
        let navMember = null;

        navSubscribed = <li><Link to="/lists/subscriptions">Subscribed</Link></li>;
        navMember = <li><Link to="/lists/memberships">Member</Link></li>;

        navBar = (
            <ul className="nav navbar-nav navbar-right ">
                <li>Owned</li>
                {navSubscribed}
                {navMember}
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
                      <p>{`${list.listDescription}`}</p><br/>
                      <p>{`${list.listMembers.length} members`}</p>
                      &nbsp;
                      <p>{`${list.listSubscribers.length} subscribers`}</p>
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

export default owned;