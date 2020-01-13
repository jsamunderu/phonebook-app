import React, { Component } from 'react';
import './App.css';
import PhoneBook from './component/PhoneBook';

class App extends Component {
  render() {
    return (
      <div className="container">
        <PhoneBook />
      </div>
    );
  }
}

export default App;
