import './SectionFooter.css'

import CustomSkeleton from './CustomSkeleton'
import React from 'react'

function SectionFooter(props) {
  return <div className="section-footer text-blue">{props.status === 'loading' ? <CustomSkeleton w="17rem" h="1rem" /> : props.children}</div>
}

export default SectionFooter
