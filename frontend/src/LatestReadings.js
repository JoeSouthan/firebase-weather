import React, { Component } from 'react'
import base from './rebase'

export default class LatestReadings extends Component {
  state = {
    readings: {},
    loading: true,
  }

  componentDidMount() {
    base.syncState(`latest_readings`, {
      context: this,
      state: 'readings',
      then: () => {
        this.setState({ loading: false })
      }
    });
  }

  render() {
    return (
      <div>{JSON.stringify(this.state.readings)}</div>
    )
  }
}
