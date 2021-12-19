import { React, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client";

export default class Controller{

    static myInstance = null;

    constructor(){
        this.key = Math.random();
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


