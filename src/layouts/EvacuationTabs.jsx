import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function EvacuationTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Evacuation</div>
        <div className="tabs-system">Q-DRR MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/evacuation/dashboard" getProps={isPartiallyActive}>
            Dashboard
          </Link>
          <Link className="tabs-item" to="/evacuation/centers" getProps={isPartiallyActive}>
            Centers
          </Link>
          <Link className="tabs-item" to="/evacuation/map" getProps={isPartiallyActive}>
            Map
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default EvacuationTabs
