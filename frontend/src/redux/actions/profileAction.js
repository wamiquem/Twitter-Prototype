import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILED, PROFILE_INPUT_CHANGE_HANDLER, UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED, PROFILE_IMAGE_CHANGE_HANDLER } from '../actions/types';
import {userUrl} from '../../config';

export const getProfile = userId => dispatch => {
    fetch(`${userUrl}/profile/details/?id=${userId}`,{
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                var payload = Object.assign({}, resData);
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: GET_PROFILE_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const inputChangeHandler = e => {
    return{
        type: PROFILE_INPUT_CHANGE_HANDLER,
        event: e
    }
}

export const imageChangeHandler = imageUrl => {
    return{
        type: PROFILE_IMAGE_CHANGE_HANDLER,
        imageUrl: imageUrl
    }
}

const updateProfileImage = (image,successcb, failurecb) => {
    if(image){
        const formData = new FormData();
        formData.append('image', image)
        fetch(`${userUrl}/upload/user-profile-image/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    successcb(resData.imageUrl);
                });
            }else{
                res.json().then(resData => {
                    failurecb(resData.message);
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        successcb("");
    }
}

export const updateProfile = (userId, data, image) => dispatch => {
    updateProfileImage(image, imageUrl => {
        var updatedImageUrl = imageUrl;
        if(!updatedImageUrl){
            updatedImageUrl = data.imageUrl
        }
        const body = {
            ...data,
            imageUrl: updatedImageUrl
        }
        fetch(`${userUrl}/profile/update/?id=${userId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    if(imageUrl){
                        var payload = {
                            imageUrl: imageUrl
                        }
                    dispatch({
                        type: UPDATE_PROFILE_SUCCESS,
                        payload: payload
                    })
                    }
                });
            }else{
                res.json().then(resData => {
                    const payload = {
                        responseMessage: resData.message
                    }
                    dispatch({
                        type: UPDATE_PROFILE_FAILED,
                        payload: payload
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, failedMessage => {
        let payload = {responseMessage: failedMessage}
            dispatch({
                type: UPDATE_PROFILE_FAILED,
                payload: payload
            })
    });
};