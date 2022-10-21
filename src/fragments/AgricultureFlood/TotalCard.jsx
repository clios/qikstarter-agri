import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="faftc">
      <img className="faftc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="faftc-1">Quirino Province</p>
      <p className="faftc-2">Total Flood Prone Area</p>
      <p className="faftc-3">62,326</p>
      <p>Hectares</p>
    </div>
  )
}

export default TotalCard
