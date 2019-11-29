import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import TweetAddForm from '../components/tweet/TweetAddForm';
import TweetsList from '../components/tweet/TweetsList'

//create the Sidebar Component
class Home extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <TweetAddForm />
                <div className = "container">
                    <div className = "tweet-separator"></div>
                </div>
                <TweetsList />
            </div>
        )
    }
}

export default Home;