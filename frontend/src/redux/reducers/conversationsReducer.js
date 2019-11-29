import { GET_CONVERSATIONS_SUCCESS, GET_CONVERSATIONS_FAILED, ADD_CONVERSATION_STORE, ADD_CONVERSATION_DB_SUCCESS,
    ADD_CONVERSATION_DB_FAILED, UPDATE_CONVERSATION_SUCCESS, UPDATE_CONVERSATION_FAILED} from '../actions/types';

const initialState = {
    conversations: [],
    responseMessage: ""
};

const conversationsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversations: initialState.conversations.concat(action.payload.conversations)
            }
        case GET_CONVERSATIONS_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case ADD_CONVERSATION_STORE:
            if (state.conversations.length === 0){
                return{
                    ...state,
                    conversations: [action.payload, ...state.conversations]
                }
            }
            const conversationExists = state.conversations.find(conversation => JSON.stringify(conversation.users) === JSON.stringify(action.payload.users));
            if(!conversationExists){
                return {
                    ...state,
                        conversations: [action.payload, ...state.conversations]
                }
            } else {
                return state;
            }
        case ADD_CONVERSATION_DB_SUCCESS:
            var conversations = state.conversations.map((conversation, index) => {
                // Find an order with the matching id
                if(index === 0){
                    //Return a new object
                    let conversationToUpdate = {...conversation}
                    conversationToUpdate.messages = conversationToUpdate.messages.concat(action.payload.message);
                    conversationToUpdate._id = action.payload._id
                    return conversationToUpdate;
                }
                // Leave every other order unchanged
                return conversation;
            });
            return {
                ...state,
                conversations,
                responseMessage: action.payload.responseMessage
        }
        case ADD_CONVERSATION_DB_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_CONVERSATION_SUCCESS:
        console.log("action.payload***", action.payload);
        console.log("conversations***", state.conversations);
            var conversations = state.conversations.map(conversation => {
                // Find an order with the matching id
                if(conversation._id === action.payload.conversation._id){
                    //Return a new object
                    console.log("***went insideeeeee***")
                    let conversationToUpdate = {...conversation}
                    conversationToUpdate.messages = conversationToUpdate.messages.concat(action.payload.conversation.message);
                    return conversationToUpdate;
                }
                // Leave every other order unchanged
                return conversation;
            });
            return {
                ...state,
                conversations,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_CONVERSATION_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default conversationsReducer;