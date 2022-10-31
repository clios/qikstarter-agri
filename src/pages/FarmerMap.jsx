import 'leaflet.bigimage'

import { DPI, Format, MapboxExportControl, PageOrientation, Size } from '@watergis/mapbox-gl-export'
import { Filter20, Printer20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import L from 'leaflet'
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher'
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'
import flood_high from '../geojson/flood_high.geojson'
import flood_low from '../geojson/flood_low.geojson'
import flood_moderate from '../geojson/flood_moderate.geojson'
import flood_very_high from '../geojson/flood_very_high.geojson'
import landslide_high from '../geojson/landslide_high.geojson'
import landslide_low from '../geojson/landslide_low.geojson'
import landslide_moderate from '../geojson/landslide_moderate.geojson'
import landslide_very_high from '../geojson/landslide_very_high.geojson'
import mapboxgl from 'mapbox-gl'

// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.prewarm()

// DEFAULT VIEW LOCATION AND ZOOM LEVEL
const DEFAULT_VIEW_LOCATION = [16.523711, 121.516725]
const DEFAULT_ZOOM_LEVEL = 10

function FarmerMap() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [display, setDisplay] = React.useState(false)
  const [map, setMap] = React.useState(false)
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

  React.useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [121.516725, 16.523711],
        zoom: 9
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

      map.on('load', () => {
        map.addSource('landslide_high', {
          'type': 'geojson',
          'data': landslide_high
        })
        map.addLayer({
          'id': 'landslide_high',
          'type': 'fill',
          'source': 'landslide_high',
          'layout': {},
          'paint': {
            'fill-color': '#DF9C20',
            'fill-opacity': 0.5
          }
        })

        map.addSource('landslide_moderate', {
          'type': 'geojson',
          'data': landslide_moderate
        })
        map.addLayer({
          'id': 'landslide_moderate',
          'type': 'fill',
          'source': 'landslide_moderate',
          'layout': {},
          'paint': {
            'fill-color': '#DFDF20',
            'fill-opacity': 0.5
          }
        })

        map.addSource('landslide_low', {
          'type': 'geojson',
          'data': landslide_low
        })
        map.addLayer({
          'id': 'landslide_low',
          'type': 'fill',
          'source': 'landslide_low',
          'layout': {},
          'paint': {
            'fill-color': '#20DF20',
            'fill-opacity': 0.5
          }
        })
      })

      map.on('styledata', () => {
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
  }, [map])

  return (
    <Authorization permissions={Account.permissions} permission="read_farm">
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
          <div id="map" className="map-container" />
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerMap
