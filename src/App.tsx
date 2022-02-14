import React from 'react';
import './App.css';

import RequestLogIn from './components/req_auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Wallet Log In & Signing Example</h1>
        <h2>Using ReactJS</h2>
        
        <RequestLogIn />
      </header>
    </div>
  );
}

export default App;
