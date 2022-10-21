import React from 'react'

function Select(props) {
  return (
    <div className="select">
      <select onChange={props.onChange} value={props.value} disabled={props.disabled} defaultValue={props.defaultValue}>
        {props.children}
      </select>
    </div>
  )
}

export default Select
