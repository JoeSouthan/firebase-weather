import React, { Component } from "react"
import base from "./rebase"
import Card from "./Card"
import Graph from "./Graph"

export default class LatestReadings extends Component {
  state = {
    readings: {},
    loading: true,
  }

  componentDidMount() {
    base.syncState(`latest_readings`, {
      context: this,
      state: "readings",
      then: () => {
        this.setState({ loading: false })
      }
    });
  }

  renderGraphs = () => (
    Object.keys(this.state.readings).map((key) => (
      <section>
        <h2 className="title">Last 24 hours</h2>
        <div className="columns">
          <div className="column">
            <Card>
              <h3 className="title">Temperature</h3>
              <Graph dataKey="temperature" readings={this.state.readings[key]} />
            </Card>
          </div>
          <div className="column">
            <Card>
              <h3 className="title">Humidity</h3>
              <Graph dataKey="humidity" readings={this.state.readings[key]} />
            </Card>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Card>
              <h3 className="title">Pressure</h3>
              <Graph dataKey="pressure" readings={this.state.readings[key]} />
            </Card>
          </div>
          <div className="column">
            <Card>
              <h3 className="title">Gas resistance</h3>
              <Graph dataKey="gas" readings={this.state.readings[key]} />
            </Card>
          </div>
        </div>
      </section>
    ))
  )

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    } else {
      return this.renderGraphs()
    }
  }
}
