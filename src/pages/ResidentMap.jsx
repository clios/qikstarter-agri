import 'leaflet.bigimage'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import DashboardToolbar from '../components/DashboardToolbar'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import L from 'leaflet'
import PageContent from '../components/PageContent'
import React from 'react'
import Select from '../components/Select'

// MAP TILE LAYER URL TEMPLATE
const MAP_TILE_LAYER_URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

// MAP TILE LAYER OPTIONS
const MAP_TILE_LAYER_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
    'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/satellite-streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: process.env.MAPBOX_ACCESS_TOKEN
}

// DEFAULT VIEW LOCATION AND ZOOM LEVEL
const DEFAULT_VIEW_LOCATION = [16.523711, 121.516725]
const DEFAULT_ZOOM_LEVEL = 10

function ResidentMap() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [map, setMap] = React.useState(null)
  const [locations, setLocations] = React.useState([])

  // INPUT STATE
  const [municipality, Municipality] = React.useState('')
  const [barangay, Barangay] = React.useState('')
  const [purok, Purok] = React.useState('')
  const [street, Street] = React.useState('')

  // ON RENDER CREATE MAP
  React.useEffect(() => {
    setMap(L.map('map', { scrollWheelZoom: true }).setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL))
  }, [])

  // ON MAP CREATION, SET MAP TILE LAYER
  React.useEffect(() => {
    map && L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)
    map && L.control.BigImage().addTo(map)
  }, [map])

  return (
    <PageContent>
      <FadeAnimation>
        <DashboardToolbar>
          <Field label="Municipality" status={status}>
            <Select
              onChange={(e) => {
                Barangay('')
                Municipality(e.target.value)
              }}
              value={municipality}>
              <option value="">ALL MUNICIPALS</option>
              {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Barangay" status={status}>
            <Select onChange={(e) => Barangay(e.target.value)} value={barangay}>
              <option value="">ALL BARANGAYS</option>
              {Address.Barangays('02', 'QUIRINO', municipality).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Purok" status={status}>
            <Input onChange={(e) => Purok(e.target.value)} size={5} type="text" value={purok} />
          </Field>
          <Field label="Street" status={status}>
            <Input onChange={(e) => Street(e.target.value)} size={15} type="text" value={street} />
          </Field>
        </DashboardToolbar>
        <div id="map" className="map-container" />
      </FadeAnimation>
    </PageContent>
  )
}

export default ResidentMap
