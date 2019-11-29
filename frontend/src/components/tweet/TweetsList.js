import React,{Component} from 'react';
import Tweet from './Tweet';

function TweetsList() {
    return(
        <div>
            <div className="container">
                <div className="tweets-list">
                    <div className="main-div">
                        <Tweet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetsList;