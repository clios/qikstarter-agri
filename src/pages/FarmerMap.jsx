import { DPI, Format, MapboxExportControl, PageOrientation, Size } from '@watergis/mapbox-gl-export'
import { Filter20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import Disasters from '../Disasters'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Loader from '../components/Loader'
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'
import { confirmAlert } from 'react-confirm-alert'
import getFarmLocations from '../api/getFarmLocations'
import getFarmerLocations from '../api/getFarmerLocations'
import mapDEM from '../mapDEM'
import mapEvent from '../mapEvent'
import mapGeoJSON from '../mapGeoJSON'
import mapLayer from '../mapLayer'
import mapMarker from '../mapMarker'
import mapSource from '../mapSource'
import mapboxgl from 'mapbox-gl'
import { navigate } from '@reach/router'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.prewarm()

const FARMER_LOCATIONS = 'farmer-locations'
const FARMER_LOCATIONS_COLOR = '#20A8DF'
const FARM_LOCATIONS = 'farm-locations'
const FARM_LOCATIONS_COLOR = '#DF9C20'

function FarmerMap() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [display, setDisplay] = React.useState(false)
  const [map, setMap] = React.useState(false)

  // INPUT STATE
  const [farmer_locations_filter, setFarmerLocationsFilter] = React.useState(true)
  const [farm_locations_filter, setFarmLocationsFilter] = React.useState(true)
  const [census, setCensus] = React.useState(2022)
  const [address_province, setAddressProvince] = React.useState(Account.vicinity_province)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  // INPUT STATE: LANDSLIDE
  const [landslide_very_high_filter, setLandslideVeryHighFilter] = React.useState(false)
  const [landslide_high_filter, setLandslideHighFilter] = React.useState(false)
  const [landslide_moderate_filter, setLandslideModerateFilter] = React.useState(false)
  const [landslide_low_filter, setLandslideLowFilter] = React.useState(false)
  // INPUT STATE: FLOOD
  const [flood_very_high_filter, setFloodVeryHighFilter] = React.useState(false)
  const [flood_high_filter, setFloodHighFilter] = React.useState(false)
  const [flood_moderate_filter, setFloodModerateFilter] = React.useState(false)
  const [flood_low_filter, setFloodLowFilter] = React.useState(false)
  // INPUT STATE: PARAMS
  const [params, setParams] = React.useState({ census, address_province, address_municipality, address_barangay })

  // SEND GET FARMER AND FARM LOCATIONS REQUEST
  const FarmerLocations = getFarmerLocations(params)
  const FarmLocations = getFarmLocations(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (census !== '') newParams.census = census
    if (address_province !== '') newParams.address_province = address_province
    if (address_municipality !== '') newParams.address_municipality = address_municipality
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    setParams(newParams)
  }

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census, address_municipality, address_barangay])

  // ON GET FARMER LOCATIONS
  React.useEffect(() => {
    if (FarmerLocations.loading) setStatus('loading')
    if (FarmerLocations.error) setStatus('error')
    if (FarmerLocations.data) setStatus('success')
    return () => setStatus('loading')
  }, [FarmerLocations.loading, FarmerLocations.error, FarmerLocations.data])

  // ON GET FARM LOCATIONS
  React.useEffect(() => {
    if (FarmLocations.loading) setStatus('loading')
    if (FarmLocations.error) setStatus('error')
    if (FarmLocations.data) setStatus('success')
    return () => setStatus('loading')
  }, [FarmLocations.loading, FarmLocations.error, FarmLocations.data])

  // ON RENDER, REVALIDATE FARMER AND CREATE MAP
  React.useEffect(() => {
    setMap(
      new mapboxgl.Map({
        center: [121.647584, 16.323105],
        container: 'map',
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

  // ON LOAD FARMER AND FARM DATA
  React.useEffect(() => {
    setStatus('loading')
    if (map && FarmerLocations.data && FarmLocations.data) {
      map.resize()

      // CREATE FARMER GEOJSON
      const farmer_records = FarmerLocations.data.records
      const farmer_geojson = mapGeoJSON(map, FARMER_LOCATIONS, farmer_records, (item) => {
        return {
          'type': 'Feature',
          'geometry': { 'type': 'Point', 'coordinates': [item.longitude, item.latitude] },
          'properties': { 'id': item.id, 'name': item.name }
        }
      })

      // CREATE FARM GEOJSON
      const farm_records = FarmLocations.data.records
      const farm_geojson = mapGeoJSON(map, FARM_LOCATIONS, farm_records, (item) => {
        return {
          'type': 'Feature',
          'geometry': { 'type': 'Point', 'coordinates': [item.longitude, item.latitude] },
          'properties': { 'id': item.id, 'farmer_id': item.farmer_id, 'farmer_name': item.farmer_name }
        }
      })

      // ON LOAD
      map.on('load', () => {
        // DIGITAL ELEVATION MODEL
        mapDEM(map)

        // FARMER LOCATIONS
        map.addImage(FARMER_LOCATIONS, mapMarker(100, FARMER_LOCATIONS_COLOR, map), { pixelRatio: 2 })
        mapSource(map, FARMER_LOCATIONS, { type: 'geojson', data: farmer_geojson, cluster: true })
        mapLayer.cluster(map, FARMER_LOCATIONS, FARMER_LOCATIONS_COLOR)
        mapLayer.clusterCount(map, FARMER_LOCATIONS)
        mapLayer.unclusteredPoint(map, FARMER_LOCATIONS, FARMER_LOCATIONS)
        mapEvent.mouse(map, FARMER_LOCATIONS)
        mapEvent.clickCluster(map, FARMER_LOCATIONS)
        mapEvent.clickUnclusteredPoint(map, FARMER_LOCATIONS, (properties) => {
          confirmAlert({
            title: properties.name,
            message: `House Location`,
            buttons: [{ label: 'Go to records', onClick: () => navigate('/farmers/records/' + properties.id) }, { label: 'Close' }]
          })
        })

        // FARM LOCATIONS
        map.addImage(FARM_LOCATIONS, mapMarker(100, FARM_LOCATIONS_COLOR, map), { pixelRatio: 2 })
        mapSource(map, FARM_LOCATIONS, { type: 'geojson', data: farm_geojson, cluster: true })
        mapLayer.cluster(map, FARM_LOCATIONS, FARM_LOCATIONS_COLOR)
        mapLayer.clusterCount(map, FARM_LOCATIONS)
        mapLayer.unclusteredPoint(map, FARM_LOCATIONS, FARM_LOCATIONS)
        mapEvent.clickCluster(map, FARM_LOCATIONS)
        mapEvent.mouse(map, FARM_LOCATIONS)
        mapEvent.clickUnclusteredPoint(map, FARM_LOCATIONS, (properties) => {
          confirmAlert({
            title: properties.name,
            message: `Farm Location`,
            buttons: [{ label: 'Go to records', onClick: () => navigate('/farmers/records/' + properties.farmer_id) }, { label: 'Close' }]
          })
        })

        // ADD DISASTERS POLYGON ON MAP
        Disasters.landslide.veryHigh(map)
        Disasters.landslide.high(map)
        Disasters.landslide.moderate(map)
        Disasters.landslide.low(map)
        Disasters.flood.veryHigh(map)
        Disasters.flood.high(map)
        Disasters.flood.moderate(map)
        Disasters.flood.low(map)
      })

      map.on('idle', () => {
        setStatus('success')
      })
    }
  }, [map, FarmerLocations.data, FarmLocations.data])

  // ADD MAP LAYER TOGGLE
  React.useEffect(() => {
    if (map) {
      function toggleMapLayer(map, layer, filter) {
        if (map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', filter ? 'visible' : 'none')
      }

      toggleMapLayer(map, 'farmer-locations-cluster-layer', farmer_locations_filter)
      toggleMapLayer(map, 'farmer-locations-cluster-count-layer', farmer_locations_filter)
      toggleMapLayer(map, 'farmer-locations-unclustered-point-layer', farmer_locations_filter)

      toggleMapLayer(map, 'farm-locations-cluster-layer', farm_locations_filter)
      toggleMapLayer(map, 'farm-locations-cluster-count-layer', farm_locations_filter)
      toggleMapLayer(map, 'farm-locations-unclustered-point-layer', farm_locations_filter)

      toggleMapLayer(map, 'landslide_very_high_layer', landslide_very_high_filter)
      toggleMapLayer(map, 'landslide_high_layer', landslide_high_filter)
      toggleMapLayer(map, 'landslide_moderate_layer', landslide_moderate_filter)
      toggleMapLayer(map, 'landslide_low_layer', landslide_low_filter)
      toggleMapLayer(map, 'flood_very_high_layer', flood_very_high_filter)
      toggleMapLayer(map, 'flood_high_layer', flood_high_filter)
      toggleMapLayer(map, 'flood_moderate_layer', flood_moderate_filter)
      toggleMapLayer(map, 'flood_low_layer', flood_low_filter)
    }
  }, [
    map,
    farmer_locations_filter,
    farm_locations_filter,
    landslide_low_filter,
    landslide_moderate_filter,
    landslide_very_high_filter,
    landslide_high_filter,
    flood_low_filter,
    flood_moderate_filter,
    flood_very_high_filter,
    flood_high_filter
  ])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census, address_municipality, address_barangay])

  // REFRESH AND RESET TABLE
  function refreshLocations() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      FarmerLocations.mutate()
      FarmLocations.mutate()
    }, 500)
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_farmer">
      {status === 'loading' && <Loader />}
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
            <ButtonIcon label="Refresh" status={status} onClick={() => refreshLocations()}>
              <Reset20 />
            </ButtonIcon>
          </TableToolbar>
          <SearchBox className={display ? 'display' : 'hidden'}>
            <FormRow>
              <Field label="Farmer Locations" status={status}>
                <Checkbox checked={farmer_locations_filter} onChange={(e) => setFarmerLocationsFilter(e.target.checked)} text="Display" />
              </Field>
              <Field label="Farm Locations" status={status}>
                <Checkbox checked={farm_locations_filter} onChange={(e) => setFarmLocationsFilter(e.target.checked)} text="Display" />
              </Field>
            </FormRow>
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
            </FormRow>
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
                <Checkbox checked={flood_moderate_filter} onChange={(e) => setFloodModerateFilter(e.target.checked)} text="Moderate Susceptibility" />
              </Field>
              <Field label="Flood Prone" status={status}>
                <Checkbox checked={flood_low_filter} onChange={(e) => setFloodLowFilter(e.target.checked)} text="Low Susceptibility" />
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
