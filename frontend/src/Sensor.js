import React from 'react'

const Sensor = ({ data, unit, description }) => (
  <div className="column">
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="">
            {description}
          </div>
          <div className="title">
            {data}
            <span className="subtitle">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Sensor
