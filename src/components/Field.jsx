import './Field.css'

import CustomSkeleton from '../components/CustomSkeleton'
import React from 'react'

function Field(props) {
  const styleName = props.className ? props.className : ''

  if (props.status === 'loading')
    return (
      <div className={`field ${styleName}`}>
        <p className="field-label">{props.label}</p>
        <CustomSkeleton w="12rem" h="1.5rem" />
      </div>
    )

  return (
    <div className={`field ${styleName}`}>
      <p className="field-label text-orange">{props.label}</p>
      {props.text}
      {props.children}
      <p className={props.error && 'text-red field-error'}>{props.error}</p>
    </div>
  )
}

export default Field
