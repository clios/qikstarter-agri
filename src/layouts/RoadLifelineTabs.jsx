import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function RoadLifelineTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Road Lifeline</div>
        <div className="tabs-system">Q-Agri MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/road-lifeline/landslide" getProps={isPartiallyActive}>
            Landslide
          </Link>
          <Link className="tabs-item" to="/road-lifeline/flood" getProps={isPartiallyActive}>
            Flood
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default RoadLifelineTabs
