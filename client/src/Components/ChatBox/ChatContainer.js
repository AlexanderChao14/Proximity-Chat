import {React, useEffect, useState } from 'react';
import Message from './Message';
import InputField from './InputField';
import styles from './style.css';
import Controller from '../../Controller';

const ChatContainer = () => {
    const controller = Controller.getInstance();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        controller.addMessageListener(message => {
            setMessages(messages => [...messages, message]);
        });
    }, []);

    return (
        <div className = "chat-container">
            <div className = "chat-messages">
                {messages.map(message => <Message message={message}/>)}
            </div>
            <InputField/>
        </div>
    );
}

export default ChatContainer;