import './Panel.css'

import React from 'react'

function Panel(props) {
  return (
    <div className="panel">
      <div className="panel-title">
        <p className="panel-label text-blue">{props.label}</p>
      </div>
      {props.children}
    </div>
  )
}

export default Panel
