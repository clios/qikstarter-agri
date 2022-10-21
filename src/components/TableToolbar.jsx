import './TableToolbar.css'

import CustomSkeleton from './CustomSkeleton'
import React from 'react'

function TableToolbar(props) {
  if (props.status === 'loading') return <CustomSkeleton w="100%" h="2rem" />
  return (
    <div className="table-toolbar">
      <div>{props.mainChild}</div>
      <div className="table-toolbar-children">{props.children}</div>
    </div>
  )
}

export default TableToolbar
