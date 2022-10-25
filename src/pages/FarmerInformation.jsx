import 'leaflet-easyprint'

import { Add20, Close20, Download20, Edit20, Information24, Password20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import { Entropy } from 'entropy-string'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Help from '../Help'
import L from 'leaflet'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import getFarmerById from '../api/getFarmerById'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

// MAP TILE LAYER URL TEMPLATE
const DEFAULT_ZOOM_LEVEL = 10
const DEFAULT_VIEW_LOCATION = [16.523711, 121.516725]
const MAP_TILE_LAYER_URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
const MAP_TILE_LAYER_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
    'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: process.env.MAPBOX_ACCESS_TOKEN
}

function FarmerInformation() {
  // SEND GET FARMER REQUEST
  const ROUTE = useParams()
  const Farmer = getFarmerById(ROUTE.farmer_id)

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [map, setMap] = React.useState(null)

  const [name, setName] = React.useState('')
  const [employment, setEmployment] = React.useState('')
  const [age, setAge] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [spouse, setSpouse] = React.useState('')
  const [total_children, setTotalChildren] = React.useState('')
  const [address_province, setAddressProvince] = React.useState('')
  const [address_municipality, setAddressMunicipality] = React.useState('')
  const [address_barangay, setAddressBarangay] = React.useState('')
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [recorded_at, setRecordedAt] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')
  const [last_updated_by, setLastUpdatedBy] = React.useState('')

  // ON RENDER, REVALIDATE FARMER AND CREATE MAP
  React.useEffect(() => {
    Farmer.mutate()
    setMap(L.map('farmer-map', { scrollWheelZoom: false }).setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL))
  }, [])

  // ON MAP CREATION, SET MAP TILE LAYER
  React.useEffect(() => {
    map && L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)
  }, [map])

  // ON FETCH FARMER
  React.useEffect(() => {
    if (Farmer.loading) setStatus('loading')
    if (Farmer.error) setStatus('error')

    if (Farmer.data) {
      setStatus('success')
      setName(Help.displayText(Farmer.data.name))
      setEmployment(Help.displayText(Farmer.data.employment))
      setAge(Help.displayNumber(Farmer.data.age))
      setBirthday(Help.displayDate(Farmer.data.birthday))
      setSex(Help.displayText(Farmer.data.sex))
      setMaritalStatus(Help.displayText(Farmer.data.marital_status))
      setSpouse(Help.displayText(Farmer.data.spouse))
      setTotalChildren(Help.displayNumber(Farmer.data.total_children))
      setAddressProvince(Help.displayText(Farmer.data.address_province))
      setAddressMunicipality(Help.displayText(Farmer.data.address_municipality))
      setAddressBarangay(Help.displayText(Farmer.data.address_barangay))
      setAddressPurok(Help.displayText(Farmer.data.address_purok))
      setAddressStreet(Help.displayText(Farmer.data.address_street))
      setRecordedAt(Help.displayDate(Farmer.data.recorded_at))
      setUpdatedAt(Help.displayDateTime(Farmer.data.updated_at))
      setLastUpdatedBy(Help.displayText(Farmer.data.last_updated_by))
    }

    return () => setStatus('loading')
  }, [Farmer.loading, Farmer.error, Farmer.data])

  // DELETE FARMER
  function deleteFarmer() {
    const URL = process.env.BASE_URL + '/farmers/' + ROUTE.farmer_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    confirmAlert({
      title: 'Delete Farmer Record',
      message: 'This farmer record will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            axios
              .delete(URL, CONFIG)
              .then((response) => {
                if (response.status === 204) {
                  setStatus('success')
                  toast.success('Farmer record has been deleted')
                  navigate('/farmers/records', { replace: true })
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

  return (
    <Authorization permissions={Account.permissions} permission="read_farmer">
      {/* {status === 'success' && (
        <VicinityChecker
          accountVicinity={Help.displayTags([Account.vicinity_province, Account.vicinity_municipality, Account.vicinity_barangay])}
          recordAddress={Help.displayTags([User.data?.vicinity_province, User.data?.vicinity_municipality, User.data?.vicinity_barangay])}
        />
      )} */}
      <PageContent status={status}>
        <FadeAnimation>
          <PaperView>
            <SectionHeader bigTitle="Farmer Information" description={`DATE OF FARM VISIT: ${recorded_at}`}>
              <CSVLink
                filename="FARMER.csv"
                data={[{ ...Farmer.data }] || []}
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
                <ButtonIcon status={status} title="Download farmer information">
                  <Download20 />
                </ButtonIcon>
              </CSVLink>
              <ButtonIcon
                onClick={() => navigate('/farmers/records/' + ROUTE.farmer_id + '/edit')}
                permission="write_farmer"
                permissions={Account.permissions}
                status={status}
                title="Edit farmer information">
                <Edit20 />
              </ButtonIcon>
              <ButtonIcon
                onClick={deleteFarmer}
                permission="write_farmer"
                permissions={Account.permissions}
                status={status}
                title="Delete farmer information">
                <TrashCan20 />
              </ButtonIcon>
              <ButtonIcon color="red" onClick={() => navigate('/farmers/records', { replace: true })} status={status} title="Close">
                <Close20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionHeader title="1. Personal Information" />
            <SectionBody>
              <Field label="Name" status={status} text={name} />
              <Field label="Birthday" status={status} text={birthday} />
              <Field label="Age" status={status} text={age} />
              <Field label="Sex" status={status} text={sex} />
              <Field label="Marital Status" status={status} text={marital_status} />
              <Field label="Main Livelihood" status={status} text={employment} />
            </SectionBody>
            <SectionBody>
              <Field label="Spouse Name" status={status} text={spouse} />
              <Field label="Total Children" status={status} text={total_children} />
            </SectionBody>
            <SectionHeader title="2. Residential Address" />
            <SectionBody>
              <Field label="Region" status={status} text="02" />
              <Field label="Province" status={status} text={address_province} />
              <Field label="Municipality" status={status} text={address_municipality} />
            </SectionBody>
            <SectionBody>
              <Field label="Barangay" status={status} text={address_barangay} />
              <Field label="Purok" status={status} text={address_purok} />
              <Field label="Street" status={status} text={address_street} />
            </SectionBody>
            <SectionHeader title="3. Residential Location" />
            <SectionBody>
              <Field label="Latitude" status={status} text={name} />
              <Field label="Longitude" status={status} text={name} />
            </SectionBody>
            <SectionBody>
              <div id="farmer-map" className="map-container-farmer" />
            </SectionBody>
            <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
          </PaperView>

          <PaperView>
            <SectionHeader bigTitle="Farm Records">
              <CSVLink
                filename="FARMERS.csv"
                data={[{ ...Farmer.data }] || []}
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
                <ButtonIcon status={status} title="Download farm records">
                  <Download20 />
                </ButtonIcon>
              </CSVLink>
              <ButtonIcon status={status}>
                <Add20 /> Add Farm Record
              </ButtonIcon>
            </SectionHeader>
          </PaperView>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerInformation
