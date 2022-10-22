import './Toggle.css'

import React from 'react'

function Toggle(props) {
  return (
    <div className="fuit">
      {props.available ? (
        <div className="availble">
          <div className="box-green" />
          <div>YES</div>
        </div>
      ) : (
        <div className="not-availble">
          <div className="box-red" />
          <div>NO</div>
        </div>
      )}
    </div>
  )
}

export default Toggle
