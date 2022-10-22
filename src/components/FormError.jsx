import './FormError.css'

import FadeAnimation from './FadeAnimation'
import React from 'react'

function FormError(props) {
  const display = Object.keys(props.error).length !== 0

  return (
    display && (
      <FadeAnimation>
        <div className="form-error">
          <div className="title text-red">INVALID</div>
          <p className="uppercase">
            {Object.keys(props.error)[0]}: {Object.values(props.error)[0]}.
          </p>
        </div>
      </FadeAnimation>
    )
  )
}

export default FormError
