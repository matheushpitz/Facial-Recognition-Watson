import React, { Component } from 'react';
import FacialRecognition from './facial-recognition';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <FacialRecognition serviceDomain={'http://localhost:8080'} />
      </div>
    );
  }
}

export default App;
