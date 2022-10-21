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
import Toggle from '../fragments/EvacuationCenterInformation/Toggle'
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

function EvacuationCenterInformation() {
  // SEND GET EVACUATION CENTER REQUEST
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

  // ON FETCH EVACUATION CENTER
  React.useEffect(() => {
    //   if (Resident.loading) setStatus('loading')
    //   if (Resident.error) setStatus('error')

    //   if (Resident.data) {
    setStatus('success')
    // setName(Resident.data.name)
    // setBirthday(Resident.data.birthday)
    // setAge(Resident.data.age)
    // setSex(Resident.data.sex)
    // setMaritalStatus(Resident.data.marital_status)
    // setBarangay(Resident.data.barangay)
    // setMunicipality(Resident.data.municipality)
    // setProvince(Resident.data.province)
    // setUpdatedAt(Resident.data.updated_at)
    // setLastUpdatedBy(Resident.data.last_updated_by)
    //   }

    return () => setStatus('loading')
  }, [])
  // }, [Resident.loading, Resident.error, Resident.data])

  // DELETE RESIDENT
  function deleteEvacuationCenter() {
    const URL = process.env.BASE_URL + '/residents/' + ROUTE.resident_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('qikstarter-drr-token')}` } }

    confirmAlert({
      title: 'Delete Evacuation Center Information',
      message: 'This evacuation center record will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            // axios
            //   .delete(URL, CONFIG)
            //   .then((response) => {
            //     if (response.status === 204) {
            //       setStatus('success')
            toast.success('Evacuation center information has been deleted')
            navigate('/evacuation/centers')
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
          <SectionHeader bigTitle="Evacuation Center Information">
            {/* <CSVLink
              filename="EVACUATION CENTER INFORMATION.csv"
              data={[{ ...EvacuationCenterInformation.data }] || []}
              headers={[
                { label: 'ID', key: 'id' },
                { label: 'Name', key: 'name' }
              ]}> */}
            <ButtonIcon status={status} title="Download Evacuation Center Information">
              <Download20 />
            </ButtonIcon>
            {/* </CSVLink> */}
            <ButtonIcon
              // onClick={() => navigate('/residents/records/' + ROUTE.resident_id + '/edit')}
              // permission="write_resident"
              // permissions={Account.permissions}
              status={status}
              title="Edit evacuation center information">
              <Edit20 />
            </ButtonIcon>
            <ButtonIcon
              onClick={deleteEvacuationCenter}
              // permission="write_resident"
              // permissions={Account.permissions}
              status={status}
              title="Delete evacuation center information">
              <TrashCan20 />
            </ButtonIcon>
            <ButtonIcon onClick={() => navigate('/evacuation/centers', { replace: true })} status={status} title="Close">
              <Close20 />
            </ButtonIcon>
          </SectionHeader>
          <SectionHeader title="1. Evacuation Center" />
          <SectionBody>
            <Field label="Name" status={status} text={Help.displayText('MAGSAYSAY BARANGAY HEALTH CENTER')} />
            <Field label="Capacity" status={status} text={Help.displayNumberWithComma(1200)} />
          </SectionBody>
          <SectionBody>
            <Field label="Province" status={status} text={Help.displayText('QUIRINO')} />
            <Field label="Municipality" status={status} text={Help.displayText('SAGUDAY')} />
            <Field label="Barangay" status={status} text={Help.displayText('MAGSAYSAY')} />
          </SectionBody>
          <SectionBody>
            <Field label="Latitude" status={status} text={Help.displayText('16.536879')} />
            <Field label="Longitude" status={status} text={Help.displayText('121.561620')} />
          </SectionBody>
          <SectionHeader title="2. Facilities" />
          <SectionBody>
            <Field label="Backup Power Source" status={status}>
              <Toggle />
            </Field>
            <Field label="Breastfeeding" status={status}>
              <Toggle />
            </Field>
            <Field label="Clinic" status={status}>
              <Toggle />
            </Field>
            <Field label="Communication Room" status={status}>
              <Toggle />
            </Field>
            <Field label="Council" status={status}>
              <Toggle available />
            </Field>
            <Field label="Couples Room" status={status}>
              <Toggle />
            </Field>
            <Field label="Dining" status={status}>
              <Toggle available />
            </Field>
            <Field label="Distillation Area" status={status}>
              <Toggle />
            </Field>
            <Field label="Electrical Room" status={status}>
              <Toggle />
            </Field>
            <Field label="Kitchen" status={status}>
              <Toggle available />
            </Field>
            <Field label="Laundry Area" status={status}>
              <Toggle available />
            </Field>
            <Field label="Pharmacy" status={status}>
              <Toggle />
            </Field>
            <Field label="Playroom" status={status}>
              <Toggle />
            </Field>
            <Field label="Registration Area" status={status}>
              <Toggle available />
            </Field>
            <Field label="Rest Room" status={status}>
              <Toggle available />
            </Field>
            <Field label="Water Station" status={status}>
              <Toggle available />
            </Field>
          </SectionBody>
        </PaperView>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default EvacuationCenterInformation
