import React,{Component} from 'react';

function ReplyBox(props) {
    return(
        <div style={{display:'flex'}} className="reply-box">
                <div class = "profile-image">
                    <img className="float-left img-thumbnail" id="pic" 
                    src = {props.reply.user_image} alt="Responsive image"></img>
                </div>
                <div>
                    <div style={{display:'flex'}}>
                        <p>{`@${props.reply.user_username}`}</p>   
                        <p>{props.reply.date}</p>   
                    </div>   
                    <p>{props.reply.text}</p>
                </div>   
        </div> 
    )
}

export default ReplyBox;