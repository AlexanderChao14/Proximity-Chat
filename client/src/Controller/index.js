import { React, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client";

export default class Controller{

    static myInstance = null;
    static ENDPOINT = 'localhost:5500';
    


    constructor(){
        console.log('Controller created');
        this.key = Math.floor(Math.random() * 10);
        this.socket = socketIOClient('localhost:5500');
        this.assignedSeatCallback = [];
        this.newSeatsCallbacks = [];
        this.username = 'user' + this.key;
        this.range = 1;

        this.socket.on('new message', (message) => {
            this.newMessage(message);
        })
        this.newMessageCallbacks = [];
        this.socket.on('user moved seats', (data) => {
            console.log(data);
            this.newSeats(data);
        });

        this.socket.on('new seating arrangement', (data) => {
            //console.log(data);
            this.newSeats(data);
        })

        this.socket.on('random seat', (seat) => {
            console.log(seat);
            this.assignedSeat(seat);
        })

        

    }

    setUsername(name){
        this.username = name;
        this.socket.emit('set username', {'username': name});
    }


    addSeatsCallback(callback){
        this.newSeatsCallbacks.push(callback);
    }

    addMessageListener(callback){
        this.newMessageCallbacks.push(callback);
    }

    addAssignSeatListener(callback){
        this.assignedSeatCallback.push(callback);
    }

    
    assignedSeat(data){
        this.assignedSeatCallback.forEach(callback => {
            callback(data);
        });
    }
    newMessage(message){
        this.newMessageCallbacks.forEach(callback => {
            callback(message);
        });
    }

    newSeats(data){
        this.newSeatsCallbacks.forEach(callback => {
            callback(data);
        });
    }


    sendMessage(message){
        // get time of message
        let time = new Date();
        let timeString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        // create message object
        let messageObject = {
            'range': this.range,
            'user': this.username,
            'text': message,
            'time': timeString
        }
        this.socket.emit('range message', messageObject);
    }

    moveSeats(data){
        data['user'] = this.username;
        console.log(data)
        this.socket.emit('user moved seats', data);
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


