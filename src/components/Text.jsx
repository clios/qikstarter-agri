import './Text.css'

import React from 'react'

function Text(props) {
  let style_name = [
    'text',
    props.className,
    props.orange && 'text-orange',
    props.blue && 'text-blue',
    props.green && 'text-green',
    props.yellow && 'text-yellow',
    props.one && 'size-one',
    props.onePointThree && 'size-one-point-three',
    props.two && 'size-two',
    props.three && 'size-three',
    props.total && 'text-total',
    props.italic && 'italic'
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={style_name}>{props.children}</div>
}

export default Text
