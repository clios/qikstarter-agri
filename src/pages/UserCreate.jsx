import { Close20, Information24 } from '@carbon/icons-react'

import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import { Entropy } from 'entropy-string'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormError from '../components/FormError'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { navigate } from '@reach/router'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

function UserCreate() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})
  const [error, setError] = React.useState({})
  const [password, setPassword] = React.useState('')

  // INPUT STATE
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState('no')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [vicinity_barangay, setVicinityBarangay] = React.useState(Account.vicinity_barangay)
  const [vicinity_municipality, setVicinityMunicipality] = React.useState(Account.vicinity_municipality)
  const [vicinity_province, setVicinityProvince] = React.useState('QUIRINO')
  const [read_farmer, setReadFarmer] = React.useState(true)
  const [write_farmer, setWriteFarmer] = React.useState(true)
  const [read_farm, setReadFarm] = React.useState(true)
  const [write_farm, setWriteFarm] = React.useState(true)
  const [read_user, setReadUser] = React.useState(false)
  const [write_user, setWriteUser] = React.useState(false)

  React.useState(() => {
    let entropy = new Entropy({ total: 1e6, risk: 1e9 }).string()
    setPassword(entropy.substring(0, 8))
    return () => setPassword('')
  }, [])

  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    function successAlert() {
      confirmAlert({
        title: 'New User Account Created',
        message: 'User Access Ticket has been downloaded.',
        buttons: [{ label: 'Return to records', onClick: () => navigate('/users/records', { replace: true }) }],
        onClickOutside: () => navigate('/users/records', { replace: true })
      })
    }

    function downloadUAT(data) {
      toJpeg(document.getElementById('UserAccessTicket'))
        .then((dataUrl) => {
          var link = document.createElement('a')
          link.download = `${data.name}.jpeg`
          link.href = dataUrl
          link.click()
        })
        .then(() => {
          successAlert()
        })
        .catch(() => {
          toast.error('Download failed')
        })
    }

    const URL = process.env.BASE_URL + '/users'
    const DATA = {
      email: email,
      name: name?.toUpperCase(),
      office: office?.toUpperCase(),
      position: position?.toUpperCase(),
      deactivated: Help.formSelect(deactivated),
      permissions: [
        read_farmer && 'read_farmer',
        write_farmer && 'write_farmer',
        read_farm && 'read_farm',
        write_farm && 'write_farm',
        read_user && 'read_user',
        write_user && 'write_user'
      ].filter(Boolean),
      password: password
      // vicinity_barangay: vicinity_barangay,
      // vicinity_municipality: vicinity_municipality,
      // vicinity_province: vicinity_province
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .post(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success')
          toast.success('New user account has been created')
          downloadUAT(response.data)
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data)
            setError(error.response.data)
            toast.error('Form input is invalid')
          } else if (error.response?.status === 403) toast.error('User credential is forbidden')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  return (
    <Authorization permissions={Account.permissions} permission="write_user">
      <PageContent>
        <FadeAnimation>
          <Form status={status}>
            <SectionHeader bigTitle="New User Account Form">
              <ButtonIcon onClick={() => navigate('/users/records', { replace: true })} status={status} title="Close">
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
            {/* <SectionHeader title="Area of Responsibility" />
            <FormRow>
              <Field label="Region" status={status}>
                <Input disabled defaultValue="02" size={5} type="text" />
              </Field>
              <Field label="Province" status={status}>
                <Input disabled onChange={(e) => setVicinityProvince(e.target.value)} required size={10} type="text" value={vicinity_province} />
              </Field>
              <Field label="Municipality" status={status}>
                <Select
                  onChange={(e) => {
                    setVicinityBarangay('')
                    setVicinityMunicipality(e.target.value)
                  }}
                  value={vicinity_municipality}>
                  <option value="">ALL MUNICIPALITIES</option>
                  {Address.getMunicipalityList('02', vicinity_province).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Barangay" status={status}>
                <Select onChange={(e) => setVicinityBarangay(e.target.value)} value={vicinity_barangay}>
                  <option value="">ALL BARANGAYS</option>
                  {Address.getBarangayList('02', vicinity_province, vicinity_municipality).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
            </FormRow> */}
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
            <SectionHeader title="4. User Access Ticket" />
            <FormRow>
              <div id="UserAccessTicket" className="uat">
                <p className="uat-title">User Access Ticket</p>
                <p className="uat-subtitle">Q-DRR MIS</p>
                <p className="uat-item">Name: {name?.toUpperCase() || 'N/A'}</p>
                <p className="uat-item">Email: {email || 'N/A'}</p>
                <p className="uat-item">Password: {password}</p>
                <p className="uat-item">Office: {office?.toUpperCase() || 'N/A'}</p>
                <p className="uat-item">Position: {position?.toUpperCase() || 'N/A'}</p>
                <p className="uat-note">
                  Upon receipt of this ticket, use it immediately and change your password. Please refrain from sharing your password, thanks.
                </p>
              </div>
            </FormRow>
            <FormError error={error} />
            <FormFooter>
              <Button
                disabled={status === 'loading'}
                loadingText="Creating..."
                onClick={submitForm}
                status={status}
                title="Create new user"
                type="submit">
                Create User Account
              </Button>
            </FormFooter>
          </Form>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default UserCreate
