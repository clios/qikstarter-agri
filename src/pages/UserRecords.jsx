import { Add20, Download20, Filter20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import getUsers from '../api/getUsers'
import { navigate } from '@reach/router'

function UserRecords() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [display, setDisplay] = React.useState(false)
  const [totalCount, setTotalCount] = React.useState(0)

  // INPUT STATE
  const [limit, setLimit] = React.useState(50)
  const [page, setPage] = React.useState(1)
  const [orders, setOrders] = React.useState('updated_at:desc')
  const [name, setName] = React.useState('')
  const [vicinity_province, setVicinityProvince] = React.useState(Account.vicinity_province)
  const [vicinity_municipality, setVicinityMunicipality] = React.useState(Account.vicinity_municipality)
  const [vicinity_barangay, setVicinityBarangay] = React.useState(Account.vicinity_barangay)
  const [deactivated, setDeactivated] = React.useState('')
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET USERS REQUEST
  const Users = getUsers(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    if (name !== '') newParams.name = name
    if (vicinity_province !== '') newParams.vicinity_province = vicinity_province
    if (vicinity_municipality !== '') newParams.vicinity_municipality = vicinity_municipality
    if (vicinity_barangay !== '') newParams.vicinity_barangay = vicinity_barangay
    if (deactivated !== '') newParams.deactivated = deactivated
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders, deactivated])

  // ON GET USERS
  React.useEffect(() => {
    if (Users.loading) setStatus('loading')
    if (Users.error) setStatus('error')
    if (Users.data) {
      setStatus('success')
      setTotalCount(Users.data?.total_count)
    }
    return () => setStatus('loading')
  }, [Users.loading, Users.error, Users.data])

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setPage(1)
      setLimit(50)
      setName('')
      setDeactivated('')
      setOrders('updated_at:desc')
      setVicinityProvince(Account.vicinity_province)
      setVicinityMunicipality(Account.vicinity_municipality)
      setVicinityBarangay(Account.vicinity_barangay)
      Users.mutate()
    }, 500)
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_user">
      <PageContent>
        <FadeAnimation>
          <TableToolbar
            mainChild={
              <Input
                onChange={(e) => setName(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && updateParams()}
                placeholder="Search by name"
                value={name}
              />
            }>
            <ButtonIcon
              label="Filter"
              onClick={() => setDisplay(!display)}
              title={display ? 'Hide filter options' : 'Display more filter options'}
              status={status}>
              <Filter20 />
            </ButtonIcon>
            <ButtonIcon label="Refresh" onClick={refreshTable} status={status} title="Refresh and reset table">
              <Reset20 />
            </ButtonIcon>
            <CSVLink
              filename={`USERS.csv`}
              data={Users.data?.records || []}
              headers={[
                { label: 'Name', key: 'name' },
                { label: 'Email', key: 'email' },
                { label: 'Office', key: 'office' },
                { label: 'Position', key: 'position' },
                { label: 'Permissions', key: 'permissions' },
                { label: 'Deactivated', key: 'deactivated' },
                { label: 'Date Created', key: 'created_at' },
                { label: 'Date Updated', key: 'updated_at' }
              ]}>
              <ButtonIcon label="Download" status={status} title="Download current table">
                <Download20 />
              </ButtonIcon>
            </CSVLink>
            <ButtonIcon
              label="Add User Account"
              onClick={() => navigate('/users/records/add')}
              permission="write_user"
              permissions={Account.permissions}
              status={status}>
              <Add20 />
            </ButtonIcon>
          </TableToolbar>
          <SearchBox className={display ? 'display' : 'hidden'}>
            <FormRow>
              <Field label="Deactivated">
                <Select onChange={(e) => setDeactivated(e.target.value)} value={deactivated}>
                  <option value="">YES AND NO</option>
                  <option value={true}>YES</option>
                  <option value={false}>NO</option>
                </Select>
              </Field>
              {Account.vicinity_municipality === '' && (
                <Field label="Municipality" status={status}>
                  <Select
                    onChange={(e) => {
                      setVicinityBarangay('')
                      setVicinityMunicipal(e.target.value)
                    }}
                    value={vicinity_municipality}>
                    <option value="">ALL MUNICIPALS</option>
                    {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Field>
              )}
              {Account.vicinity_barangay === '' && (
                <Field label="Barangay" status={status}>
                  <Select onChange={(e) => setVicinityBarangay(e.target.value)} value={vicinity_barangay}>
                    <option value="">ALL BARANGAYS</option>
                    {Address.Barangays('02', 'QUIRINO', vicinity_municipality).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Field>
              )}
              <Field label="Order By">
                <Select onChange={(e) => setOrders(e.target.value)} value={orders}>
                  <option value="name:desc">NAME (DESC)</option>
                  <option value="name:asc">NAME (ASC)</option>
                </Select>
              </Field>
            </FormRow>
          </SearchBox>
          <Table
            status={status}
            emptyLabel="No users found"
            headers={[
              'Index',
              'Name',
              'Office',
              'Deactivated',
              // !Account.vicinity_municipality && 'Municipality',
              // !Account.vicinity_barangay && 'Barangay',
              'Date Updated'
            ].filter(Boolean)}
            total={totalCount}>
            {status === 'success' &&
              Users.data?.records.map((item, index) => {
                return (
                  <tr key={index} onClick={() => navigate(`/users/records/${item.id}`)} title="Click to view more details">
                    <td>{Help.displayTableIndex(limit, page, index)}</td>
                    <td>{item.name}</td>
                    <td>{item.office || 'NOT FOUND'}</td>
                    <td>{item.deactivated ? 'YES' : 'NO'}</td>
                    {/* {!Account.vicinity_municipality && <td>{item.vicinity_municipality}</td>}
                    {!Account.vicinity_barangay && <td>{item.vicinity_barangay}</td>} */}
                    <td>{Help.displayDate(item.updated_at)}</td>
                  </tr>
                )
              })}
          </Table>
          <TableFooter
            status={status}
            label="Users"
            page={page}
            limit={limit}
            total={totalCount}
            onUpdatePage={(data) => setPage(data)}
            onUpdateLimit={(data) => setLimit(data)}
          />
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default UserRecords
