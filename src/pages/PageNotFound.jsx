import './PageNotFound.css'

import React from 'react'

function PageNotFound() {
  return (
    <div className="page-not-found">
      <img className="image" src={require('../assets/page_not_found.svg')} alt="404" />
    </div>
  )
}

export default PageNotFound
