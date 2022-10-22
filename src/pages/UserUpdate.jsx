import { Close20, Information24 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormError from '../components/FormError'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import VicinityChecker from '../components/VicinityChecker'
import axios from 'axios'
import getUserById from '../api/getUserById'
import { toast } from 'react-toastify'

const User = {
  data: {
    id: 1,
    name: 'CLIEMTOR B. FABROS',
    email: 'cliemtor@devhaus.ph',
    position: 'SYSTEM ADMINISTRATOR',
    inactive: false,
    office: 'DEVHAUS TECHNOLOGIES',
    vicinity_barangay: '',
    vicinity_municipality: '',
    vicinity_province: 'QUIRINO',
    permissions: ['read_users', 'write_users', 'read_tasks', 'write_tasks', 'read_dashboard', 'read_map'],
    created_at: '2021-11-05T06:11:56.926268Z',
    updated_at: '2021-11-05T06:11:56.926268Z'
  }
}

function UserUpdate() {
  // SEND GET USER REQUEST
  const ROUTE = useParams()
  const User = getUserById(ROUTE.user_id)

  // INFORMATIONAL STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})
  const [error, setError] = React.useState({})

  // INPUT STATE
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [vicinity_barangay, setVicinityBarangay] = React.useState('')
  const [vicinity_municipality, setVicinityMunicipality] = React.useState('')
  const [vicinity_province, setVicinityProvince] = React.useState('QUIRINO')
  const [read_farmer, setReadFarmer] = React.useState(true)
  const [write_farmer, setWriteFarmer] = React.useState(true)
  const [read_farm, setReadFarm] = React.useState(true)
  const [write_farm, setWriteFarm] = React.useState(true)
  const [read_user, setReadUser] = React.useState(false)
  const [write_user, setWriteUser] = React.useState(false)

  // ON FETCH USER
  React.useEffect(() => {
    if (User.loading) setStatus('loading')
    if (User.error) setStatus('error')

    if (User.data) {
      setStatus('success')
      setName(User.data.name)
      setEmail(User.data.email)
      setOffice(User.data.office)
      setPosition(User.data.position)
      // setVicinityMunicipality(Help.formDataOrEmptyString(R.data.vicinity_municipality))
      // setVicinityBarangay(Help.formDataOrEmptyString(R.data.vicinity_barangay))
      setDeactivated(User.data.deactivated ? 'yes' : 'no')
      setReadFarmer(Help.checkPermission(User.data.permissions, 'read_farmer'))
      setWriteFarmer(Help.checkPermission(User.data.permissions, 'write_farmer'))
      setReadFarm(Help.checkPermission(User.data.permissions, 'read_farm'))
      setWriteFarm(Help.checkPermission(User.data.permissions, 'write_farm'))
      setReadUser(Help.checkPermission(User.data.permissions, 'read_user'))
      setWriteUser(Help.checkPermission(User.data.permissions, 'write_user'))
    }

    return () => setStatus('loading')
  }, [User.loading, User.error, User.data])

  // SEND PATCH USER REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const DATA = {
      email: email,
      name: name?.toUpperCase(),
      office: office?.toUpperCase(),
      position: position?.toUpperCase(),
      vicinity_province: 'QUIRINO',
      vicinity_municipality: vicinity_municipality,
      vicinity_barangay: vicinity_barangay,
      deactivated: Help.formSelect(deactivated),
      permissions: [
        read_farmer && 'read_farmer',
        write_farmer && 'write_farmer',
        read_farm && 'read_farm',
        write_farm && 'write_farm',
        read_user && 'read_user',
        write_user && 'write_user'
      ].filter(Boolean)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success')
          toast.success('User account has been updated')
          navigate('/users/records/' + ROUTE.user_id, { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data)
            toast.error('Form input is invalid')
          } else if (error.response?.status === 403) toast.error('User credential is forbidden')
          else if (error.response?.status === 404) toast.error('User was not found')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  return (
    <Authorization permissions={Account.permissions} permission="write_user">
      {/* {status === 'success' && (
      <VicinityChecker
        accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
        recordAddress={Help.displayTags([User.data?.vicinity_province, User.data?.vicinity_municipality, User.data?.vicinity_barangay])}
      />
    )} */}
      <PageContent>
        <FadeAnimation>
          <Form status={status}>
            <SectionHeader bigTitle="Existing User Account Form">
              <ButtonIcon onClick={() => navigate(`/users/records/${ROUTE.user_id}`, { replace: true })} status={status} title="Close">
                <Close20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionHeader title="1. Personal Information" />
            <FormRow>
              <Field error={helper.name} label="Full Name" status={status}>
                <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
              </Field>
              <Field error={helper.email} label="Email" status={status}>
                <Input onChange={(e) => setEmail(e.target.value)} required size={30} type="email" value={email} />
              </Field>
            </FormRow>
            <SectionHeader title="2. Office Information" />
            <FormRow>
              <Field label="Office" status={status}>
                <Input uppercase onChange={(e) => setOffice(e.target.value)} required size={30} type="text" value={office} />
              </Field>
              <Field label="Position" status={status}>
                <Input uppercase onChange={(e) => setPosition(e.target.value)} required size={30} type="text" value={position} />
              </Field>
            </FormRow>
            <SectionHeader title="3. Permissions">
              <div title="Read means the user can search, view and download records. Write means the user can create, update and delete records.">
                <Information24 />
              </div>
            </SectionHeader>
            <FormRow status={status}>
              <Field label="Deactivated" status={status}>
                <Select onChange={(e) => setDeactivated(e.target.value)} value={deactivated}>
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </Select>
              </Field>
            </FormRow>
            <FormRow status={status}>
              <Checkbox checked={read_farmer} onChange={(e) => setReadFarmer(e.target.checked)} text="Read Farmer Records" />
              <Checkbox checked={write_farmer} onChange={(e) => setWriteFarmer(e.target.checked)} text="Write Farmer Records" />
            </FormRow>
            <FormRow status={status}>
              <Checkbox checked={read_farm} onChange={(e) => setReadFarm(e.target.checked)} text="Read Farm Records" />
              <Checkbox checked={write_farm} onChange={(e) => setWriteFarm(e.target.checked)} text="Write Farm Records" />
            </FormRow>
            <FormRow status={status}>
              <Checkbox checked={read_user} onChange={(e) => setReadUser(e.target.checked)} text="Read User Accounts" />
              <Checkbox checked={write_user} onChange={(e) => setWriteUser(e.target.checked)} text="Write User Accounts" />
            </FormRow>
            <FormError error={error} />
            <FormFooter>
              <Button
                disabled={status === 'loading'}
                loadingText="Updating..."
                onClick={submitForm}
                status={status}
                title="Update existing user account"
                type="submit">
                Update User Account
              </Button>
            </FormFooter>
          </Form>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default UserUpdate
