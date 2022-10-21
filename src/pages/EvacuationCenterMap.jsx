import 'leaflet.bigimage'

import { Filter20, Printer20, Reset20 } from '@carbon/icons-react'

import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import ButtonIcon from '../components/ButtonIcon'
import DashboardToolbar from '../components/DashboardToolbar'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import L from 'leaflet'
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'

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

function EvacuationCenterMap() {
  // INFORMATION STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [display, setDisplay] = React.useState(false)
  const [map, setMap] = React.useState(null)
  const [locations, setLocations] = React.useState([])

  // INPUT STATE
  const [limit, setLimit] = React.useState(50)
  const [page, setPage] = React.useState(1)
  const [orders, setOrders] = React.useState('updated_at:desc')
  const [name, setName] = React.useState('')
  const [address_province, setAddressProvince] = React.useState(Account.vicinity_province)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ limit, page, orders })

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
        <TableToolbar>
          <ButtonIcon
            label="Filters"
            onClick={() => setDisplay(!display)}
            title={display ? 'Hide filter options' : 'Display more filter options'}
            status={status}>
            <Filter20 />
          </ButtonIcon>
          <ButtonIcon label="Refresh">
            <Reset20 />
          </ButtonIcon>
          <ButtonIcon label="Print">
            <Printer20 />
          </ButtonIcon>
        </TableToolbar>
        <SearchBox className={display ? 'display' : 'hidden'}>
          <FormRow>
            {/* {Account.vicinity_municipality === '' && ( */}
            <Field label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setAddressBarangay('')
                  setAddressMunicipality(e.target.value)
                }}
                value={address_municipality}>
                <option value="">ALL MUNICIPALS</option>
                {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            {/* )} */}
            {/* {Account.vicinity_barangay === '' && ( */}
            <Field label="Barangay" status={status}>
              <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                <option value="">ALL BARANGAYS</option>
                {Address.Barangays('02', 'QUIRINO', address_municipality).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            {/* )} */}
            <Field label="Order By" status={status}>
              <Select onChange={(e) => setOrders(e.target.value)} value={orders}>
                <option value="name:desc">NAME (DESC)</option>
                <option value="name:asc">NAME (ASC)</option>
                <option value="capacity:desc">CAPACITY (DESC)</option>
                <option value="capacity:asc">CAPACITY (ASC)</option>
                <option value="name:desc">DATE OCCURED (DESC)</option>
                <option value="name:asc">DATE OCCURED (ASC)</option>
              </Select>
            </Field>
          </FormRow>
        </SearchBox>
        {/* <DashboardToolbar>
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
        </DashboardToolbar> */}
        <div id="map" className="map-container" />
      </FadeAnimation>
    </PageContent>
  )
}

export default EvacuationCenterMap
