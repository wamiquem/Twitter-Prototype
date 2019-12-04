import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {listsUrl} from '../../config';

class Owned extends Component {
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
        fetch(`${listsUrl}/lists/UserLists/?ownerId=${this.props.match.params.userId}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            let searchMessage = "";
            console.log("data000===", data);
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
        console.log("this.state==", this.state);
        return(
            <div>
                <div className="container">
                    <div className="list-form">
                        <div className="main-div">
                            <h5>Lists</h5>
                            <Link to="/lists/createList">Create List</Link>
                            {navBar}
                
                
                                {
                                (this.state.lists.length!==0) ? 
                                this.state.lists.map(list => (
                                    <div style={{display:'flex'}} className="list-box">
                                        <div class = "profile-image">
                                            <img className="float-left img-thumbnail" id="pic" 
                                            src = "" alt=""></img>
                                        </div>
                                        <div>
                                            <p>{`@${list.listOwnerUserName}`}</p>
                                            <p>{`${list.listName}`}</p>
                                            <p>{`${list.listDescription}`}</p>
                                            <p>{`${list.listMembers.length} members`}</p>
                                            <p>{`${list.listSubscribers.length} subscribers`}</p>
                                        </div>   
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

export default Owned;
