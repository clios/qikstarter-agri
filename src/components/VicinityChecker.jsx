import React from 'react'
import { Redirect } from '@reach/router'

function VicinityChecker(props) {
  let account_vicinity = props.accountVicinity || ''
  let record_address = props.recordAddress || ''

  if (record_address.includes(account_vicinity)) {
    return null
  } else {
    return <Redirect to="/account" noThrow replace />
  }
}

export default VicinityChecker
