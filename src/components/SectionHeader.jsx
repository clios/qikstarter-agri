import './SectionHeader.css'

import React from 'react'

function SectionHeader(props) {
  return (
    <div className={`section-header ${props.className}`}>
      <div className="section-header-toolbar">
        <p className="section-header-title title-5 text-blue">
          {props.bigTitle && <label className="section-header-big-title">{props.bigTitle}</label>}
          {props.title}
          {props.subtitle && <label className="section-header-subtitle">{props.subtitle}</label>}
          {props.subtitleSecond && <label className="section-header-subtitle-second">{props.subtitleSecond}</label>}
          {props.error && <label className="section-header-error text-red">{props.error}</label>}
        </p>
        <div className="section-header-tools">{props.children}</div>
        {props.description && <label className="text-yellow">{props.description}</label>}
      </div>
    </div>
  )
}

export default SectionHeader
