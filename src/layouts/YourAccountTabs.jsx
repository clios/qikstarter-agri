import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function YourAccountTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">Your Account</div>
        <div className="tabs-system">Q-DRR MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/your-account/information" getProps={isPartiallyActive}>
            Information
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default YourAccountTabs
