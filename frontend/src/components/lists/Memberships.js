import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {listsUrl} from '../../config';
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
        fetch(`${listsUrl}/lists/UserMemberLists/?userId=${this.props.match.params.userId}`,{
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

        navOwned = <li><Link to={`/lists/owned/${this.props.match.params.userId}`}>Owned</Link></li>;
        navSubscribed = <li><Link to={`/lists/subscriptions/${this.props.match.params.userId}`}>Subscribed</Link></li>;
        navBar = (
            <ul className="nav navbar-nav navbar-right ">
                {navOwned}
                {navSubscribed}
                <li>Member</li>
            </ul>
        );

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
                                    <Link to={`/lists/listTweetFeed/${list._id}`} key={list._id}>
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
                                    </Link>
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

export default Memberships;
