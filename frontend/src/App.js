import React, { Component } from 'react'
import Devices from "./Devices"
import LatestReadings from "./LatestReadings"
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Weather Station 🌞</h1>
            <h2 className="subtitle">Latest readings</h2>
            <Devices />
            <hr />
            <LatestReadings />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
