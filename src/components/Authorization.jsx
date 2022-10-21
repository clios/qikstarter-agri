import FadeAnimation from './FadeAnimation'
import Help from '../Help'
import React from 'react'
import { Redirect } from '@reach/router'

function Authorization(props) {
  return (
    <React.Fragment>
      {!Help.checkPermission(props.permissions, props.permission) ? (
        <Redirect to="/your-account/information" noThrow replace />
      ) : (
        <FadeAnimation>{props.children}</FadeAnimation>
      )}
    </React.Fragment>
  )
}

export default Authorization
