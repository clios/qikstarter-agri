import './Textarea.css'

import React from 'react'

function Textarea(props) {
  return (
    <textarea
      className={`textarea ${props.className}`}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
      size={props.size}
      value={props.value}
      cols={props.cols}
    />
  )
}

export default Textarea
