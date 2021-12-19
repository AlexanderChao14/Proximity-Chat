import { React, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client";

export default class Controller{

    static myInstance = null;
    static ENDPOINT = 'localhost:5000';


    constructor(){
        console.log('Controller created');
        this.key = Math.random();
        this.socket = socketIOClient('localhost:5000');
        this.socket.on('new message', (message) => {
            this.newMessage(message);
        })
        this.newMessageCallbacks = [];
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
        this.socket.emit('message', message);
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


