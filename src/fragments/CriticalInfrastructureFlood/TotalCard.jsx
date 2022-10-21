import './TotalCard.css'

import React from 'react'

function TotalCard() {
  return (
    <div className="fciftc">
      <img className="fciftc-img" src={require('../../assets/pgq_logo.png')} />
      <p className="fciftc-1">Quirino Province</p>
      <p className="fciftc-2">Total Critical Infrastructure</p>
      <p className="fciftc-3">222</p>
      <p>Buildings and Bridges</p>
    </div>
  )
}

export default TotalCard
