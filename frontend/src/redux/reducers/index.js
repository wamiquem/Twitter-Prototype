import { combineReducers } from "redux";
import conversationsReducer from './conversationsReducer';
import tweetsReducer from './tweetsReducer';

export default combineReducers({
    conversations: conversationsReducer,
    tweets: tweetsReducer
});