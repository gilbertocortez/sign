import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Let's sign with Web3
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://google.com';
          }}
        >
          Learn React Now
        </button>
      </header>
    </div>
  );
}

export default App;
