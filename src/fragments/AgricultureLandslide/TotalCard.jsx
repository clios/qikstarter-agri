import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="faltc">
      <img className="faltc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="faltc-1">Quirino Province</p>
      <p className="faltc-2">Total Landslide Prone Area</p>
      <p className="faltc-3">312,551</p>
      <p>Hectares</p>
    </div>
  )
}

export default TotalCard
