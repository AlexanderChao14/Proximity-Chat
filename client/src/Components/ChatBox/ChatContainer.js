import React from 'react';
import Message from './Message';
import InputField from './InputField';
import styles from './style.css';

const ChatContainer = () => {
    return (
        <div className = "chat-container">
            <div className = "chat-messages">
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </div>
            <InputField/>
        </div>
    );
}

export default ChatContainer;