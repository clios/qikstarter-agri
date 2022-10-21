import './Box.css'

import React from 'react'

function Box(props) {
  let style_name = ['box bg-gray', props.className].filter(Boolean).join(' ')

  return <div className={style_name}>{props.children}</div>
}

export default Box
