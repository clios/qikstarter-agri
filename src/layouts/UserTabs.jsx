import './Tabs.css'

import { Link } from '@reach/router'
import React from 'react'

function UserTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <div className="tabs-title">User Accounts</div>
        <div className="tabs-system">Q-DRR MIS</div>
        <div className="tabs-content">
          <Link className="tabs-item" to="/users/records" getProps={isPartiallyActive}>
            Records
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default UserTabs
