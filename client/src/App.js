import logo from './logo.svg';
import './App.css';
import ChatContainer from './Components/ChatBox/ChatContainer.js';
import Seating from './Components/Seating/Seating.js';
import UserName from './Components/UserName/UserName.js';
import Controller from './Controller/index.js';
import React, { useState, useEffect } from 'react';

function App() {

  const controller = Controller.getInstance();
  return (
    <div className="App">
      <header className="container">
        <Seating/>
        <ChatContainer/>
        <UserName/>
        
      </header>
    </div>
  );
}

export default App;
