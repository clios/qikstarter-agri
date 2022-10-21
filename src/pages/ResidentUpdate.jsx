import { navigate, useParams } from '@reach/router'

import Account from '../api/getAccount'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import Cleave from 'cleave.js/react'
import { Close20 } from '@carbon/icons-react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import { toast } from 'react-toastify'

const Resident = {
  data: {
    id: 1,
    name: 'CLIEMTOR B. FABROS',
    birthday: '1995-12-08T00:00:00',
    age: 26,
    sex: 'male',
    marital_status: 'single',
    barangay: 'DIBUL',
    municipality: 'SAGUDAY',
    province: 'QUIRINO',
    updated_at: '2021-11-05T06:11:56.926268Z',
    last_updated_by: 'CLIEMTOR B. FABROS'
  }
}

function ResidentUpdate() {
  // SEND GET RESIDENT REQUEST
  const ROUTE = useParams()
  // const Resident = getResidentById(ROUTE.resident_id)

  // INFORMATIONAL STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [barangay, setBarangay] = React.useState(Account.vicinity_barangay)
  const [municipality, setMunicipality] = React.useState(Account.vicinity_municipality)
  const [province, setProvince] = React.useState(Account.vicinity_province)
  const [purok, setPurok] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [house_number, setHouseNumber] = React.useState('')

  // ON FETCH RESIDENT
  React.useEffect(() => {
    //   if (Resident.loading) setStatus('loading')
    //   if (Resident.error) setStatus('error')

    //   if (Resident.data) {
    setStatus('success')
    setName(Resident.data.name)
    setBirthday(Help.formInputDate(Resident.data.birthday))
    setSex(Resident.data.sex)
    setMaritalStatus(Resident.data.marital_status)
    setBarangay(Resident.data.barangay)
    setMunicipality(Resident.data.municipality)
    setProvince(Resident.data.province)
    //   }

    return () => setStatus('loading')
  }, [])
  // }, [Resident.loading, Resident.error, Resident.data])

  // SEND PATCH RESIDENT REQUEST
  function submitForm(e) {
    e.preventDefault()
    // setStatus('loading')

    // const URL = process.env.BASE_URL + '/residents/' + ROUTE.resident_id
    // const DATA = {
    //   name: name?.toUpperCase(),
    //   barangay: barangay,
    //   municipality: municipality,
    //   province: province
    //   ].filter(Boolean)
    // }
    // const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('qikstarter-token')}` } }

    // axios
    //   .patch(URL, DATA, CONFIG)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       setStatus('success')
    toast.success('Resident record has been updated')
    navigate('/residents/records/' + ROUTE.resident_id, { replace: true })
    //   }
    // })
    // .catch((error) => {
    //   setStatus('success')
    //   if (error.response) {
    //     if (error.response?.status === 400) {
    //       setHelper(error.response.data)
    //       toast.error('Form input is invalid')
    //     } else if (error.response?.status === 403) toast.error('User credential is forbidden')
    //     else if (error.response?.status === 404) toast.error('Resident was not found')
    //     else if (error.response?.status === 500) toast.error('Unexpected server error')
    //   } else if (error.request) console.error(error.request)
    //   else console.error('Error', error.message)
    // })
  }

  return (
    // <Authorization permissions={Account.permissions} permission="write_resident">
    // {/* {status === 'success' && (
    //   <VicinityChecker
    //     accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
    //     recordAddress={Help.displayTags([Resident.data?.vicinity_province, Resident.data?.vicinity_municipality, Resident.data?.vicinity_barangay])}
    //   />
    // )} */}
    <PageContent>
      <FadeAnimation>
        <Form status={status}>
          <SectionHeader bigTitle="Existing Resident Form">
            <ButtonIcon
              onClick={() => navigate(`/residents/records/${ROUTE.resident_id}`, { replace: true })}
              status={status}
              title="Close this form">
              <Close20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="Personal Information" />
          <FormRow>
            <Field error={helper.name} label="Full Name" status={status}>
              <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
            </Field>
            <Field error={helper.birthday} label="Birthday" status={status}>
              <Input size={35} onChange={(e) => setBirthday(e.target.value)} type="date" value={birthday} />
            </Field>
            <Field error={helper.sex} label="Sex" status={status}>
              <Select onChange={(e) => setSex(e.target.value)} value={sex}>
                <option value="">NO ANSWER</option>
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </Select>
            </Field>
            <Field error={helper.marital_status} label="Marital Status" status={status}>
              <Select onChange={(e) => setMaritalStatus(e.target.value)} value={marital_status}>
                <option value="">NO ANSWER</option>
                <option value="single">SINGLE</option>
                <option value="married">MARRIED</option>
                <option value="living-in">LIVING-IN</option>
                <option value="widowed">WIDOWED</option>
                <option value="separated">SEPARATED</option>
                <option value="divorced">DIVORCED</option>
              </Select>
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Region" status={status}>
              <Select disabled>
                <option>02</option>
              </Select>
            </Field>
            <Field label="Province" status={status}>
              <Select disabled>
                <option>Quirino</option>
              </Select>
            </Field>
            <Field label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setBarangay('')
                  setMunicipality(e.target.value)
                }}
                value={municipality}>
                <option value=""></option>
                {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Barangay" status={status}>
              <Select onChange={(e) => setBarangay(e.target.value)} value={barangay}>
                <option value=""></option>
                {Address.Barangays('02', 'QUIRINO', municipality).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <Field error={helper.purok} label="Purok" status={status}>
              <Input uppercase onChange={(e) => setPurok(e.target.value)} size={5} type="text" value={purok} />
            </Field>
            <Field error={helper.street} label="Street" status={status}>
              <Input uppercase onChange={(e) => setStreet(e.target.value)} size={20} type="text" value={street} />
            </Field>
            <Field error={helper.house_number} label="House No." status={status}>
              <Input uppercase onChange={(e) => setHouseNumber(e.target.value)} size={5} type="text" value={house_number} />
            </Field>
          </FormRow>
          <FormFooter>
            <Button
              disabled={status === 'loading'}
              loadingText="Updating..."
              onClick={submitForm}
              status={status}
              title="Update existing resident record"
              type="submit">
              Update Resident Record
            </Button>
          </FormFooter>
        </Form>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default ResidentUpdate
