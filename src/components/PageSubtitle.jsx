import './PageSubtitle.css'

import CustomSkeleton from './CustomSkeleton'
import React from 'react'

function PageSubtitle(props) {
  if (props.status === 'loading') return <CustomSkeleton w="12rem" h="2.2rem" mb="1rem" />
  return (
    <div className="page-subtitle">
      {props.text}
      {props.children}
    </div>
  )
}

export default PageSubtitle
