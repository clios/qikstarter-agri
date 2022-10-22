import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import { Close20 } from '@carbon/icons-react'
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
import axios from 'axios'
import getAccount from '../api/getAccount'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function YourAccountUpdate() {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-agri-web-token') ? true : false
  const Account = getAccount(has_token)
  if (!has_token) return <Redirect to="/" noThrow replace />

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})
  const [password, setPassword] = React.useState(null)
  const [error, setError] = React.useState({})

  // INPUT STATE: ACCOUNT
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [new_password, setNewPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')

  // ON ACCOUNT FETCH
  React.useEffect(() => {
    if (has_token && Account.loading) setStatus('loading')
    if (Account.error) setStatus('error')

    if (Account.data) {
      setStatus('success')
      setName(Account.data.name)
      setEmail(Account.data.email)
    }

    return () => setStatus('loading')
  }, [Account.data, Account.loading, Account.error])

  // SEND PATCH ACCOUNT REQUEST
  function submitForm(e) {
    e.preventDefault()

    if (new_password !== confirm_password) {
      toast.error('Password mismatched')
      return
    }

    setStatus('loading')
    const URL = process.env.BASE_URL + '/account'
    const DATA = { email: email, name: name, password: password }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success')
          toast.success('Your account has been updated')
          navigate('/your-account/information', { replace: true })
        }
      })
      .catch((error) => {
        setNewPassword('')
        setConfirmPassword('')
        setPassword(null)
        setStatus('success')

        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data)
            setError(error.response.data)
          } else if (error.response?.status === 403) toast.error('User credential is forbidden')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  return (
    <PageContent>
      <FadeAnimation>
        <Form status={status}>
          <SectionHeader bigTitle="Update Your Account">
            <ButtonIcon color="red" onClick={() => navigate('/your-account/information')} status={status} title="Close this form">
              <Close20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="1. Personal Information" />
          <FormRow>
            <Field error={helper.name} label="Name" status={status}>
              <Input className="uppercase" onChange={(e) => setName(e.target.value)} size={20} type="text" value={name} />
            </Field>
            <Field error={helper.email} label="Email" status={status}>
              <Input onChange={(e) => setEmail(e.target.value)} size={30} type="email" value={email} />
            </Field>
          </FormRow>
          <SectionHeader title="2. Security Password" subtitle="If you do not wish to change your password, just leave it blank." />
          <FormRow>
            <Field error={helper.password} label="New password" status={status}>
              <Input
                maxLength={255}
                minLength={8}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setConfirmPassword('')
                  setPassword(null)
                }}
                onKeyUp={(e) => {
                  e.getModifierState('CapsLock') ? setHelper({ new_password: '⚠️ Caps Lock is on' }) : setHelper({})
                }}
                size={35}
                type="password"
                autoComplete="on"
                value={new_password}
              />
            </Field>
            <Field error={helper.confirm_password} label="Confirm password" status={status}>
              <Input
                maxLength={255}
                minLength={8}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (new_password === e.target.value) {
                    toast.info('Password matched')
                    setPassword(e.target.value)
                  }
                }}
                onKeyUp={(e) => {
                  e.getModifierState('CapsLock') ? setHelper({ confirm_password: '⚠️ Caps Lock is on' }) : setHelper({})
                }}
                required={new_password ? true : false}
                size={35}
                type="password"
                autoComplete="on"
                value={confirm_password}
              />
            </Field>
          </FormRow>
          <FormError error={error} />
          <FormFooter>
            <Button
              disabled={status === 'loading'}
              loadingText="Updating..."
              onClick={submitForm}
              status={status}
              title="Update your account"
              type="submit">
              Update Your Account
            </Button>
          </FormFooter>
        </Form>
      </FadeAnimation>
    </PageContent>
  )
}

export default YourAccountUpdate
