import './Table.css'

import CustomSkeleton from './CustomSkeleton'
import EmptyTable from './EmptyTable'
import React from 'react'

function Table(props) {
  const loading_rows = 1

  if (props.status === 'loading')
    return (
      <table className={`table table-custom ${props.className}`}>
        <thead>
          <tr>
            {props.headers?.map((item, index) => {
              return (
                <th key={index} className="text-orange">
                  {item}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {[...Array(loading_rows)].map((item, index) => (
            <tr key={index}>
              {props.headers?.map((item, index) => {
                return (
                  <td key={index} className="text-orange">
                    <CustomSkeleton w="100%" h="1rem" mt=".2rem" mb=".2rem" />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )

  return (
    <React.Fragment>
      <table className={`table table-custom ${props.className}`}>
        <thead>
          <tr>
            {props.headers?.map((item, index) => {
              return (
                <th key={index} className="text-orange">
                  {item}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
      {props.status === 'error' && props.total === undefined ? <EmptyTable label={props.emptyLabel} /> : null}
      {props.status === 'success' && props.total === 0 ? <EmptyTable label={props.emptyLabel} /> : null}
    </React.Fragment>
  )
}

export default Table
