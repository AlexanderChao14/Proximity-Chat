import logo from './logo.svg';
import './App.css';
import ChatContainer from './Components/ChatBox/ChatContainer.js';
import Seating from './Components/Seating/Seating.js';
function App() {
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
