import React from 'react';

import logo from './logo.svg';
// import './app.scss';
// import './app.less';
import './app.css';

const App = () => (
  <div className="app">
    <header className="app-header">
      <img src={logo} alt="logo" className="app-logo" />
      <h1 className="app-title">Welcome to React</h1>
    </header>
    <p className="app-intro">
      To get started, edit <code>src/app.js</code> and save to reload.
    </p>
  </div>
);

export default App;
