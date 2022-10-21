import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import { Close20 } from '@carbon/icons-react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function VictimCreate() {
  // INFORMATION STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})
  const [password, setPassword] = React.useState('')

  // INPUT STATE
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [barangay, setBarangay] = React.useState(Account.vicinity_barangay)
  const [municipality, setMunicipality] = React.useState(Account.vicinity_municipality)
  const [purok, setPurok] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [house_number, setHouseNumber] = React.useState('')

  function submitForm(e) {
    e.preventDefault()
    // setStatus('loading')

    // const URL = process.env.BASE_URL + '/residents'
    // const DATA = {
    //   name: name?.toUpperCase(),
    //   barangay: barangay,
    //   municipality: municipality,
    //   province: province
    // }
    // const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('qikstarter-drr-token')}` } }

    // axios
    //   .post(URL, DATA, CONFIG)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       setStatus('success')
    toast.success('New victim record has been created')
    navigate('/incidents/records/1', { replace: true })
    //   }
    // })
    // .catch((error) => {
    //   setStatus('success')
    //   if (error.response) {
    //     if (error.response?.status === 400) {
    //       setHelper(error.response.data)
    //       toast.error('Form input is invalid')
    //     } else if (error.response?.status === 403) toast.error('User credential is forbidden')
    //     else if (error.response?.status === 500) toast.error('Unexpected server error')
    //   } else if (error.request) console.error(error.request)
    //   else console.error('Error', error.message)
    // })
  }

  return (
    // <Authorization permissions={Account.permissions} permission="write_resident">
    <PageContent>
      <FadeAnimation>
        <Form status={status}>
          <SectionHeader bigTitle="New Victim Form">
            <ButtonIcon onClick={() => navigate('/incidents/records/1', { replace: true })} status={status} title="Close this form">
              <Close20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="1. Victim" />
          <FormRow>
            <Field error={helper.name} label="Full Name" status={status}>
              <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
            </Field>
            <Field error={helper.name} label="Status" status={status}>
              <Select>
                <option>GREEN</option>
                <option>YELLOW</option>
                <option>RED</option>
                <option>BLACK</option>
              </Select>
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Intervention">
              <Textarea cols={51} />
            </Field>
          </FormRow>
          <SectionHeader title="2. Personal" />
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
            <Field error={helper.purok} label="Purok / Street" status={status}>
              <Input uppercase onChange={(e) => setPurok(e.target.value)} type="text" value={purok} />
            </Field>
          </FormRow>
          <FormRow>
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
            <Field error={helper.marital_status} label="Civil Status" status={status}>
              <Select onChange={(e) => setMaritalStatus(e.target.value)} value={marital_status}>
                <option value="">NO ANSWER</option>
                <option value="single">SINGLE</option>
                <option value="married">MARRIED</option>
                <option value="widowed">WIDOWED</option>
                <option value="separated">SEPARATED</option>
                <option value="divorced">DIVORCED</option>
              </Select>
            </Field>
          </FormRow>
          <FormRow>
            <Field error={helper.name} label="Contact Person" status={status}>
              <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
            </Field>
            <Field error={helper.name} label="Contact Number" status={status}>
              <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
            </Field>
          </FormRow>
          <FormFooter>
            <Button
              disabled={status === 'loading'}
              loadingText="Creating..."
              onClick={submitForm}
              status={status}
              title="Create new victim record"
              type="submit">
              Create Victim Record
            </Button>
          </FormFooter>
        </Form>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default VictimCreate
