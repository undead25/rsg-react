import * as React from 'react';

import logo from './logo.svg';
{{#if_eq preprocessor 'sass'}}
import './app.scss';
{{/if}}
{{#if_eq preprocessor 'less'}}
import './app.less';
{{/if}}
{{#unless precss}}
import './app.css';
{{/unless}}

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
