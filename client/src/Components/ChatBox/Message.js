import React from 'react';
import style from './style.css';

const Message = ({message}) => {
    console.log(message)
    return(
        <div className="message-container">
            <div className="message-time">
                <p>{message['time']}</p>
            </div>
            <div className="user">
                <p>{message['user']}</p>
            </div>
            <div className="message-text">
                <p> {message['text']}</p>
            </div>

        </div>
    );
}

export default Message