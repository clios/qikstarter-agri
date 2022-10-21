import { Close20, Download20, Edit20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Help from '../Help'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import { confirmAlert } from 'react-confirm-alert'
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

function ResidentProfile() {
  // SEND GET RESIDENT REQUEST
  const ROUTE = useParams()
  // const Resident = getResidentById(ROUTE.resident_id)

  // INFORMATION STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [age, setAge] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [barangay, setBarangay] = React.useState('')
  const [municipality, setMunicipality] = React.useState('')
  const [province, setProvince] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')
  const [last_updated_by, setLastUpdatedBy] = React.useState('')

  // ON FETCH RESIDENT
  React.useEffect(() => {
    //   if (Resident.loading) setStatus('loading')
    //   if (Resident.error) setStatus('error')

    //   if (Resident.data) {
    setStatus('success')
    setName(Resident.data.name)
    setBirthday(Resident.data.birthday)
    setAge(Resident.data.age)
    setSex(Resident.data.sex)
    setMaritalStatus(Resident.data.marital_status)
    setBarangay(Resident.data.barangay)
    setMunicipality(Resident.data.municipality)
    setProvince(Resident.data.province)
    setUpdatedAt(Resident.data.updated_at)
    setLastUpdatedBy(Resident.data.last_updated_by)
    //   }

    return () => setStatus('loading')
  }, [])
  // }, [Resident.loading, Resident.error, Resident.data])

  // DELETE RESIDENT
  function deleteResident() {
    const URL = process.env.BASE_URL + '/residents/' + ROUTE.resident_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('qikstarter-token')}` } }

    confirmAlert({
      title: 'Delete Resident Record',
      message: 'This resident record will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            // axios
            //   .delete(URL, CONFIG)
            //   .then((response) => {
            //     if (response.status === 204) {
            //       setStatus('success')
            toast.success('Resident record has been deleted')
            navigate('/residents/records')
            //   }
            // })
            // .catch((error) => {
            //   setStatus('success')
            //   if (error.response) {
            //     if (error.response?.status === 403) toast.error('User credential is forbidden')
            //     else if (error.response?.status === 404) toast.error('Resident record was not found')
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
    // <Authorization permissions={Account.permissions} permission="read_resident">
    // {/* {status === 'success' && (
    //   <VicinityChecker
    //     accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
    //     recordAddress={Help.displayTags([Resident.data?.vicinity_province, Resident.data?.vicinity_municipality, Resident.data?.vicinity_barangay])}
    //   />
    // )} */}
    <PageContent status={status}>
      <FadeAnimation>
        <PaperView>
          <SectionHeader bigTitle="Resident Record">
            <CSVLink
              filename="Resident.csv"
              data={[{ ...Resident.data }] || []}
              headers={[
                { label: 'ID', key: 'id' },
                { label: 'Name', key: 'name' },
                { label: 'Birthday', key: 'birthday' },
                { label: 'Age', key: 'age' },
                { label: 'Sex', key: 'sex' },
                { label: 'Marital Status', key: 'marital_status' },
                { label: 'Barangay', key: 'barangay' },
                { label: 'Municipality', key: 'municipality' },
                { label: 'Province', key: 'province' },
                { label: 'Date Updated', key: 'updated_at' }
              ]}>
              <ButtonIcon status={status} title="Download Resident Info">
                <Download20 />
              </ButtonIcon>
            </CSVLink>
            <ButtonIcon
              onClick={() => navigate('/residents/records/' + ROUTE.resident_id + '/edit')}
              // permission="write_resident"
              // permissions={Account.permissions}
              status={status}
              title="Edit resident account">
              <Edit20 />
            </ButtonIcon>
            <ButtonIcon
              onClick={deleteResident}
              // permission="write_resident"
              // permissions={Account.permissions}
              status={status}
              title="Delete resident account">
              <TrashCan20 />
            </ButtonIcon>
            <ButtonIcon onClick={() => navigate('/residents/records', { replace: true })} status={status} title="Close">
              <Close20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="Personal Information" />
          <SectionBody>
            <Field label="Name" status={status} text={Help.displayText(name)} />
            <Field label="Birthday" status={status} text={Help.displayDate(birthday)} />
            <Field label="Age" status={status} text={Help.displayNumber(age)} />
            <Field label="Sex" status={status} text={Help.displayText(sex)} />
            <Field label="Barangay" status={status} text={Help.displayText(barangay)} />
            <Field label="Municipality" status={status} text={Help.displayText(municipality)} />
            <Field label="Province" status={status} text={Help.displayText(province)} />
          </SectionBody>
        </PaperView>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default ResidentProfile
