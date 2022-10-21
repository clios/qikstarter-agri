import './PanelSection.css'
import React from 'react'

function PanelSection(props) {
  return (
    <div className="panel-section">
      <p className="panel-section-label text-light-gray">{props.label}</p>
      <div className="panel-section-content">{props.children}</div>
    </div>
  )
}

export default PanelSection
