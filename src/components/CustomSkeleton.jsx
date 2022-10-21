import React from 'react'
import Skeleton from 'react-loading-skeleton'

function CustomSkeleton(props) {
  return (
    <div className={props.className}>
      <Skeleton
        style={{
          width: props.w,
          height: props.h,
          marginTop: props.mt,
          marginRight: props.mr,
          marginBottom: props.mb,
          marginLeft: props.ml,
          paddingTop: props.pt,
          paddingRight: props.pr,
          paddingBottom: props.pb,
          paddingLeft: props.pl,
          ...props.style
        }}
      />
    </div>
  )
}

export default CustomSkeleton
