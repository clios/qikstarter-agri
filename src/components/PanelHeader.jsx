import './PanelHeader.css'
import React from 'react'

function PanelHeader(props) {
  return (
    <div className="panel-header">
      <div className="panel-header-title">{props.children}</div>
      <div className="panel-header-label text-light-gray">{props.label}</div>
    </div>
  )
}

export default PanelHeader
