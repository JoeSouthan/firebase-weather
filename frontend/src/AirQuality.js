import React from 'react'

const AirQuality = ({ data, unit, description }) => {
  const getRating = () => {
    switch (true) {
      case data <= 50:
        return "Good"
      case data >= 51 && data <= 100:
        return "Average"
      case data >= 101 && data <= 150:
        return "Higher than average"
      case data >= 151 && data <= 200:
        return "Bad"
      case data >= 201 && data <= 300:
        return "Worse"
      case data >= 300:
        return "Very bad"
      default:
        return "!"
    }
  }

  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="">
              {description}
            </div>
            <div className={`title ${getRating()}`}>
              {data}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirQuality
