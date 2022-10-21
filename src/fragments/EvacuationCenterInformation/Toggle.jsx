import './Toggle.css'

import React from 'react'

function Toggle(props) {
  return (
    <div className="fecit">
      {props.available ? (
        <div className="availble">
          <div className="box-green" />
          <div>AVAILABLE</div>
        </div>
      ) : (
        <div className="not-availble">
          <div className="box-red" />
          <div>NOT AVAILABLE</div>
        </div>
      )}
    </div>
  )
}

export default Toggle
