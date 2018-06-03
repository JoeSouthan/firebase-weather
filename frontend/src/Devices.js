import React, { Component } from 'react'
import base from './rebase'
import Device from './Device'

export default class Devices extends Component {
  state = {
    devices: {},
    loading: true,
  }

  componentDidMount() {
    base.syncState(`devices`, {
      context: this,
      state: 'devices',
      then: () => {
        this.setState({ loading: false })
      }
    });
  }

  render() {
    if (this.state.loading) {
      return "Loading..."
    } else {
      return Object.entries(this.state.devices).map((device) => (
        <Device key={device[0]} name={device[0]} data={device[1]} />
      ))
    }
  }
}
