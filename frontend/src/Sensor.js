import React from "react"
import Card from "./Card"

const Sensor = ({ data, unit, description }) => (
  <div className="column">
    <Card>
      <div className="">
        {description}
      </div>
      <div className="title">
        {data}
        <span className="subtitle">{unit}</span>
      </div>
    </Card>
  </div>
)

export default Sensor
