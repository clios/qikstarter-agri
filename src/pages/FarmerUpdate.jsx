import { Close20, Information24 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import Cleave from 'cleave.js/react'
import { Entropy } from 'entropy-string'
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
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import getFarmerById from '../api/getFarmerById'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

function FarmerUpdate() {
  // SEND GET FARMER REQUEST
  const ROUTE = useParams()
  const Farmer = getFarmerById(ROUTE.farmer_id)

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})
  const [error, setError] = React.useState({})

  // EXISTING FARMER RECORD FORM -----------------------------------------------|
  const [recorded_at, setRecordedAt] = React.useState('')
  // 1. PERSONAL INFORMATION
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [employment, setEmployment] = React.useState('owner')
  const [spouse, setSpouse] = React.useState('')
  const [total_children, setTotalChildren] = React.useState('')
  // 2. RESIDENTIAL ADDRESS
  const address_region = '02'
  const address_province = 'QUIRINO'
  const [address_municipality, setAddressMunicipality] = React.useState('')
  const [address_barangay, setAddressBarangay] = React.useState('')
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  // 3. RESIDENTIAL LOCATION
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')
  // ----------------------------------------------------------------------|

  // ON FETCH FARMER
  React.useEffect(() => {
    if (Farmer.loading) setStatus('loading')
    if (Farmer.error) setStatus('error')

    if (Farmer.data) {
      let f = Farmer.data
      setStatus('success')
      setRecordedAt(Help.setDate(f.recorded_at))
      setName(Help.setText(f.name))
      setBirthday(Help.setDate(f.birthday))
      setSex(Help.setSelect(f.sex))
      setMaritalStatus(Help.setSelect(f.marital_status))
      setEmployment(Help.setSelect(f.employment))
      setSpouse(Help.setText(f.spouse))
      setTotalChildren(Help.setNumber(f.total_children))
      setAddressMunicipality(Help.setSelect(f.address_municipality))
      setAddressBarangay(Help.setSelect(f.address_barangay))
      setAddressPurok(Help.setText(f.address_purok))
      setAddressStreet(Help.setText(f.address_street))
      setAddressLatitude(Help.setNumber(f.address_latitude))
      setAddressLongitude(Help.setNumber(f.address_longitude))
    }

    return () => setStatus('loading')
  }, [Farmer.loading, Farmer.error, Farmer.data])

  // SEND UPDATE FARMER REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/farmers/' + ROUTE.farmer_id
    const DATA = {
      address_barangay: address_barangay,
      address_municipality: address_municipality,
      address_province: 'QUIRINO',
      address_purok: Help.formInputText(address_purok),
      address_street: Help.formInputText(address_street),
      birthday: Help.formInputDateTime(birthday),
      employment: Help.formSelect(employment),
      marital_status: Help.formSelect(marital_status),
      name: Help.formInputText(name),
      recorded_at: Help.formInputDateTime(recorded_at),
      sex: Help.formSelect(sex),
      spouse: Help.formInputText(spouse),
      total_children: Help.formInputNumber(total_children)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Farmer record has beed updated')
          navigate('/farmers/records/' + ROUTE.farmer_id, { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data)
            setError(error.response.data)
          } else if (error.response?.status === 403) toast.error('User credential is forbidden')
          else if (error.response?.status === 404) toast.error('Farmer record was not found')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  return (
    <Authorization permissions={Account.permissions} permission="write_farmer">
      <PageContent>
        <FadeAnimation>
          <Form status={status}>
            <SectionHeader bigTitle="Existing Farmer Record Form">
              <ButtonIcon color="red" onClick={() => navigate('/farmers/records', { replace: true })} status={status} title="Close">
                <Close20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionBody>
              <Field error={helper.recorded_at} label="Date of Farm Visit" status={status}>
                <Input onChange={(e) => setRecordedAt(e.target.value)} size={35} type="date" value={recorded_at} />
              </Field>
            </SectionBody>
            <SectionHeader title="1. Personal Information" />
            <FormRow>
              <Field error={helper.name} label="Full Name" status={status}>
                <Input uppercase onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
              </Field>
              <Field error={helper.birthday} label="Birthday" status={status}>
                <Input onChange={(e) => setBirthday(e.target.value)} size={35} type="date" value={birthday} />
              </Field>
              <Field error={helper.sex} label="Sex" status={status}>
                <Select onChange={(e) => setSex(e.target.value)} value={sex}>
                  <option value="">NO ANSWER</option>
                  <option value="male">MALE</option>
                  <option value="female">FEMALE</option>
                </Select>
              </Field>
              <Field error={helper.marital_status} label="Marital Status" status={status}>
                <Select onChange={(e) => setMaritalStatus(e.target.value)} value={marital_status}>
                  <option value="">NO ANSWER</option>
                  <option value="single">SINGLE</option>
                  <option value="married">MARRIED</option>
                  <option value="living-in">LIVING-IN</option>
                  <option value="widowed">WIDOWED</option>
                  <option value="separated">SEPARATED</option>
                  <option value="divorced">DIVORCED</option>
                </Select>
              </Field>
              <Field error={helper.employment} label="Main Livelihood" status={status}>
                <Select onChange={(e) => setEmployment(e.target.value)} value={employment}>
                  <option value=""></option>
                  <option value="owner">OWNER</option>
                  <option value="tenant">TENANT</option>
                  <option value="laborer">LABORER</option>
                </Select>
              </Field>
            </FormRow>
            <FormRow>
              <Field error={helper.spouse} label="Spouse Name" status={status}>
                <Input uppercase onChange={(e) => setSpouse(e.target.value)} size={30} type="text" value={spouse} />
              </Field>
              <Field error={helper.total_children} label="Total Children" status={status}>
                <Cleave
                  className="input"
                  size={10}
                  onChange={(e) => setTotalChildren(e.target.value)}
                  options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
                  value={total_children}
                />
              </Field>
            </FormRow>
            <SectionHeader title="2. Residential Address" />
            <FormRow>
              <Field label="Region" status={status}>
                <Select disabled>
                  <option>02</option>
                </Select>
              </Field>
              <Field label="Province" status={status}>
                <Select disabled>
                  <option>QUIRINO</option>
                </Select>
              </Field>
              {/* {Account.vicinity_municipality === '' && ( */}
              <Field error={helper.address_municipality} label="Municipality" status={status}>
                <Select
                  onChange={(e) => {
                    setAddressBarangay('')
                    setAddressMunicipality(e.target.value)
                  }}
                  value={address_municipality}>
                  <option value=""></option>
                  {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              {/* )} */}
            </FormRow>
            <FormRow>
              {/* {Account.vicinity_barangay === '' && ( */}
              <Field error={helper.address_barangay} label="Barangay" status={status}>
                <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                  <option value=""></option>
                  {Address.Barangays('02', 'QUIRINO', address_municipality).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              {/* )} */}
              <Field error={helper.address_purok} label="Purok" status={status}>
                <Input uppercase onChange={(e) => setAddressPurok(e.target.value)} required size={20} type="text" value={address_purok} />
              </Field>
              <Field error={helper.address_street} label="Street" status={status}>
                <Input uppercase onChange={(e) => setAddressStreet(e.target.value)} required size={20} type="text" value={address_street} />
              </Field>
            </FormRow>
            <SectionHeader title="3. Residential Location" />
            <FormRow>
              <Field error={helper.address_latitude} label="Latitude" status={status}>
                <Cleave
                  className="input"
                  onChange={(e) => setAddressLatitude(e.target.value)}
                  size={20}
                  type="text"
                  options={{
                    numeral: true,
                    numeralIntegerScale: 2,
                    numeralDecimalScale: 15,
                    numeralThousandsGroupStyle: 'none'
                  }}
                  value={address_latitude}
                />
              </Field>
              <Field error={helper.address_longitude} label="Longitude" status={status}>
                <Cleave
                  className="input"
                  onChange={(e) => setAddressLongitude(e.target.value)}
                  size={20}
                  type="text"
                  options={{
                    numeral: true,
                    numeralIntegerScale: 3,
                    numeralDecimalScale: 15,
                    numeralThousandsGroupStyle: 'none'
                  }}
                  value={address_longitude}
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
                title="Update existing farmer record"
                type="submit">
                Update Farmer Record
              </Button>
            </FormFooter>
          </Form>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerUpdate