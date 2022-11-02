import { Add20, Close20, Download20, Edit16, Edit20, SettingsView20, TrashCan16, TrashCan20, View16 } from '@carbon/icons-react'
import { DPI, Format, MapboxExportControl, PageOrientation, Size } from '@watergis/mapbox-gl-export'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import Checkbox from '../components/Checkbox'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Help from '../Help'
import PageContent from '../components/PageContent'
import PaperView from '../components/PaperView'
import React from 'react'
import SearchBox from '../components/SearchBox'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import SubSection from '../components/SubSection'
import SubSectionHeader from '../components/SubSectionHeader'
import Toggle from '../fragments/FarmerInformation/Toggle'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import flood_high from '../geojson/flood_high.geojson'
import flood_low from '../geojson/flood_low.geojson'
import flood_moderate from '../geojson/flood_moderate.geojson'
import flood_very_high from '../geojson/flood_very_high.geojson'
import getFarmerById from '../api/getFarmerById'
import getFarms from '../api/getFarms'
import landslide_high from '../geojson/landslide_high.geojson'
import landslide_low from '../geojson/landslide_low.geojson'
import landslide_moderate from '../geojson/landslide_moderate.geojson'
import landslide_very_high from '../geojson/landslide_very_high.geojson'
import mapMarker from '../mapMarker'
import mapboxgl from 'mapbox-gl'
import { toast } from 'react-toastify'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.prewarm()

