import 'leaflet.bigimage'

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
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'
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
  // const [map, setMap] = React.useState(false)
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
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [121.516725, 16.523711],
      zoom: 9
    })

    const navigation_control = new mapboxgl.NavigationControl({
      visualizePitch: true
    })
    map.addControl(navigation_control)

    const fullscreen_control = new mapboxgl.FullscreenControl()
    map.addControl(fullscreen_control)

    map.on('load', () => {
      // Add a data source containing GeoJSON data.
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745]
              ]
            ]
          }
        }
      })

      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      })
      // Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      })
    })
  }, [])

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
