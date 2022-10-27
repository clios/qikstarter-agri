import './SignIn.css'

import { Redirect, navigate } from '@reach/router'

import Button from '../components/Button'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Input from '../components/Input'
import Loader from '../components/Loader'
import React from 'react'
import axios from 'axios'
import getAccount from '../api/getAccount'
import { toast } from 'react-toastify'

function SignIn() {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-agri-web-token') ? true : false
  const Account = getAccount(has_token)

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState('')

  // INPUT STATE
  const [email, setEmail] = React.useState('cliemtor@devhaus.ph')
  const [password, setPassword] = React.useState('admin123')

  // ON FETCH ACCOUNT
  React.useEffect(() => {
    if (!has_token) setStatus('success')
    if (has_token && Account.loading) setStatus('loading')
    if (Account.error) setStatus('error')
    if (Account.data) setStatus('success')
    return () => setStatus('loading')
  }, [Account.loading, Account.error, Account.data])

  // SEND SIGN IN REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/login'
    const DATA = { email: email, password: password }

    axios
      .post(URL, DATA)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          localStorage.setItem('q-agri-web-token', response.headers['x-token'])
          toast.success('Welcome ' + response?.data?.name)
          navigate('/farmers/dashboard', { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) toast.error('Form input is invalid')
          else if (error.response?.status === 401) toast.error('Email and/or password is incorrect')
          else if (error.response?.status === 403) toast.error('Your account was deactivated by admin')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  return (
    <FadeAnimation>
      <div className="sign-in-container">
        {Account.data && <Redirect to="/farmers/dashboard" noThrow replace />}
        <div className="sign-in-content">
          <img className="sign-in-image" src={require('../assets/sign_in_bg.svg')} alt="poster" />
          <form className="sign-in-form" onSubmit={submitForm}>
            {status === 'loading' && <Loader />}
            <div className="sign-in-title text-orange">Q-Agri MIS</div>
            <Field label="Email">
              <Input className="sign-in-input" onChange={(e) => setEmail(e.target.value)} required size="35" type="email" value={email} />
            </Field>
            <Field error={helper} label="Password">
              <Input
                autoComplete="on"
                className="sign-in-input"
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => (e.getModifierState('CapsLock') ? setHelper('⚠️ Caps Lock is on') : setHelper(''))}
                required
                size="35"
                type="password"
                value={password}
              />
            </Field>
            <p className="sign-in-note">By signing in, you agree to our Terms of Use and Privacy Policy.</p>
            <Button className="sign-in-button" disabled={status === 'loading'} loadingText="Signing in..." type="submit" status={status}>
              Sign In
            </Button>
          </form>
        </div>
        <div className="logo-container">
          <img className="sign-in-logo" src={require('../assets/pgq_logo.png')} alt="logo" />
          <img className="sign-in-logo" src={require('../assets/cffqi_logo.png')} alt="logo" />
        </div>
      </div>
    </FadeAnimation>
  )
}

export default SignIn