function FarmerInformation() {
  // SEND GET FARMER AND FARM REQUEST
  const ROUTE = useParams()
  const Farmer = getFarmerById(ROUTE.farmer_id)
  const Farms = getFarms({ farmer_id: ROUTE.farmer_id })

  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [map, setMap] = React.useState(null)
  const [display, setDisplay] = React.useState(false)
  const [landslide_very_high_filter, setLandslideVeryHighFilter] = React.useState(false)
  const [landslide_high_filter, setLandslideHighFilter] = React.useState(false)
  const [landslide_moderate_filter, setLandslideModerateFilter] = React.useState(false)
  const [landslide_low_filter, setLandslideLowFilter] = React.useState(false)
  const [flood_very_high_filter, setFloodVeryHighFilter] = React.useState(false)
  const [flood_high_filter, setFloodHighFilter] = React.useState(false)
  const [flood_moderate_filter, setFloodModerateFilter] = React.useState(false)
  const [flood_low_filter, setFloodLowFilter] = React.useState(false)

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
        center: [121.647584, 16.323105],
        container: 'farmer-map',
        cooperativeGestures: true,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        zoom: 8
      })
    )
  }, [])

  // AFTER CREATING MAP, ADD CONTROLS
  React.useEffect(() => {
    if (map) {
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }))
      map.addControl(new mapboxgl.FullscreenControl())
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
    }
  }, [map])

  // ON LOAD FARMER DATA
  React.useEffect(() => {
    if (map && Farmer.data) {
      let lat = Farmer.data.address_latitude
      let lng = Farmer.data.address_longitude
      map.resize()

      // HAS COORDINATES
      if (lat && lng) {
        map.jumpTo({ center: [lng, lat], zoom: 17 })

        // ON LOAD OF STYLE DATA
        map.on('load', () => {
          // DIGITAL ELEVATION MODEL
          if (!map.getSource('mapbox-dem-src')) {
            map.addSource('mapbox-dem-src', { 'type': 'raster-dem', 'url': 'mapbox://mapbox.mapbox-terrain-dem-v1', 'tileSize': 512, 'maxzoom': 14 })
            map.setTerrain({ 'source': 'mapbox-dem-src', 'exaggeration': 2 })
            map.setFog({ 'horizon-blend': 0.3, 'color': '#f8f0e3', 'high-color': '#add8e6', 'space-color': '#d8f2ff', 'star-intensity': 0.0 })
          }

          // FARMER COORDINATES
          if (!map.getSource('farmer-coordinates-src')) {
            map.addSource('farmer-coordinates-src', {
              'type': 'geojson',
              'data': { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [lng, lat] } }
            })
            map.addImage('farmer-mark', mapMarker(100, map), { pixelRatio: 2 })
            map.addLayer({ 'id': 'farmer-layer', 'type': 'symbol', 'source': 'farmer-coordinates-src', 'layout': { 'icon-image': 'farmer-mark' } })
          } else {
            map.getSource('farmer-coordinates-src').setData({ 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [lng, lat] } })
          }

          // LANDSLIDE VERY HIGH SUSCEPTIBILITY
          if (!map.getSource('landslide_very_high_src')) {
            map.addSource('landslide_very_high_src', { 'type': 'geojson', 'data': landslide_very_high })
            map.addLayer({
              'id': 'landslide_very_high_layer',
              'source': 'landslide_very_high_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DF2020', 'fill-opacity': 0.5 }
            })
          }

          // LANDSLIDE HIGH SUSCEPTIBILITY
          if (!map.getSource('landslide_high_src')) {
            map.addSource('landslide_high_src', { 'type': 'geojson', 'data': landslide_high })
            map.addLayer({
              'id': 'landslide_high_layer',
              'source': 'landslide_high_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DF9C20', 'fill-opacity': 0.5 }
            })
          }

          // LANDSLIDE MODERATE SUSCEPTIBILITY
          if (!map.getSource('landslide_moderate_src')) {
            map.addSource('landslide_moderate_src', { 'type': 'geojson', 'data': landslide_moderate })
            map.addLayer({
              'id': 'landslide_moderate_layer',
              'source': 'landslide_moderate_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DFDF20', 'fill-opacity': 0.5 }
            })
          }

          // LANDSLIDE LOW SUSCEPTIBILITY
          if (!map.getSource('landslide_low_src')) {
            map.addSource('landslide_low_src', { 'type': 'geojson', 'data': landslide_low })
            map.addLayer({
              'id': 'landslide_low_layer',
              'source': 'landslide_low_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#20DF20', 'fill-opacity': 0.5 }
            })
          }

          // FLOOD VERY HIGH SUSCEPTIBILITY
          if (!map.getSource('flood_very_high_src')) {
            map.addSource('flood_very_high_src', { 'type': 'geojson', 'data': flood_very_high })
            map.addLayer({
              'id': 'flood_very_high_layer',
              'source': 'flood_very_high_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DF2020', 'fill-opacity': 0.5 }
            })
          }

          // FLOOD HIGH SUSCEPTIBILITY
          if (!map.getSource('flood_high_src')) {
            map.addSource('flood_high_src', { 'type': 'geojson', 'data': flood_high })
            map.addLayer({
              'id': 'flood_high_layer',
              'source': 'flood_high_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DF9C20', 'fill-opacity': 0.5 }
            })
          }

          // FLOOD MODERATE SUSCEPTIBILITY
          if (!map.getSource('flood_moderate_src')) {
            map.addSource('flood_moderate_src', { 'type': 'geojson', 'data': flood_moderate })
            map.addLayer({
              'id': 'flood_moderate_layer',
              'source': 'flood_moderate_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#DFDF20', 'fill-opacity': 0.5 }
            })
          }

          // FLOOD LOW SUSCEPTIBILITY
          if (!map.getSource('flood_low_src')) {
            map.addSource('flood_low_src', { 'type': 'geojson', 'data': flood_low })
            map.addLayer({
              'id': 'flood_low_layer',
              'source': 'flood_low_src',
              'type': 'fill',
              'layout': { 'visibility': 'none' },
              'paint': { 'fill-color': '#20DF20', 'fill-opacity': 0.5 }
            })
          }
        })
      } else {
        map.on('load', () => {
          if (map.getSource('farmer-coordinates-src')) {
            map.jumpTo({ center: [121.647584, 16.323105], zoom: 8 })
            map.getLayer('farmer-layer') && map.setLayoutProperty('farmer-layer', 'visibility', 'none')
          }
        })
      }
    }
  }, [map, Farmer.data])

  React.useEffect(() => {
    if (map) {
      if (map.getLayer('landslide_very_high_layer')) {
        map.setLayoutProperty('landslide_very_high_layer', 'visibility', landslide_very_high_filter ? 'visible' : 'none')
      }
      if (map.getLayer('landslide_high_layer')) {
        map.setLayoutProperty('landslide_high_layer', 'visibility', landslide_high_filter ? 'visible' : 'none')
      }
      if (map.getLayer('landslide_moderate_layer')) {
        map.setLayoutProperty('landslide_moderate_layer', 'visibility', landslide_moderate_filter ? 'visible' : 'none')
      }
      if (map.getLayer('landslide_low_layer')) {
        map.setLayoutProperty('landslide_low_layer', 'visibility', landslide_low_filter ? 'visible' : 'none')
      }
      if (map.getLayer('flood_very_high_layer')) {
        map.setLayoutProperty('flood_very_high_layer', 'visibility', flood_very_high_filter ? 'visible' : 'none')
      }
      if (map.getLayer('flood_high_layer')) {
        map.setLayoutProperty('flood_high_layer', 'visibility', flood_high_filter ? 'visible' : 'none')
      }
      if (map.getLayer('flood_moderate_layer')) {
        map.setLayoutProperty('flood_moderate_layer', 'visibility', flood_moderate_filter ? 'visible' : 'none')
      }
      if (map.getLayer('flood_low_layer')) {
        map.setLayoutProperty('flood_low_layer', 'visibility', flood_low_filter ? 'visible' : 'none')
      }
    }
  }, [
    map,
    landslide_low_filter,
    landslide_moderate_filter,
    landslide_very_high_filter,
    landslide_high_filter,
    flood_low_filter,
    flood_moderate_filter,
    flood_very_high_filter,
    flood_high_filter
  ])

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
            <SectionHeader title="3. Residential Location">
              <ButtonIcon onClick={() => setDisplay(!display)} title="Toggle hazard areas">
                <SettingsView20 />
              </ButtonIcon>
            </SectionHeader>
            <SearchBox className={display ? 'display' : 'hidden'}>
              <FormRow>
                <Field label="Landslide Prone" status={status}>
                  <Checkbox
                    checked={landslide_very_high_filter}
                    onChange={(e) => setLandslideVeryHighFilter(e.target.checked)}
                    text="Very High Susceptibility"
                  />
                </Field>
                <Field label="Landslide Prone" status={status}>
                  <Checkbox checked={landslide_high_filter} onChange={(e) => setLandslideHighFilter(e.target.checked)} text="High Susceptibility" />
                </Field>
                <Field label="Landslide Prone" status={status}>
                  <Checkbox
                    checked={landslide_moderate_filter}
                    onChange={(e) => setLandslideModerateFilter(e.target.checked)}
                    text="Moderate Susceptibility"
                  />
                </Field>
                <Field label="Landslide Prone" status={status}>
                  <Checkbox checked={landslide_low_filter} onChange={(e) => setLandslideLowFilter(e.target.checked)} text="Low Susceptibility" />
                </Field>
              </FormRow>
              <FormRow>
                <Field label="Flood Prone" status={status}>
                  <Checkbox
                    checked={flood_very_high_filter}
                    onChange={(e) => setFloodVeryHighFilter(e.target.checked)}
                    text="Very High Susceptibility"
                  />
                </Field>
                <Field label="Flood Prone" status={status}>
                  <Checkbox checked={flood_high_filter} onChange={(e) => setFloodHighFilter(e.target.checked)} text="High Susceptibility" />
                </Field>
                <Field label="Flood Prone" status={status}>
                  <Checkbox
                    checked={flood_moderate_filter}
                    onChange={(e) => setFloodModerateFilter(e.target.checked)}
                    text="Moderate Susceptibility"
                  />
                </Field>
                <Field label="Flood Prone" status={status}>
                  <Checkbox checked={flood_low_filter} onChange={(e) => setFloodLowFilter(e.target.checked)} text="Low Susceptibility" />
                </Field>
              </FormRow>
            </SearchBox>
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
