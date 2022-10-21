import './Input.css'

import React from 'react'

function Input(props) {
  const styleName = ['input', props.className, props.uppercase && 'uppercase'].filter(Boolean).join(' ').trim()

  return (
    <input
      className={styleName}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      list={props.list}
      maxLength={props.maxLength}
      onChange={props.onChange}
      onKeyUp={props.onKeyUp}
      placeholder={props.placeholder}
      required={props.required}
      size={props.size}
      type={props.type}
      value={props.value}
      autoFocus={props.autoFocus}
    />
  )
}

export default Input
