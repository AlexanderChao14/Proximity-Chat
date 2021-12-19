import logo from './logo.svg';
import './App.css';
import ChatContainer from './Components/ChatBox/ChatContainer.js';
import Seating from './Components/Seating/Seating.js';
import socketIOClient from "socket.io-client";

import React, { useState, useEffect } from 'react';
const ENDPOINT = 'localhost:5000';
const socket = socketIOClient(ENDPOINT);

function App() {
  useEffect(() => {

    socket.on("connection", data => {
      console.log(data);
    });
  }, []);

  socket.on('user joined', data => {
    console.log(data);
  });

  return (
    <div className="App">
      <header className="container">
        <Seating/>
        <ChatContainer/>
      </header>
    </div>
  );
}

export default App;
