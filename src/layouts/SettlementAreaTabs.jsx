import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function SettlementAreaTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Settlement Area</div>
        <div className="tabs-system">Q-DRR MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/settlement-area/landslide" getProps={isPartiallyActive}>
            Landslide
          </Link>
          <Link className="tabs-item" to="/settlement-area/flood" getProps={isPartiallyActive}>
            Flood
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default SettlementAreaTabs
