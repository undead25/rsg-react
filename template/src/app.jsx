import React from 'react';
import Button from './button';

import './app.css';
import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome To React!!</h1>
        <div className="a">
          <Button>Confirm</Button>
        </div>
      </div>
    );
  }
}