import './SubSection.css'

import React from 'react'

function SubSection(props) {
  return (
    <div className="subsection">
      <div className="subsection-title">
        <p>{props.title}</p>
        <div className="subsection-buttons">{props.buttons}</div>
      </div>
      {props.children}
    </div>
  )
}

export default SubSection
