import './Tabs.css'

import { Map24, Meter24, TableOfContents24 } from '@carbon/icons-react'

import { Link } from '@reach/router'
import PageTitle from '../components/PageTitle'
import React from 'react'

function ResidentTabs(props) {
  function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <div className="tabs-header">
        <PageTitle title="Residents" />
        <div className="tabs-content">
          <Link className="tabs-item" to="/residents/dashboard" getProps={isPartiallyActive}>
            <Meter24 /> Dashboard
          </Link>
          <Link className="tabs-item" to="/residents/records" getProps={isPartiallyActive}>
            <TableOfContents24 /> Records
          </Link>
          <Link className="tabs-item" to="/residents/map" getProps={isPartiallyActive}>
            <Map24 /> Map
          </Link>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default ResidentTabs
