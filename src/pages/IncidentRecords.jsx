import { Add20, Download20, Filter20, Reset20 } from '@carbon/icons-react'

import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Incidents from '../json/incidents.json'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function IncidentRecords() {
  // INFORMATION STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [display, setDisplay] = React.useState(false)
  const [totalCount, setTotalCount] = React.useState(0)

  // INPUT STATE
  const [limit, setLimit] = React.useState(50)
  const [page, setPage] = React.useState(1)
  const [orders, setOrders] = React.useState('updated_at:desc')
  const [name, setName] = React.useState('')
  const [address_province, setAddressProvince] = React.useState(Account.vicinity_province)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET INCIDENTS REQUEST
  // const Incidents = getIncidents(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    // if (vicinity_province !== '') newParams.vicinity_province = vicinity_province
    // if (vicinity_municipality !== '') newParams.vicinity_municipality = vicinity_municipality
    // if (vicinity_barangay !== '') newParams.vicinity_barangay = vicinity_barangay
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders])

  // ON GET INCIDENTS
  React.useEffect(() => {
    if (Incidents.loading) setStatus('loading')
    if (Incidents.error) setStatus('error')
    if (Incidents.data) {
      setStatus('success')
      setTotalCount(Incidents.data?.total_count)
    }
    return () => setStatus('loading')
  }, [Incidents.loading, Incidents.error, Incidents.data])

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setPage(1)
      setLimit(50)
      setName('')
      setOrders('updated_at:desc')
      // setVicinityProvince(Account.vicinity_province)
      // setVicinityMunicipality(Account.vicinity_municipality)
      // setVicinityBarangay(Account.vicinity_barangay)
      // Users.mutate()
    }, 500)
  }

  return (
    // <Authorization permissions={Account.permissions} permission="read_incidents">
    <PageContent>
      <FadeAnimation>
        <TableToolbar
          mainChild={
            <Input
              onChange={(e) => setName(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && updateParams()}
              placeholder="Search by incident name"
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
            filename={`INCIDENTS.csv`}
            data={Incidents.data?.records || []}
            headers={[
              { label: 'Date Incident', key: 'incident_at' },
              { label: 'Name of Incident', key: 'name' },
              { label: 'Type', key: 'type' },
              { label: 'Barangay', key: 'barangay' },
              { label: 'Municipality', key: 'municipality' },
              { label: 'Province', key: 'province' },
              { label: 'Date Created', key: 'created_at' },
              { label: 'Date Updated', key: 'updated_at' }
            ]}>
            <ButtonIcon label="Download" status={status} title="Download current table">
              <Download20 />
            </ButtonIcon>
          </CSVLink>
          <ButtonIcon
            label="Add Incident Record"
            onClick={() => navigate('/incidents/records/add')}
            // permission="write_user"
            // permissions={Account.permissions}
            status={status}>
            <Add20 />
          </ButtonIcon>
        </TableToolbar>
        <SearchBox className={display ? 'display' : 'hidden'}>
          <FormRow>
            <Field label="Type" status={status}>
              <Select>
                <option value=""></option>
                <option value="">TRAUMA</option>
                <option value="">MEDICAL</option>
                <option value="">OBSTETRIC</option>
                <option value="">TRANSFER</option>
                <option value="">OTHER</option>
              </Select>
            </Field>
            {/* {Account.vicinity_municipality === '' && ( */}
            <Field label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setAddressBarangay('')
                  setAddressMunicipality(e.target.value)
                }}
                value={address_municipality}>
                <option value="">ALL MUNICIPALS</option>
                {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            {/* )} */}
            {/* {Account.vicinity_barangay === '' && ( */}
            <Field label="Barangay" status={status}>
              <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                <option value="">ALL BARANGAYS</option>
                {Address.Barangays('02', 'QUIRINO', address_municipality).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            {/* )} */}
            <Field label="Order By" status={status}>
              <Select onChange={(e) => setOrders(e.target.value)} value={orders}>
                <option value="name:desc">NAME (DESC)</option>
                <option value="name:asc">NAME (ASC)</option>
                <option value="name:desc">DATE OCCURED (DESC)</option>
                <option value="name:asc">DATE OCCURED (ASC)</option>
              </Select>
            </Field>
          </FormRow>
        </SearchBox>
        <Table
          status={status}
          emptyLabel="No incidents found"
          headers={['Index', 'Date Occured', 'Name', 'Type', 'Municipality', 'Barangay'].filter(Boolean)}
          total={totalCount}>
          {status === 'success' &&
            Incidents.data?.records.map((item, index) => {
              return (
                <tr key={index} onClick={() => navigate(`/incidents/records/${item.id}`)} title="Click to view more details">
                  <td>{Help.displayTableIndex(limit, page, index)}</td>
                  <td>{Help.displayDate(item.incident_at)}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.municipality}</td>
                  <td>{item.barangay}</td>
                </tr>
              )
            })}
        </Table>
        <TableFooter
          status={status}
          label="Incidents"
          page={page}
          limit={limit}
          total={totalCount}
          onUpdatePage={(data) => setPage(data)}
          onUpdateLimit={(data) => setLimit(data)}
        />
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default IncidentRecords
