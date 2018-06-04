import React from "react"

const Card = ({ children }) => (
  <div className="card">
    <div className="card-content">
      <div className="content">
        {children}
      </div>
    </div>
  </div>
)

export default Card
