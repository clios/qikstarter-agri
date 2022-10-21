import Account from '../json/account.json'
import ButtonIcon from '../components/ButtonIcon'
import { Edit20 } from '@carbon/icons-react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Help from '../Help'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import getAccount from '../api/getAccount'
import { navigate } from '@reach/router'
import PaperView from '../components/PaperView'

function YourAccountProfile() {
  // SEND GET ACCOUNT REQUEST
  // const has_token = localStorage.getItem('qikstarter-drr-token') ? true : false
  // const Account = getAccount(has_token)
  // if (!has_token) return <Redirect to="/" noThrow replace />

  // INFORMATION STATE
  const [status, setStatus] = React.useState('success')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [permissions, setPermissions] = React.useState([])
  const [updated_at, setUpdatedAt] = React.useState('')

  // ON FETCH USER
  React.useEffect(() => {
    if (Account.loading) setStatus('loading')
    if (Account.error) setStatus('error')

    if (Account.data) {
      setStatus('success')
      setName(Account.data.name.toUpperCase())
      setEmail(Account.data.email)
      setOffice(Account.data.office?.toUpperCase() || 'NOT FOUND')
      setPosition(Account.data.position?.toUpperCase() || 'NOT FOUND')
      setPermissions(Account.data.permissions)
      setUpdatedAt(Help.displayDateTime(Account.data.updated_at))
    }

    return () => setStatus('loading')
  }, [Account.loading, Account.error, Account.data])

  return (
    <PageContent>
      <FadeAnimation>
        <PaperView>
          <SectionHeader bigTitle="Your Account Information">
            <ButtonIcon onClick={() => navigate('/your-account/information/edit')} status={status} title="Edit your account">
              <Edit20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="1. Personal Information" />
          <SectionBody>
            <Field label="Name" status={status} text={name} />
            <Field label="Email" status={status} text={email} />
          </SectionBody>
          <SectionHeader title="2. Office Information" />
          <SectionBody>
            <Field label="Office" status={status} text={office} />
            <Field label="Position" status={status} text={position} />
          </SectionBody>
          <SectionHeader title="3. Permissions" />
          <SectionBody>
            <Field
              label="Search and View Resident Records"
              status={status}
              text={Help.checkPermission(permissions, 'read_resident') ? 'YES' : 'NO'}
            />
            <Field
              label="Add, Edit and Delete Resident Records"
              status={status}
              text={Help.checkPermission(permissions, 'write_resident') ? 'YES' : 'NO'}
            />
          </SectionBody>
          <SectionBody>
            <Field label="Search and View User Accounts" status={status} text={Help.checkPermission(permissions, 'read_user') ? 'YES' : 'NO'} />
            <Field label="Add, Edit and Delete User Accounts" status={status} text={Help.checkPermission(permissions, 'write_user') ? 'YES' : 'NO'} />
          </SectionBody>
          <SectionFooter status={status}>Last Update {updated_at}</SectionFooter>
        </PaperView>
      </FadeAnimation>
    </PageContent>
  )
}

export default YourAccountProfile
