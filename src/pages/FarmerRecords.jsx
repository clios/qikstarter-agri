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
import PaperView from '../components/PaperView'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import getFarmers from '../api/getFarmers'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function FarmerRecords() {
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
  const [address_province, setAddressProvince] = React.useState(Account.vicinity_province)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET FARMERS REQUEST
  const Farmers = getFarmers(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    if (name !== '') newParams.name = name
    if (address_province !== '') newParams.address_province = address_province
    if (address_municipality !== '') newParams.address_municipality = address_municipality
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders, address_municipality, address_barangay])

  // ON GET FARMERS
  React.useEffect(() => {
    if (Farmers.loading) setStatus('loading')
    if (Farmers.error) setStatus('error')
    if (Farmers.data) {
      setStatus('success')
      setTotalCount(Farmers.data?.total_count)
    }
    return () => setStatus('loading')
  }, [Farmers.loading, Farmers.error, Farmers.data])

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
      Farmers.mutate()
    }, 500)
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_farmer">
      <PageContent>
        <FadeAnimation>
          <TableToolbar
            mainChild={
              <Input
                onChange={(e) => setName(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && updateParams()}
                placeholder="Search by farmer name"
                value={name}
              />
            }>
            <ButtonIcon label="Filter" onClick={() => setDisplay(!display)} title={display ? 'Hide filter options' : 'Display more filter options'}>
              <Filter20 />
            </ButtonIcon>
            <ButtonIcon label="Refresh" onClick={refreshTable} title="Refresh and reset table">
              <Reset20 />
            </ButtonIcon>
            <CSVLink
              filename={`FARMERS.csv`}
              data={Farmers.data?.records || []}
              headers={[
                { label: 'Id', key: 'id' },
                { label: 'Name', key: 'name' },
                { label: 'Census', key: 'census' },
                { label: 'Employment', key: 'employment' },
                { label: 'Age', key: 'age' },
                { label: 'Birthday', key: 'birthday' },
                { label: 'Sex', key: 'sex' },
                { label: 'Marital Status', key: 'marital_status' },
                { label: 'Spouse', key: 'spouse' },
                { label: 'Total Children', key: 'total_children' },
                { label: 'Address Province', key: 'address_province' },
                { label: 'Address Municipality', key: 'address_municipality' },
                { label: 'Address Barangay', key: 'address_barangay' },
                { label: 'Address Purok', key: 'address_purok' },
                { label: 'Address Street', key: 'address_street' },
                { label: 'Recorded At', key: 'recorded_at' },
                { label: 'Created At', key: 'created_at' },
                { label: 'Updated At', key: 'updated_at' },
                { label: 'Last Updated By', key: 'last_updated_by' }
              ]}>
              <ButtonIcon label="Download" title="Download current table">
                <Download20 />
              </ButtonIcon>
            </CSVLink>
            <ButtonIcon
              label="Add Farmer Record"
              onClick={() => navigate('/farmers/records/add')}
              permission="write_farmer"
              permissions={Account.permissions}>
              <Add20 />
            </ButtonIcon>
          </TableToolbar>
          <SearchBox className={display ? 'display' : 'hidden'}>
            <FormRow>
              {/* {Account.vicinity_municipality === '' && ( */}
              <Field label="Municipality">
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
              <Field label="Barangay">
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
            emptyLabel="No farmers record found"
            headers={['Index', 'Name', 'Age', 'Municipality', 'Barangay'].filter(Boolean)}
            total={totalCount}>
            {status === 'success' &&
              Farmers.data?.records.map((item, index) => {
                return (
                  <tr key={index} onClick={() => navigate(`/farmers/records/${item.id}`)} title="Click to view more details">
                    <td>{Help.displayTableIndex(limit, page, index)}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.address_municipality}</td>
                    <td>{item.address_barangay}</td>
                  </tr>
                )
              })}
          </Table>
          <TableFooter
            status={status}
            label="Farmers"
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

export default FarmerRecords
