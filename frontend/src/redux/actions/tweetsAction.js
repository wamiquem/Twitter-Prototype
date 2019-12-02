import { CREATE_TWEET_SUCCESS, CREATE_TWEET_FAILED, GET_TWEETS_SUCCESS, GET_TWEETS_FAILED, DELETE_TWEET_SUCCESS,
DELETE_TWEET_FAILED, LIKE_TWEET_SUCCESS, LIKE_TWEET_FAILED, UNLIKE_TWEET_SUCCESS, UNLIKE_TWEET_FAILED,
BOOKMARK_TWEET_SUCCESS, BOOKMARK_TWEET_FAILED, UNBOOKMARK_TWEET_SUCCESS, UNBOOKMARK_TWEET_FAILED,
REPLY_TWEET_SUCCESS, REPLY_TWEET_FAILED, RETWEET_TWEET_SUCCESS, RETWEET_TWEET_FAILED, UNRETWEET_TWEET_SUCCESS, 
UNRETWEET_TWEET_FAILED} from '../actions/types';
import {tweetUrl} from '../../config';

const saveTweetImages = (data,successcb, failurecb) => {
    if(data.images.length > 0){
        const formData = new FormData();
        for(var x = 0; x<data.images.length; x++) {
            formData.append('image', data.images[x])
        }
        fetch(`${tweetUrl}/upload/tweet-images/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${data.token}`
            },
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    successcb(resData.imagesUrl);
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
        successcb([]);
    }
}

export const createTweet = data => dispatch => {
    saveTweetImages(data, imagesUrl => {
        const body = {
            user_id: data.id,
            user_username: data.username,
            user_image: data.image,
            images_path: imagesUrl,
            content: data.content,
            created_date_time: new Date().toLocaleString()
        }
        fetch(`${tweetUrl}/tweet/tweet`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
                },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    var payload = Object.assign({}, resData.tweet);
                    dispatch({
                        type: CREATE_TWEET_SUCCESS,
                        payload: payload
                    })
                });
            }else{
                res.json().then(resData => {
                    const payload = {
                        responseMessage: resData.message
                    }
                    dispatch({
                        type: CREATE_TWEET_FAILED,
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
                type: CREATE_TWEET_FAILED,
                payload: payload
            })
    });
};

export const getTweetsByUsers = users => dispatch => {
    fetch(`${tweetUrl}/tweet/tweetsForFeed/?users=${users}`, {
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        credentials: 'include',
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: GET_TWEETS_SUCCESS,
                    payload: resData
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: GET_TWEETS_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const deleteTweet = id => dispatch => {
    fetch(`${tweetUrl}/tweet/delete/?id=${id}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                const payload = {
                    id: id
                }
                dispatch({
                    type: DELETE_TWEET_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: DELETE_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const likeTweet = id => dispatch => {
    const data = {
        liked_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/likeTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: LIKE_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: LIKE_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const unlikeTweet = id => dispatch => {
    const data = {
        liked_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/likeTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: UNLIKE_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: UNLIKE_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const bookmarkTweet = id => dispatch => {
    const data = {
        bookmark_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/bookmarkTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: BOOKMARK_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: BOOKMARK_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const unbookmarkTweet = id => dispatch => {
    const data = {
        bookmark_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/bookmarkTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: UNBOOKMARK_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: UNBOOKMARK_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const retweetTweet = id => dispatch => {
    const data = {
        retweet_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/retweetTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: RETWEET_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: RETWEET_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const unretweetTweet = id => dispatch => {
    const data = {
        retweet_user_id: localStorage.getItem('id'),
        tweet_id: id
    }
    fetch(`${tweetUrl}/tweet/retweetTweet`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: UNRETWEET_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: UNRETWEET_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};

export const replyTweet = data => dispatch => {
    fetch(`${tweetUrl}/tweet/reply`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.json().then(resData => {
                dispatch({
                    type: REPLY_TWEET_SUCCESS,
                    payload: data
                })
            });
        }else{
            res.json().then(resData => {
                const payload = {
                    responseMessage: resData.message
                }
                dispatch({
                    type: REPLY_TWEET_FAILED,
                    payload: payload
                })
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
};