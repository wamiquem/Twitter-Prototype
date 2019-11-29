import { GET_CONVERSATIONS_SUCCESS, GET_CONVERSATIONS_FAILED, ADD_CONVERSATION_STORE, ADD_CONVERSATION_DB_SUCCESS,
    ADD_CONVERSATION_DB_FAILED, UPDATE_CONVERSATION_SUCCESS, UPDATE_CONVERSATION_FAILED} from '../actions/types';
import {messageUrl} from '../../config';

export const getConversations = () => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${messageUrl}/message/get/?id=${localStorage.getItem('id')}`,{
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(data => {
                var payload = Object.assign({}, data);
                dispatch({
                    type: GET_CONVERSATIONS_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.json().then(data => {
                let payload = {responseMessage: data.message}
                dispatch({
                    type: GET_CONVERSATIONS_FAILED,
                    payload: payload
                })
            })
            
        }
    })
    .catch(err => console.log(err));  
};

export const addConversationStore = id => dispatch =>  {
    let users = []
    let senderId = parseInt(localStorage.getItem('id'));
    if (id < senderId){
        users.push(id);
        users.push(senderId);
    }else{
        users.push(senderId);
        users.push(id);
    }
    let payload = {users : users, updated: new Date().toLocaleString(), messages: []}
    dispatch({
        type: ADD_CONVERSATION_STORE,
        payload: payload
    })
}

export const addConversationDB = conversation => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${messageUrl}/message/add`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(conversation)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(data => {
                var payload = {responseMessage: data.message, _id: data.id, message: conversation.message}
                dispatch({
                    type: ADD_CONVERSATION_DB_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.json().then(data => {
                let payload = {responseMessage: data.message}
                dispatch({
                    type: ADD_CONVERSATION_DB_FAILED,
                    payload: payload
                })
            })
            
        }
    })
    .catch(err => console.log(err));  
};

export const updateConversation = conversation => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${messageUrl}/message/update`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(conversation)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(data => {
                var payload = {responseMessage: data.message, conversation: conversation}
                dispatch({
                    type: UPDATE_CONVERSATION_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.json().then(data => {
                let payload = {responseMessage: data.message}
                dispatch({
                    type: UPDATE_CONVERSATION_FAILED,
                    payload: payload
                })
            })
            
        }
    })
    .catch(err => console.log(err));  
};