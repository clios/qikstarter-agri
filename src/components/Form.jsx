import './Form.css'

import Loader from './Loader'
import React from 'react'

function Form(props) {
  return (
    <form className={`form ${props.className}`} onSubmit={props.onSubmit}>
      {props.status === 'loading' && <Loader />}
      {props.children}
    </form>
  )
}

export default Form
