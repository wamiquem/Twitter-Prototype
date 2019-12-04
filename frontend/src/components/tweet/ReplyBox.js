import React,{Component} from 'react';
import {Link} from 'react-router-dom';

function ReplyBox(props) {
    return(
        <div style={{display:'flex'}} className="reply-box">
            <div class = "profile-image">
                <img className="float-left img-thumbnail" id="pic" 
                src = {props.reply.user_image} alt=""></img>
            </div>
            <div>
                <div style={{marginLeft:'10px'}}>
                    <div style={{display:'flex'}}>
                        {/* <p>{`@${props.reply.user_username}`}</p>  */}
                        <Link to={`/user/${props.reply.user_id}`}>{`@${props.reply.user_username}`}</Link>  
                        {/* <p>{props.reply.date}</p>    */}
                        <p>{` - ${props.reply.date}`}</p>
                    </div>   
                    <p>{props.reply.text}</p>
                </div>   
            </div>
        </div> 
    )
}

export default ReplyBox;