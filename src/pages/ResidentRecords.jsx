import { Add20, Download20, Filter20, Reset20 } from '@carbon/icons-react'

import Account from '../json/account.json'
import Address from '../Address'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import Cleave from 'cleave.js/react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import Residents from '../json/residents.json'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function ResidentRecords() {
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
  const [province, setProvince] = React.useState(Account.vicinity_province)
  const [municipality, setMunicipality] = React.useState(Account.vicinity_municipality)
  const [barangay, setBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET RESIDENTS REQUEST
  // const Residents = getResidents(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    if (name !== '') newParams.name = name
    if (province !== '') newParams.province = province
    if (municipality !== '') newParams.municipality = municipality
    if (barangay !== '') newParams.barangay = barangay
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders])
  React.useEffect(() => updateParams(), [province, municipality, barangay])

  // ON GET RESIDENTS
  React.useEffect(() => {
    if (Residents.loading) setStatus('loading')
    if (Residents.error) setStatus('error')
    if (Residents.data) {
      setStatus('success')
      setTotalCount(Residents.data?.total_count)
    }
    return () => setStatus('loading')
  }, [Residents.loading, Residents.error, Residents.data])

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setPage(1)
      setLimit(50)
      setName('')
      setOrders('updated_at:desc')
      setProvince(Account.vicinity_province)
      setMunicipality(Account.vicinity_municipality)
      setBarangay(Account.vicinity_barangay)
      // Residents.mutate()
    }, 500)
  }

  return (
    // <Authorization permissions={Account.permissions} permission="read_resident">
    <PageContent>
      <FadeAnimation>
        <TableToolbar>
          <Input
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && updateParams()}
            placeholder="Search by name"
            value={name}
          />
          <ButtonIcon onClick={() => setDisplay(!display)} title={display ? 'Hide filter options' : 'Display more filter options'} status={status}>
            <Filter20 />
          </ButtonIcon>
          <ButtonIcon onClick={refreshTable} status={status} title="Refresh and reset table">
            <Reset20 />
          </ButtonIcon>
          <CSVLink
            filename={`RESIDENTS.csv`}
            data={Residents.data.recods || []}
            headers={[
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Birthday', key: 'birthday' },
              { label: 'Age', key: 'age' },
              { label: 'Sex', key: 'sex' },
              { label: 'Barangay', key: 'barangay' },
              { label: 'Municipality', key: 'municipality' },
              { label: 'Province', key: 'province' },
              { label: 'Date Created', key: 'created_at' },
              { label: 'Date Updated', key: 'updated_at' }
            ]}>
            <ButtonIcon status={status} title="Download current table">
              <Download20 />
            </ButtonIcon>
          </CSVLink>
          <ButtonIcon
            label="Add Resident Record"
            onClick={() => navigate('/residents/records/add')}
            // permission="write_resident"
            // permissions={Account.permissions}
            status={status}
            title="Add resident record">
            <Add20 />
          </ButtonIcon>
        </TableToolbar>
        <SearchBox className={display ? 'display' : 'hidden'}>
          <FormRow>
            <Field label="Age">
              <Cleave
                className="input"
                size={3}
                options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
                type="text"
              />
            </Field>
            <Field label="Sex">
              <Select>
                <option value="">ALL</option>
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </Select>
            </Field>
            {/* {Account.vicinity_municipality === '' && ( */}
            <Field label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setBarangay('')
                  setMunicipality(e.target.value)
                }}
                value={municipality}>
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
              <Select onChange={(e) => setAddressBarangay(e.target.value)} value={barangay}>
                <option value="">ALL BARANGAYS</option>
                {Address.Barangays('02', 'QUIRINO', municipality).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            {/* )} */}
            <Field label="Order By">
              <Select>
                <option value="address_munipality:desc">MUNICIPALITY (DESC)</option>
                <option value="address_munipality:asc">MUNICIPALITY (ASC)</option>
                <option value="barangay:desc">BARANGAY (DESC)</option>
                <option value="barangay:asc">BARANGAY (ASC)</option>
              </Select>
            </Field>
          </FormRow>
        </SearchBox>
        <PaperView>
          <Table
            status={status}
            emptyLabel="No residents found"
            headers={[
              'Index',
              'Name',
              'Age',
              'Sex',
              !Account.vicinity_municipality && 'Municipality',
              !Account.vicinity_barangay && 'Barangay',
              'Date Updated'
            ].filter(Boolean)}
            total={totalCount}>
            {status === 'success' &&
              Residents.data?.records.map((item, index) => {
                return (
                  <tr key={index} onClick={() => navigate(`/residents/records/${item.id}`)} title="Click to view more details">
                    <td>{Help.displayTableIndex(limit, page, index)}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{Help.displayText(item.sex)}</td>
                    {!Account.vicinity_municipality && <td>{item.municipality}</td>}
                    {!Account.vicinity_barangay && <td>{item.barangay}</td>}
                    <td>{Help.displayDate(item.updated_at)}</td>
                  </tr>
                )
              })}
          </Table>
        </PaperView>
        <TableFooter
          status={status}
          label="Residents"
          page={page}
          limit={limit}
          total={totalCount}
          onUpdatePage={(data) => setPage(data)}
          onUpdateLimit={(data) => setLimit(data)}
        />
      </FadeAnimation>
    </PageContent>
  )
}

export default ResidentRecords
