import { React, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client";

export default class Controller{

    static myInstance = null;
    static ENDPOINT = 'localhost:5000';


    constructor(){
        console.log('Controller created');
        this.key = Math.floor(Math.random() * 10);
        this.socket = socketIOClient('localhost:5000');
        this.socket.on('new message', (message) => {
            this.newMessage(message);
        })
        this.newMessageCallbacks = [];
        this.username = 'user' + this.key;
    }

    addMessageListener(callback){
        this.newMessageCallbacks.push(callback);
    }

    newMessage(message){
        this.newMessageCallbacks.forEach(callback => {
            callback(message);
        });
    }

    sendMessage(message){
        // get time of message
        let time = new Date();
        let timeString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        // create message object
        let messageObject = {
            'user': this.username,
            'text': message,
            'time': timeString
        }
        this.socket.emit('message', messageObject);
    }

    static getInstance(){
        if(this.myInstance == null){
            this.myInstance = new Controller();
        }
        return this.myInstance;
    }

    // get key function 
    getKey(){
        return this.key;
    }

}


