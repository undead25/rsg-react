import React from 'react';
import Button from './button';

import './app.css';

export default class App extends React.Component {
  render() {
    return (
      <h1>
        Welcome To React!!!!
        <Button>Confirm</Button>
      </h1>
    );
  }
}