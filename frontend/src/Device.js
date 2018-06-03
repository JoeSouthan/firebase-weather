import React from 'react'
import dayjs from 'dayjs'
import Sensor from './Sensor'
import AirQuality from './AirQuality'

const Device = ({ name, data }) => (
  <div className="devices">
    <div className="columns">
      <Sensor data={data.temperature.toFixed(1)} unit="&#xb0;C" description="Temperature" />
      <Sensor data={data.pressure.toFixed(1)} unit=" mbar" description="Pressure" />
      <Sensor data={data.humidity.toFixed(1)} unit="%" description="Humidity" />
      <AirQuality data={data.gas} unit="Ω" description="Gas resistance" />
    </div>
    <div className="has-text-right has-text-grey">{name} - Last updated: {dayjs(parseInt(data.timestamp)*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
  </div>
)

export default Device
