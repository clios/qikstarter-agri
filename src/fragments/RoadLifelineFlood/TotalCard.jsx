import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="frlftc">
      <img className="frlftc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="frlftc-1">Quirino Province</p>
      <p className="frlftc-2">Total Flood Prone Area</p>
      <p className="frlftc-3">142</p>
      <p>Kilometers</p>
    </div>
  )
}

export default TotalCard
