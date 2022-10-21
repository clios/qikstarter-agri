import './DashboardToolbar.css'

import React from 'react'

function DashboardToolbar(props) {
  return (
    <div className="dashboard-toolbar-container bg-gray">
      <div className="dashboard-toolbar">{props.children}</div>
      <div className="dashboard-toolbar-button">{props.action}</div>
    </div>
  )
}

export default DashboardToolbar
