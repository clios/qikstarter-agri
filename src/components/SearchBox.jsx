import './SearchBox.css'

import React from 'react'

function SearchBox(props) {
  return <div className={`search-box ${props.className}`}>{props.children}</div>
}

export default SearchBox
