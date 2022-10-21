import './TableFooter.css'

import { ChevronLeft20, ChevronRight20 } from '@carbon/icons-react'

import CustomSkeleton from '../components/CustomSkeleton'
import React from 'react'

function TableFooter(props) {
  if (props.status === 'loading') return <CustomSkeleton w="100%" h="2rem" />

  const total_pages = Math.ceil(props.total / props.limit)
  const [items_per_page, setItemsPerPage] = React.useState(props.limit)
  const [current_page, setCurrentPage] = React.useState(props.page)
  const [page_list, setPageList] = React.useState(() => {
    let content = []
    for (let index = 0; index < total_pages; index++) {
      content.push(`${index + 1} of ${total_pages} pages`)
    }
    return content
  })

  function selectItemsPerPage(e) {
    setItemsPerPage(e.target.value)
    setPageList(() => {
      let content = []
      let total_page = Math.ceil(props.total / e.target.value)
      for (let index = 0; index < total_page; index++) {
        content.push(`${index + 1} of ${total_page} pages`)
      }
      return content
    })
    setCurrentPage(1)
    props.onUpdatePage(1)
    props.onUpdateLimit(e.target.value)
  }

  function selectCurrentPage(e) {
    setCurrentPage(parseInt(e.target.value))
    props.onUpdatePage(parseInt(e.target.value))
  }

  function prevPage() {
    setCurrentPage(current_page - 1)
    props.onUpdatePage(current_page - 1)
  }

  function nextPage() {
    setCurrentPage(current_page + 1)
    props.onUpdatePage(current_page + 1)
  }

  if (props.total === 0) return null
  if (props.total === undefined) return null

  return (
    <div className="table-footer bg-dark">
      <div className="select">
        <select onChange={selectItemsPerPage} value={items_per_page}>
          <option value={50}>Display 50 {props.label}</option>
          <option value={100}>Display 100 {props.label}</option>
        </select>
      </div>
      <div className="table-footer-desc">
        {items_per_page * current_page - (items_per_page - 1)} -{' '}
        {items_per_page * current_page > props.total ? props.total : items_per_page * current_page} of {props.total?.toLocaleString()} {props.label}
      </div>
      <div className="select">
        <select onChange={selectCurrentPage} value={current_page}>
          {page_list.map((item, index) => {
            return (
              <option key={index} value={index + 1}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
      <button className="button is-blue is-icon" disabled={current_page === 1} onClick={prevPage}>
        <ChevronLeft20 />
      </button>
      <button className="button is-blue is-icon" disabled={current_page === total_pages} onClick={nextPage}>
        <ChevronRight20 />
      </button>
    </div>
  )
}

export default TableFooter
