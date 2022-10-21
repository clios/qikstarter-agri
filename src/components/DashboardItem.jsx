import './DashboardItem.css'

import CustomSkeleton from './CustomSkeleton'
import React from 'react'
import Text from './Text'

function DashboardItem(props) {
  let style_name = ['dashboard-item bg-dark', props.className].filter(Boolean).join(' ')

  if (props.status === 'loading')
    return (
      <div className={style_name}>
        <CustomSkeleton w="100%" h="1.5rem" mb=".2rem" />
        <CustomSkeleton w="100%" h="1rem" mb="1rem" />
        <CustomSkeleton w="100%" h="5rem" mb="1rem" />
        <CustomSkeleton w="100%" h="1rem" />
      </div>
    )

  return (
    <div className={style_name}>
      <div className="dashboard-item-header">
        {props.title && (
          <Text onePointThree blue>
            {props.title}
          </Text>
        )}
        {props.desc && <Text>{props.desc}</Text>}
      </div>
      <div>{props.children}</div>
      {props.footer && <div className="dashboard-item-footer">{props.footer}</div>}
    </div>
  )
}

export default DashboardItem
