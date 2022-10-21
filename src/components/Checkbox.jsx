import React from 'react'

function Checkbox(props) {
  return (
    <label className="checkbox">
      <input type="checkbox" onChange={props.onChange} value={props.value} checked={props.checked} />
      {props.text}
      {props.children}
    </label>
  )
}

export default Checkbox
