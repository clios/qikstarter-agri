import './EmptyTable.css'

import React from 'react'

function EmptyTable(props) {
  return (
    <div className="empty-table bg-dark">
      <img className="image" src={require('../assets/empty.svg')} alt="empty" />
      <p>{props.label}</p>
    </div>
  )
}

export default EmptyTable
