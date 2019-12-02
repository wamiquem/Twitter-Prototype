import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILED, PROFILE_INPUT_CHANGE_HANDLER, UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED, PROFILE_IMAGE_CHANGE_HANDLER } from '../actions/types';

const initialState = {
    fname: "",
    lname: "",
    username: "",
    phone: "",
    bio: "",
    city: "",
    state: "",
    zip: "",
    imageUrl: "",
    responseMessage: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                fname: action.payload.user.fname,
                lname: action.payload.user.lname,
                username: action.payload.user.username,
                phone: action.payload.user.phone,
                bio: action.payload.user.bio,
                city: action.payload.user.city,
                state: action.payload.user.state,
                zip: action.payload.user.zip_code,
                imageUrl: action.payload.user.image,
                added: action.payload.user.added_date
            }
        case GET_PROFILE_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case PROFILE_INPUT_CHANGE_HANDLER:
            return {
                ...state,
                [action.event.target.name] : action.event.target.value
            }
        case PROFILE_IMAGE_CHANGE_HANDLER:
            return {
                ...state,
                imageUrl : action.imageUrl
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                imageUrl: action.payload.imageUrl
            }
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default profileReducer;