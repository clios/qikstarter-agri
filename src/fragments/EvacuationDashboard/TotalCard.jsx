import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="fedtc">
      <img className="fedtc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="fedtc-1">Quirino Province</p>
      <p className="fedtc-2">Evacuation Center Capacity</p>
      <p className="fedtc-3">101,869</p>
      <p>Individuals</p>
    </div>
  )
}

export default TotalCard
