import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function PopulationTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Population</div>
        <div className="tabs-system">Q-Agri MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/population/dashboard" getProps={isPartiallyActive}>
            Dashboard
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default PopulationTabs
