import { CREATE_TWEET_SUCCESS, CREATE_TWEET_FAILED, GET_TWEETS_SUCCESS, GET_TWEETS_FAILED, DELETE_TWEET_SUCCESS,
DELETE_TWEET_FAILED, LIKE_TWEET_SUCCESS, LIKE_TWEET_FAILED, UNLIKE_TWEET_SUCCESS, UNLIKE_TWEET_FAILED,
BOOKMARK_TWEET_SUCCESS, BOOKMARK_TWEET_FAILED, UNBOOKMARK_TWEET_SUCCESS, UNBOOKMARK_TWEET_FAILED,
REPLY_TWEET_SUCCESS, REPLY_TWEET_FAILED, RETWEET_TWEET_SUCCESS, RETWEET_TWEET_FAILED, UNRETWEET_TWEET_SUCCESS, 
UNRETWEET_TWEET_FAILED } from '../actions/types';

const initialState = {
    tweets: [],
    createResponseMessage: "",
    responseMessage: ""
};

const tweetsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TWEETS_SUCCESS:
            return {
                ...state,
                tweets: initialState.tweets.concat(action.payload)
            }
        case GET_TWEETS_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case CREATE_TWEET_SUCCESS:
            return {
                ...state,
                tweets: [action.payload, ...state.tweets]
            }
        case CREATE_TWEET_FAILED:
            return {
                ...state,
                createResponseMessage: action.payload.responseMessage
            }
        case DELETE_TWEET_SUCCESS:
            var tweets = state.tweets.filter(tweet => tweet._id !== action.payload.id);
            return {
                ...state,
                tweets: tweets
            }
        case DELETE_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case LIKE_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    tweetToUpdate.liked_by = tweetToUpdate.liked_by.concat(action.payload.liked_user_id);
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case LIKE_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UNLIKE_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    var allLikes = tweetToUpdate.liked_by.filter(likedUserId=>likedUserId!==action.payload.liked_user_id);
                    tweetToUpdate.liked_by = allLikes
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case UNLIKE_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case BOOKMARK_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    tweetToUpdate.bookmarked_by = tweetToUpdate.bookmarked_by.concat(action.payload.bookmark_user_id);
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case BOOKMARK_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UNBOOKMARK_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    var allBookmarks = tweetToUpdate.bookmarked_by.filter(bookmarkedUserId=>bookmarkedUserId!==action.payload.bookmark_user_id);
                    tweetToUpdate.bookmarked_by = allBookmarks
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case UNBOOKMARK_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case RETWEET_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    tweetToUpdate.retweeted_by = tweetToUpdate.retweeted_by.concat(action.payload.retweet_user_id);
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case RETWEET_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UNRETWEET_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    var allRetweets = tweetToUpdate.retweeted_by.filter(retweetedUserId=>retweetedUserId!==action.payload.retweet_user_id);
                    tweetToUpdate.retweeted_by = allRetweets
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case UNRETWEET_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case REPLY_TWEET_SUCCESS:
            var tweets = state.tweets.map(tweet => {
                // Find an order with the matching id
                if(tweet._id === action.payload.tweet_id){
                    //Return a new object
                    let tweetToUpdate = {...tweet}
                    tweetToUpdate.replies = tweetToUpdate.replies.concat(action.payload.reply);
                    return tweetToUpdate;
                }
                // Leave every other order unchanged
                return tweet;
            });
            return {
                ...state,
                tweets: tweets
            }
        case REPLY_TWEET_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default tweetsReducer;