import './PageTitle.css'

import React from 'react'

function PageTitle(props) {
  return (
    <div className="page-title">
      <h1 className="title-4 text-orange">{props.title}</h1>
      <p className="subtitle-5">{props.description}</p>
    </div>
  )
}

export default PageTitle
