import './FormRow.css'

import CustomSkeleton from './CustomSkeleton'
import React from 'react'

function FormRow(props) {
  if (props.status === 'loading')
    return (
      <div className="form-row-loading bg-dark">
        <CustomSkeleton w="100%" h="5rem" />
      </div>
    )

  return (
    <div className="form-row">
      {props.title && <p className="form-row-title">{props.title}</p>}
      <div className="form-row-content">{props.children}</div>
    </div>
  )
}

export default FormRow
