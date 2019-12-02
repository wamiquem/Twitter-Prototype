import { combineReducers } from "redux";
import conversationsReducer from './conversationsReducer';
import tweetsReducer from './tweetsReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    conversations: conversationsReducer,
    tweets: tweetsReducer,
    profile: profileReducer
});