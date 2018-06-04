import React from "react"
import dayjs from "dayjs"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const Graph = ({ dataKey, readings }) => {
  const data = Object.values(readings)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" scale="utcTime" tickFormatter={time => dayjs(time*1000).format('HH:mm')} />
        <YAxis dataKey={dataKey} domain={['dataMin', 'dataMax']} tickFormatter={val => parseFloat(val).toFixed(1)} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Graph
