import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function IncidentTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Incidents</div>
        <div className="tabs-system">Q-Agri MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/incidents/dashboard" getProps={isPartiallyActive}>
            Dashboard
          </Link>
          <Link className="tabs-item" to="/incidents/records" getProps={isPartiallyActive}>
            Records
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default IncidentTabs
