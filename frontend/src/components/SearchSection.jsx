import React,{Component} from 'react';
import {userUrl, hashtagUrl} from '../config';
import {Link} from 'react-router-dom';

class SearchSection extends Component {
     //call the constructor method
    constructor(props){
      //Call the constrictor of Super class i.e The Component
      super(props);
      this.changeHandler = this.changeHandler.bind(this);
      this.searchTwitter = this.searchTwitter.bind(this);
      this.searchUser = this.searchUser.bind(this);
      this.state = {
          search:"",
          users: [],
          hashtags: [],
          userSearchMessage: "",
          hashtagSearchMessage: "",
          message: ""
      }
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

  searchUser = () => {
    const token = localStorage.getItem('token');
    const username = this.state.search.replace("@","");
    fetch(`${userUrl}/profile/getAllMatchingUsers/?username=${username}`,{
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
                let userSearchMessage = "";
                
                if(data.users.length === 0){
                    userSearchMessage = "No such user. Please try again"
                }
                this.setState({
                    users: data.users,
                    userSearchMessage: userSearchMessage,
                    hashtags:[],
                    hashtagSearchMessage: "",
                    message: ""
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

  searchHashtag = () => {
    var data = {
        hashtag: this.state.search
    }
    const token = localStorage.getItem('token');
    fetch(`${hashtagUrl}/searchhashtag`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
            },
        credentials: 'include',
        body: JSON.stringify(data)
        })
      .then(res => {
        if(res.status === 200){
            res.json().then(data => {
                let hashtagSearchMessage = "";
                var hashtags = data.results.rows.map(row => row.hashtag)
                if(hashtags.length === 0){
                    hashtagSearchMessage = "No such hashtag. Please try again"
                }
                this.setState({
                    hashtags: hashtags,
                    userSearchMessage: "",
                    users:[],
                    hashtagSearchMessage: hashtagSearchMessage,
                    message: ""
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

  searchTwitter = (e) => {
    e.preventDefault();
    
    if(!this.state.search.startsWith("@") && !this.state.search.startsWith("#")){
        this.setState({
            message: "Please enter a search criteria for users starting with @ and hashtag starting with #"
        })
    } else if(this.state.search.startsWith("@")){
        this.searchUser();
    } else if(this.state.search.startsWith("#")){
        this.searchHashtag();
    }

    this.setState({
        search: ""
    })
  }
  
  render(){
      return (
        <div className="search-section" >
            <h6 style= {{color:"red"}}>{this.state.message}</h6>
            <h6 style= {{color:"red"}}>{this.state.userSearchMessage}</h6>
            <h6 style= {{color:"red"}}>{this.state.hashtagSearchMessage}</h6>
            <input className="form-control" type="search" name = "search" 
            onChange = {this.changeHandler} placeholder="&#xF002; Search twitter" value={this.state.search}/>
            <button className="custom-btn" onClick={this.searchTwitter}>Search</button>
            {
                (this.state.users.length!==0) ? 
                  this.state.users.map(user => (
                    <Link to={`/user/${user.id}`} key={user.id}>
                        <div className="user-box" >
                            <div class = "profile-image">
                                <img className="float-left img-thumbnail" id="pic" 
                                src = {user.image} alt=""></img>
                            </div>
                            <div style={{marginLeft:'10px'}}>
                                <h6 className="font-weight-bold">{`${user.fname} ${user.lname}`}</h6>
                                <h6>{`@${user.username}`}</h6>
                            </div>
                        </div>
                    </Link>
                    )
                  ):
                    null
              }
                {
                (this.state.hashtags.length!==0) ? 
                  this.state.hashtags.map(hashtag => (
                    <Link to={{ pathname: `/hashtag/${hashtag.replace("#","")}`, hashtagName: hashtag}} key={hashtag}>
                        <div className="hashtag-box" >
                            <h6 className="font-weight-bold">{hashtag}</h6>
                        </div>
                    </Link>
                    )
                  ):
                    null
              }
        </div>
        )
  }
}

export default SearchSection;