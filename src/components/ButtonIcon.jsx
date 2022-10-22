import './ButtonIcon.css'

import CustomSkeleton from './CustomSkeleton'
import Help from '../Help'
import React from 'react'

function ButtonIcon(props) {
  if (props.status === 'loading') return <CustomSkeleton w="2rem" h="2rem" />

  const no_permission_required = Boolean(!props.permissions) && Boolean(!props.permission)
  const isPermitted = Help.checkPermission(props.permissions, props.permission)
  const color = props.color ? `is-${props.color}` : 'is-blue'

  if (no_permission_required || isPermitted)
    return (
      <div className={`button is-icon ${color} ${props.className}`} onClick={props.onClick} title={props.title}>
        {props.children}
        {props.label ? <label className="button-icon-label">{props.label}</label> : null}
      </div>
    )

  if (!isPermitted) return null
}

export default ButtonIcon
