import { Close20, Download20, Edit20, Password20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
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
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { toJpeg } from 'html-to-image'
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

function UserProfile() {
  // SEND GET USER REQUEST
  const ROUTE = useParams()
  // const User = getUserById(ROUTE.user_id)

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [permissions, setPermissions] = React.useState([])
  const [password, setPassword] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')

  // ON FETCH USER
  React.useEffect(() => {
    //   if (User.loading) setStatus('loading')
    //   if (User.error) setStatus('error')

    //   if (User.data) {
    setStatus('success')
    setName(User.data.name.toUpperCase())
    setEmail(User.data.email)
    setDeactivated(User.data.deactivated ? 'YES' : 'NO')
    setOffice(User.data.office?.toUpperCase() || 'NOT FOUND')
    setPosition(User.data.position?.toUpperCase() || 'NOT FOUND')
    setPermissions(User.data.permissions)
    setUpdatedAt(Help.displayDateTime(User.data.updated_at))
    let entropy = new Entropy({ total: 1e6, risk: 1e9 }).string()
    let pass = entropy.substring(0, 8)
    setPassword(pass)
    //   }

    return () => setStatus('loading')
  }, [])
  // }, [User.loading, User.error, User.data])

  // DELETE USER
  function deleteUser() {
    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-token')}` } }

    confirmAlert({
      title: 'Delete User Account',
      message: 'This user account will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            // axios
            //   .delete(URL, CONFIG)
            //   .then((response) => {
            //     if (response.status === 204) {
            //       setStatus('success')
            toast.success('User account has been deleted')
            navigate('/users/records')
            //   }
            // })
            // .catch((error) => {
            //   setStatus('success')
            //   if (error.response) {
            //     if (error.response?.status === 403) toast.error('User credential is forbidden')
            //     else if (error.response?.status === 404) toast.error('User was not found')
            //     else if (error.response?.status === 500) toast.error('Unexpected server error')
            //   } else if (error.request) console.error(error.request)
            //   else console.error('Error', error.message)
            // })
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
        .then(() => toast.success('User Access Ticket has been downloaded'))
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
            const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-token')}` } }

            // axios
            //   .patch(URL, DATA, CONFIG)
            //   .then((response) => {
            //     if (response.status === 201) {
            setStatus('success')
            toast.success('Password has been reset')
            downloadUAT()
            // downloadUAT(response.data)
            //   }
            // })
            // .catch((error) => {
            //   setStatus('success')
            //   if (error.response) {
            //     if (error.response?.status === 400) toast.error('Form input is invalid')
            //     else if (error.response?.status === 403) toast.error('User credential is forbidden')
            //     else if (error.response?.status === 404) toast.error('User was not found')
            //     else if (error.response?.status === 500) toast.error('Unexpected server error')
            //   } else if (error.request) console.error(error.request)
            //   else console.error('Error', error.message)
            // })
          }
        },
        { label: 'Cancel' }
      ]
    })
  }

  return (
    // <Authorization permissions={Account.permissions} permission="read_user">
    // {/* {status === 'success' && (
    //   <VicinityChecker
    //     accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
    //     recordAddress={Help.displayTags([User.data?.vicinity_province, User.data?.vicinity_municipality, User.data?.vicinity_barangay])}
    //   />
    // )} */}
    <PageContent status={status}>
      <FadeAnimation>
        <PaperView>
          <SectionHeader bigTitle="User Account Information">
            <CSVLink
              filename="User.csv"
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
              // permission="write_user"
              // permissions={Account.permissions}
              status={status}
              title="Edit user account">
              <Edit20 />
            </ButtonIcon>
            <ButtonIcon
              onClick={deleteUser}
              // permission="write_user"
              // permissions={Account.permissions}
              status={status}
              title="Delete user account">
              <TrashCan20 />
            </ButtonIcon>
            <ButtonIcon onClick={() => navigate('/users/records', { replace: true })} status={status} title="Close">
              <Close20 />
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
            <Field label="Deactivated" status={status} text={deactivated} />
          </SectionBody>
          <SectionBody>
            <Field label="Search and View Farmer Records" status={status} text={Help.checkPermission(permissions, 'read_farmer') ? 'YES' : 'NO'} />
            <Field
              label="Add, Edit and Delete Farmer Records"
              status={status}
              text={Help.checkPermission(permissions, 'write_farmer') ? 'YES' : 'NO'}
            />
          </SectionBody>
          <SectionBody>
            <Field label="View Farm Records" status={status} text={Help.checkPermission(permissions, 'read_farm') ? 'YES' : 'NO'} />
            <Field label="Add, Edit and Delete Farm Records" status={status} text={Help.checkPermission(permissions, 'write_farm') ? 'YES' : 'NO'} />
          </SectionBody>
          <SectionBody>
            <Field label="Search and View User Accounts" status={status} text={Help.checkPermission(permissions, 'read_user') ? 'YES' : 'NO'} />
            <Field label="Add, Edit and Delete User Accounts" status={status} text={Help.checkPermission(permissions, 'write_user') ? 'YES' : 'NO'} />
          </SectionBody>
          <SectionHeader title="4. Reset Security Password">
            <ButtonIcon onClick={resetPassword} status={status} title="Reset password">
              <Password20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionBody status={status}>
            <div id="UserAccessTicket" className="uat">
              <p className="uat-title">User Access Ticket</p>
              <p className="uat-subtitle">Q-DRR MIS</p>
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
          <SectionFooter status={status}>Last Update {updated_at}</SectionFooter>
        </PaperView>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default UserProfile
