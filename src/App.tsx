import React from 'react';
import './App.css';

import RequestLogIn from './components/req_auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MetaMask Wallet Log In and Signing (v4) Example</h1>
        <h2>Using ReactJS and the @metamask/eth-sig-util package</h2>
        
        <RequestLogIn />
      </header>
    </div>
  );
}

export default App;
