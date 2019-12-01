import React,{Component} from 'react';
import Tweet from './Tweet';

function TweetsList(props) {
    return(
        <div>
            <div className="container">
                <div className="tweets-list">
                    <div className="main-div">
                        {
                            props.tweets.map(tweet => (
                                <Tweet tweet={tweet} key={tweet._id}/>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetsList;