import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="frlltc">
      <img className="frlltc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="frlltc-1">Quirino Province</p>
      <p className="frlltc-2">Total Landslide Prone Area</p>
      <p className="frlltc-3">1,493</p>
      <p>Kilometers</p>
    </div>
  )
}

export default TotalCard
