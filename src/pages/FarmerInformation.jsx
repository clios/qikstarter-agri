import { Add20, Close20, Download20, Edit16, Edit20, TrashCan16, TrashCan20, View16 } from '@carbon/icons-react'
import { DPI, Format, MapboxExportControl, PageOrientation, Size } from '@watergis/mapbox-gl-export'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Help from '../Help'
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import SubSection from '../components/SubSection'
import SubSectionHeader from '../components/SubSectionHeader'
import Toggle from '../fragments/FarmerInformation/Toggle'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import getFarmerById from '../api/getFarmerById'
import getFarms from '../api/getFarms'
import mapMarker from '../mapMarker'
import mapboxgl from 'mapbox-gl'
import { toast } from 'react-toastify'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.prewarm()

function FarmerInformation() {
  // SEND GET FARMER AND FARM REQUEST
  const ROUTE = useParams()
  const Farmer = getFarmerById(ROUTE.farmer_id)
  const Farms = getFarms({ resident_id: ROUTE.farmer_id })

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [map, setMap] = React.useState(null)

  // NEW FARMER RECORD FORM -----------------------------------------------|
  const [recorded_at, setRecordedAt] = React.useState('')
  // 1. PERSONAL INFORMATION
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [age, setAge] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [employment, setEmployment] = React.useState('')
  const [spouse, setSpouse] = React.useState('')
  const [total_children, setTotalChildren] = React.useState('')
  // 2. RESIDENTIAL ADDRESS
  const address_region = '02'
  const [address_province, setAddressProvince] = React.useState('')
  const [address_municipality, setAddressMunicipality] = React.useState('')
  const [address_barangay, setAddressBarangay] = React.useState('')
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  // 3. RESIDENTIAL LOCATION
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')
  // FORM FOOTER
  const [last_updated_by, setLastUpdatedBy] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')
  // ----------------------------------------------------------------------|

  // ON RENDER, REVALIDATE FARMER AND CREATE MAP
  React.useEffect(() => {
    setMap(
      new mapboxgl.Map({
        center: [121.516725, 16.523711],
        container: 'farmer-map',
        cooperativeGestures: true,
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 16
      })
    )
  }, [])

  // AFTER CREATING MAP, ADD CONTROLS
  React.useEffect(() => {
    if (map) {
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }))
      map.addControl(new mapboxgl.FullscreenControl())
      map.addControl(new MapboxStyleSwitcherControl())
      map.addControl(
        new MapboxExportControl({
          PageSize: Size.A4,
          PageOrientation: PageOrientation.Portrait,
          Format: Format.PNG,
          DPI: DPI[96],
          Crosshair: true,
          PrintableArea: true,
          accessToken: process.env.MAPBOX_ACCESS_TOKEN
        })
      )

      map.on('idle', () => {
        map.resize()
      })
    }
  }, [map])

  React.useEffect(() => {
    if (map && Farmer.data) {
      let lat = Farmer.data.address_latitude
      let lng = Farmer.data.address_longitude

      map.flyTo({ center: [lng, lat] })

      map.on('styledata', () => {
        !map.hasImage('pulsing-dot') && map.addImage('pulsing-dot', mapMarker(100, map), { pixelRatio: 2 })

        if (!map.getSource('dot-point')) {
          map.addSource('dot-point', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [lng, lat] // icon position [lng, lat]
              }
            }
          })
        } else {
          map.getSource('dot-point').setData({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [lng, lat] // icon position [lng, lat]
            }
          })
        }

        !map.getLayer('layer-with-pulsing-dot') &&
          map.addLayer({
            'id': 'layer-with-pulsing-dot',
            'type': 'symbol',
            'source': 'dot-point',
            'layout': {
              'icon-image': 'pulsing-dot'
            }
          })

        !map.getSource('mapbox-dem') &&
          map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          })

        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2 })

        // add sky styling with `setFog` that will show when the map is highly pitched
        map.setFog({
          'horizon-blend': 0.3,
          'color': '#f8f0e3',
          'high-color': '#add8e6',
          'space-color': '#d8f2ff',
          'star-intensity': 0.0
        })
      })
    }
  }, [map, Farmer.data])

  // ON FETCH FARMER
  React.useEffect(() => {
    if (Farmer.loading) setStatus('loading')
    if (Farmer.error) setStatus('error')

    if (Farmer.data) {
      setStatus('success')
      let f = Farmer.data
      setRecordedAt(Help.displayDate(f.recorded_at))
      setName(Help.displayText(f.name))
      setBirthday(Help.displayDate(f.birthday))
      setAge(Help.displayNumber(f.age))
      setSex(Help.displayText(f.sex))
      setMaritalStatus(Help.displayText(f.marital_status))
      setEmployment(Help.displayText(f.employment))
      setSpouse(Help.displayText(f.spouse))
      setTotalChildren(Help.displayNumber(f.total_children))
      setAddressProvince(Help.displayText(f.address_province))
      setAddressMunicipality(Help.displayText(f.address_municipality))
      setAddressBarangay(Help.displayText(f.address_barangay))
      setAddressPurok(Help.displayText(f.address_purok))
      setAddressStreet(Help.displayText(f.address_street))
      setAddressLatitude(Help.displayNumber(f.address_latitude))
      setAddressLongitude(Help.displayNumber(f.address_longitude))
      setLastUpdatedBy(Help.displayText(f.last_updated_by))
      setUpdatedAt(Help.displayDateTime(f.updated_at))
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

  // DELETE FARM
  function deleteFarm(farm_id) {
    const URL = process.env.BASE_URL + '/farms/' + farm_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    confirmAlert({
      title: 'Delete Farm Record',
      message: 'This farm record will be permanently lost and you will not be able to recover it.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            axios
              .delete(URL, CONFIG)
              .then((response) => {
                if (response.status === 204) {
                  setStatus('success')
                  toast.success('Farm record has been deleted')
                  Farms.mutate()
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
              <Field label="Region" status={status} text={address_region} />
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
              <Field label="Latitude" status={status} text={address_latitude} />
              <Field label="Longitude" status={status} text={address_longitude} />
            </SectionBody>
            <SectionBody>
              <div id="farmer-map" className="map-container-farmer" />
            </SectionBody>
            <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
          </PaperView>

          {Help.checkPermission(Account.permissions, 'read_farm') && (
            <PaperView>
              <SectionHeader bigTitle="Farm Records">
                <CSVLink
                  filename="FARMERS.csv"
                  data={[{ ...Farmer.data }] || []}
                  headers={[
                    { label: 'ID', key: 'id' },
                    { label: 'Date Created', key: 'created_at' },
                    { label: 'Date Updated', key: 'updated_at' }
                  ]}>
                  <ButtonIcon status={status} title="Download farm records">
                    <Download20 />
                  </ButtonIcon>
                </CSVLink>
                <ButtonIcon
                  onClick={() => navigate(`/farmers/records/${ROUTE.farmer_id}/farms/add`, { replace: true })}
                  permission="write_farm"
                  permissions={Account.permissions}
                  status={status}>
                  <Add20 /> Add Farm Record
                </ButtonIcon>
              </SectionHeader>
              {status === 'success' &&
                Farms.data?.records.map((item, index) => {
                  return (
                    <SubSection
                      key={index}
                      title={`FARM ID: ${item.id}`}
                      buttons={
                        <React.Fragment>
                          <ButtonIcon
                            onClick={() => navigate(`/farmers/records/${ROUTE.farmer_id}/farms/${item.id}/edit`, { replace: true })}
                            permission="write_farm"
                            permissions={Account.permissions}
                            status={status}
                            title="Edit farm information">
                            <Edit16 />
                          </ButtonIcon>
                          <ButtonIcon
                            onClick={() => deleteFarm(item.id)}
                            permission="write_farm"
                            permissions={Account.permissions}
                            status={status}
                            title="Delete farm information">
                            <TrashCan16 />
                          </ButtonIcon>
                        </React.Fragment>
                      }>
                      <SubSectionHeader title="1. Ownership" />
                      <SectionBody>
                        <Field label="Owned" status={status}>
                          <Toggle available={item.ownership === 'owned'} />
                        </Field>
                        <Field label="Tenant" status={status}>
                          <Toggle available={item.ownership === 'tenanted'} />
                        </Field>
                      </SectionBody>
                      <SubSectionHeader title="2. Farm Address" />
                      <SectionBody>
                        <Field label="Region" status={status} text={address_region} />
                        <Field label="Province" status={status} text={Help.displayText(item.address_province)} />
                        <Field label="Municipality" status={status} text={Help.displayText(item.address_municipality)} />
                        <Field label="Barangay" status={status} text={Help.displayText(item.address_barangay)} />
                        <Field label="Purok" status={status} text={Help.displayText(item.address_purok)} />
                        <Field label="Street" status={status} text={Help.displayText(item.address_street)} />
                      </SectionBody>
                      <SubSectionHeader title="3. Farm Location" />
                      <SectionBody>
                        <Field label="Latitude" status={status} text={Help.displayNumber(item.address_latitude)} />
                        <Field label="Longitude" status={status} text={Help.displayNumber(item.address_longitude)} />
                      </SectionBody>
                      <SubSectionHeader title="4. Farming Activity" />
                      <SectionBody>
                        <Field label="Rice" status={status}>
                          <Toggle available={item.rice_area > 0} />
                        </Field>
                        <Field label="Corn" status={status}>
                          <Toggle available={item.corn_area > 0} />
                        </Field>
                        <Field label="High Value Crops" status={status}>
                          <Toggle available={item.hvc_area > 0} />
                        </Field>
                        <Field label="Livestock" status={status}>
                          <Toggle
                            available={
                              item.livestock_carabaos + item.livestock_cattles + item.livestock_goats + item.livestock_pigs + item.livestock_sheeps >
                              0
                            }
                          />
                        </Field>
                        <Field label="Poultry" status={status}>
                          <Toggle available={item.poultry_chickens + item.poultry_ducks + item.poultry_gooses + item.poultry_turkeys > 0} />
                        </Field>
                        <Field label="Fish Pond" status={status}>
                          <Toggle available={item.fishery_area + item.fishery_fingerlings > 0} />
                        </Field>
                      </SectionBody>
                      <SubSectionHeader title="4.1 Rice Area (ha)" />
                      <SectionBody>
                        <Field label="Irrigated" status={status} text="NOT FOUND" />
                        <Field label="Rainfed" status={status} text="NOT FOUND" />
                        <Field label="Upland" status={status} text="NOT FOUND" />
                        <Field label="Total Rice Area" status={status} text={item.rice_area} />
                      </SectionBody>
                      <SubSectionHeader title="4.2 Corn Area (ha)" />
                      <SectionBody>
                        <Field label="Lower Vega" status={status} text="NOT FOUND" />
                        <Field label="Upper Vega" status={status} text="NOT FOUND" />
                        <Field label="Broad Plain" status={status} text="NOT FOUND" />
                        <Field label="Hilly Areas" status={status} text="NOT FOUND" />
                        <Field label="Total Corn Area" status={status} text={item.corn_area} />
                      </SectionBody>
                      <SubSectionHeader title="4.3 High Value Crops Area (ha)" />
                      <SectionBody>
                        <Field label="Banana" status={status} text={item.hvc_banana_area} />
                        <Field label="Cacao" status={status} text={item.hvc_cacao_area} />
                        <Field label="Coffee" status={status} text={item.hvc_coffee_area} />
                        <Field label="Fruit Trees" status={status} text={item.hvc_fruit_tree_area} />
                        <Field label="Root Crops" status={status} text={item.hvc_root_crop_area} />
                        <Field label="Spices" status={status} text={item.hvc_spice_area} />
                        <Field label="Vegetables" status={status} text={item.hvc_vegetable_area} />
                        <Field label="Total HVC Area" status={status} text={item.hvc_area} />
                      </SectionBody>
                      <SubSectionHeader title="4.4 Livestock (head)" />
                      <SectionBody>
                        <Field label="Carabao" status={status} text={item.livestock_carabaos} />
                        <Field label="Cattle" status={status} text={item.livestock_cattles} />
                        <Field label="Goat" status={status} text={item.livestock_goats} />
                        <Field label="Pig" status={status} text={item.livestock_pigs} />
                        <Field label="Sheep" status={status} text={item.livestock_sheeps} />
                      </SectionBody>
                      <SubSectionHeader title="4.5 Poultry (head)" />
                      <SectionBody>
                        <Field label="Chickens" status={status} text={item.poultry_chickens} />
                        <Field label="Ducks" status={status} text={item.poultry_ducks} />
                        <Field label="Gooses" status={status} text={item.poultry_gooses} />
                        <Field label="Turkeys" status={status} text={item.poultry_turkeys} />
                      </SectionBody>
                      <SubSectionHeader title="4.6 Fish Pond" />
                      <SectionBody>
                        <Field label="Total Area (sqm)" status={status} text={item.fishery_area} />
                        <Field label="Qty. of Fingerlings (pcs)" status={status} text={item.fishery_fingerlings} />
                      </SectionBody>
                      <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
                    </SubSection>
                  )
                })}
            </PaperView>
          )}
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerInformation
