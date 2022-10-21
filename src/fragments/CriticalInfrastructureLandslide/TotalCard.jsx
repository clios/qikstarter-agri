import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="fciltc">
      <img className="fciltc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="fciltc-1">Quirino Province</p>
      <p className="fciltc-2">Total Critical Infrastructure</p>
      <p className="fciltc-3">2,616</p>
      <p>Buildings and Bridges</p>
    </div>
  )
}

export default TotalCard
