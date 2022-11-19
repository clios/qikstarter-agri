import { Close20, Download20, Edit20, Information24, Password20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import { Entropy } from 'entropy-string'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Help from '../Help'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import Toggle from '../fragments/UserInformation/Toggle'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import getUserById from '../api/getUserById'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

function UserInformation() {
  // SEND GET USER REQUEST
  const ROUTE = useParams()
  const User = getUserById(ROUTE.user_id)

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [vicinity_municipality, setVicinityMunicipality] = React.useState('')
  const [vicinity_barangay, setVicinityBarangay] = React.useState('')
  const [permissions, setPermissions] = React.useState([])
  const [password, setPassword] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')

  // ON FETCH USER
  React.useEffect(() => {
    if (User.loading) setStatus('loading')
    if (User.error) setStatus('error')

    if (User.data) {
      setStatus('success')
      setName(User.data.name.toUpperCase())
      setEmail(User.data.email)
      setDeactivated(User.data.deactivated)
      setOffice(User.data.office?.toUpperCase() || 'NOT FOUND')
      setPosition(User.data.position?.toUpperCase() || 'NOT FOUND')
      setPermissions(User.data.permissions)
      setVicinityMunicipality(User.data.vicinity_municipality || 'ALL MUNICIPALITIES')
      setVicinityBarangay(User.data.vicinity_barangay || 'ALL BARANGAYS')
      setUpdatedAt(Help.displayDateTime(User.data.updated_at))
      let entropy = new Entropy({ total: 1e6, risk: 1e9 }).string()
      let pass = entropy.substring(0, 8)
      setPassword(pass)
    }

    return () => setStatus('loading')
  }, [User.loading, User.error, User.data])

  // DELETE USER
  function deleteUser() {
    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    confirmAlert({
      title: 'Delete User Account',
      message: 'This user account will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            axios
              .delete(URL, CONFIG)
              .then((response) => {
                if (response.status === 204) {
                  setStatus('success')
                  toast.success('User account has been deleted')
                  navigate('/users/records', { replace: true })
                }
              })
              .catch((error) => {
                setStatus('success')
                if (error.response) {
                  if (error.response?.status === 403) toast.error('User credential is forbidden')
                  else if (error.response?.status === 404) toast.error('User was not found')
                  else if (error.response?.status === 500) toast.error('Unexpected server error')
                } else if (error.request) console.error(error.request)
                else console.error('Error', error.message)
              })
          }
        },
        { label: 'Cancel' }
      ]
    })
  }

  // RESET PASSWORD
  function resetPassword() {
    function downloadUAT() {
      toJpeg(document.getElementById('UserAccessTicket'))
        .then((dataUrl) => {
          var link = document.createElement('a')
          link.download = `${name}.jpeg`
          link.href = dataUrl
          link.click()
        })
        .then(() => toast.success('Password has been reset'))
        .catch(() => toast.error('Download failed'))
    }

    confirmAlert({
      title: 'Reset Password',
      message: 'Reset password and download new User Access Ticket',
      buttons: [
        {
          label: 'Reset',
          onClick: () => {
            setStatus('loading')
            const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
            const DATA = { password: password }
            const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

            axios
              .patch(URL, DATA, CONFIG)
              .then((response) => {
                if (response.status === 201) {
                  setStatus('success')
                  downloadUAT()
                }
              })
              .catch((error) => {
                setStatus('success')
                if (error.response) {
                  if (error.response?.status === 400) toast.error('Form input is invalid')
                  else if (error.response?.status === 403) toast.error('User credential is forbidden')
                  else if (error.response?.status === 404) toast.error('User was not found')
                  else if (error.response?.status === 500) toast.error('Unexpected server error')
                } else if (error.request) console.error(error.request)
                else console.error('Error', error.message)
              })
          }
        },
        { label: 'Cancel' }
      ]
    })
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_user">
      {/* {status === 'success' && (
        <VicinityChecker
          accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
          recordAddress={Help.displayTags([User.data?.vicinity_province, User.data?.vicinity_municipality, User.data?.vicinity_barangay])}
        />
      )} */}
      <PageContent status={status}>
        <FadeAnimation>
          <PaperView>
            <SectionHeader bigTitle="User Account Information">
              <CSVLink
                filename="USER.csv"
                data={[{ ...User.data }] || []}
                headers={[
                  { label: 'Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Office', key: 'office' },
                  { label: 'Position', key: 'position' },
                  { label: 'Permissions', key: 'permissions' },
                  { label: 'Deactivated', key: 'deactivated' },
                  { label: 'Date Created', key: 'created_at' },
                  { label: 'Date Updated', key: 'updated_at' }
                ]}>
                <ButtonIcon status={status} title="Download User Info">
                  <Download20 />
                </ButtonIcon>
              </CSVLink>
              <ButtonIcon
                onClick={() => navigate('/users/records/' + ROUTE.user_id + '/edit')}
                permission="write_user"
                permissions={Account.permissions}
                status={status}
                title="Edit user account">
                <Edit20 />
              </ButtonIcon>
              <ButtonIcon onClick={deleteUser} permission="write_user" permissions={Account.permissions} status={status} title="Delete user account">
                <TrashCan20 />
              </ButtonIcon>
              <ButtonIcon color="red" onClick={() => navigate('/users/records', { replace: true })} status={status} title="Close">
                <Close20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionHeader title="1. Personal" />
            <SectionBody>
              <Field label="Name" status={status} text={name} />
              <Field label="Email" status={status} text={email} />
            </SectionBody>
            <SectionHeader title="2. Office" />
            <SectionBody>
              <Field label="Office Name" status={status} text={office} />
              <Field label="Position / Title" status={status} text={position} />
            </SectionBody>
            <SectionHeader title="3. Vicinity">
              <div title="Area limit of jurisdiction.">
                <Information24 />
              </div>
            </SectionHeader>
            <SectionBody>
              <Field label="Municipality" status={status} text={vicinity_municipality} />
              <Field label="Barangay" status={status} text={vicinity_barangay} />
            </SectionBody>
            <SectionHeader title="4. Permissions">
              <div title="Read means the user can search, view and download records. Write means the user can create, update and delete records.">
                <Information24 />
              </div>
            </SectionHeader>
            <SectionBody>
              <Field label="Active Account" status={status}>
                <Toggle available={!deactivated ? true : false} />
              </Field>
            </SectionBody>
            <SectionBody>
              <Field label="Read Farmer Records" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'read_farmer') ? true : false} />
              </Field>
              <Field label="Write Farmer Records" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'write_farmer') ? true : false} />
              </Field>
            </SectionBody>
            <SectionBody>
              <Field label="Read Farm Records" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'read_farm') ? true : false} />
              </Field>
              <Field label="Write Farm Records" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'write_farm') ? true : false} />
              </Field>
            </SectionBody>
            <SectionBody>
              <Field label="Read User Accounts" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'read_user') ? true : false} />
              </Field>
              <Field label="Write User Accounts" status={status}>
                <Toggle available={Help.checkPermission(permissions, 'write_user') ? true : false} />
              </Field>
            </SectionBody>
            <SectionHeader title="5. Reset Security Password">
              <ButtonIcon onClick={resetPassword} status={status} title="Reset password">
                <Password20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionBody status={status}>
              <div id="UserAccessTicket" className="uat">
                <p className="uat-title">User Access Ticket</p>
                <p className="uat-subtitle">Q-Agri MIS</p>
                <p className="uat-item">Name: {name}</p>
                <p className="uat-item">Email: {email}</p>
                <p className="uat-item">Password: {password}</p>
                <p className="uat-item">Office: {office}</p>
                <p className="uat-item">Position: {position}</p>
                <p className="uat-note">
                  Upon receipt of this ticket, use it immediately and change your password. Please refrain from sharing your password, thanks.
                </p>
              </div>
            </SectionBody>
            <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
          </PaperView>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default UserInformation
