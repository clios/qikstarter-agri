import 'leaflet.bigimage'

import { DPI, Format, MapboxExportControl, PageOrientation, Size } from '@watergis/mapbox-gl-export'
import { Filter20, Printer20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import L from 'leaflet'
import Loader from '../components/Loader'
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher'
import PageContent from '../components/PageContent'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'
import { confirmAlert } from 'react-confirm-alert'
import flood_high from '../geojson/flood_high.geojson'
import flood_low from '../geojson/flood_low.geojson'
import flood_moderate from '../geojson/flood_moderate.geojson'
import flood_very_high from '../geojson/flood_very_high.geojson'
import getFarmerLocations from '../api/getFarmerLocations'
import landslide_high from '../geojson/landslide_high.geojson'
import landslide_low from '../geojson/landslide_low.geojson'
import landslide_moderate from '../geojson/landslide_moderate.geojson'
import landslide_very_high from '../geojson/landslide_very_high.geojson'
import mapMarker from '../mapMarker'
import mapboxgl from 'mapbox-gl'
import { navigate } from '@reach/router'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.prewarm()

function FarmerMap() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [display, setDisplay] = React.useState(false)
  const [map, setMap] = React.useState(false)
  const [landslide_very_high_filter, setLandslideVeryHighFilter] = React.useState(false)
  const [landslide_high_filter, setLandslideHighFilter] = React.useState(false)
  const [landslide_moderate_filter, setLandslideModerateFilter] = React.useState(false)
  const [landslide_low_filter, setLandslideLowFilter] = React.useState(false)
  const [flood_very_high_filter, setFloodVeryHighFilter] = React.useState(false)
  const [flood_high_filter, setFloodHighFilter] = React.useState(false)
  const [flood_moderate_filter, setFloodModerateFilter] = React.useState(false)
  const [flood_low_filter, setFloodLowFilter] = React.useState(false)

  // INPUT STATE
  const [census, setCensus] = React.useState(2022)
  const [address_province, setAddressProvince] = React.useState(Account.vicinity_province)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ census, address_province, address_municipality, address_barangay })

  // SEND GET FARMER LOCATIONS REQUEST
  const FarmerLocations = getFarmerLocations(params)

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

  // ON LOAD FARMER DATA
  React.useEffect(() => {
    setStatus('loading')
    if (map && FarmerLocations.data) {
      map.resize()

      map.on('idle', () => {
        setStatus('success')
      })

      // CREATE FARMER GEOJSON
      let farmer_geojson = { 'type': 'FeatureCollection', 'features': [] }
      FarmerLocations.data.records?.forEach((f) =>
        farmer_geojson.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [f.longitude, f.latitude]
          },
          'properties': {
            'id': f.id,
            'name': f.name
          }
        })
      )

      // SET NEWLY UPDATED FARMER GEOJSON
      if (map.getSource('farmer-locations-src')) map.getSource('farmer-locations-src').setData(farmer_geojson)

      // ON LOAD OF STYLE DATA
      map.on('load', () => {
        // DIGITAL ELEVATION MODEL
        if (!map.getSource('mapbox-dem-src')) {
          map.addSource('mapbox-dem-src', { 'type': 'raster-dem', 'url': 'mapbox://mapbox.mapbox-terrain-dem-v1', 'tileSize': 512, 'maxzoom': 14 })
          map.setTerrain({ 'source': 'mapbox-dem-src', 'exaggeration': 2 })
          map.setFog({ 'horizon-blend': 0.3, 'color': '#f8f0e3', 'high-color': '#add8e6', 'space-color': '#d8f2ff', 'star-intensity': 0.0 })
        }

        if (!map.getSource('farmer-locations-src')) {
          map.addSource('farmer-locations-src', {
            type: 'geojson',
            data: farmer_geojson,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
          })
        }

        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'farmer-locations-src',
          filter: ['has', 'point_count'],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': ['step', ['get', 'point_count'], '#FFFFFF', 100, '#FFFFFF', 750, '#FFFFFF'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
            'circle-stroke-color': '#20A8DF',
            'circle-stroke-width': 5
          }
        })

        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'farmer-locations-src',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        })

        map.addImage('farmer-mark', mapMarker(100, map), { pixelRatio: 2 })
        map.addLayer({
          'id': 'unclustered-point',
          'type': 'symbol',
          'source': 'farmer-locations-src',
          'filter': ['!', ['has', 'point_count']],
          'layout': { 'icon-image': 'farmer-mark' }
        })

        // inspect a cluster on click
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          })
          const clusterId = features[0].properties.cluster_id
          map.getSource('farmer-locations-src').getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom + 1
            })
          })
        })

        // When a click event occurs on a feature in
        // the unclustered-point layer, open with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', (e) => {
          const id = e.features[0].properties.id
          const name = e.features[0].properties.name
          const coordinates = e.features[0].geometry.coordinates.slice()

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          confirmAlert({
            title: name,
            message: `Coordinates: [${coordinates[0]}, ${coordinates[1]}]`,
            buttons: [
              {
                label: 'Go to records',
                onClick: () => {
                  navigate('/farmers/records/' + id, { replace: true })
                }
              },
              { label: 'Close' }
            ]
          })
        })

        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = ''
        })
        map.on('mouseenter', 'unclustered-point', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'unclustered-point', () => {
          map.getCanvas().style.cursor = ''
        })

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
    }
  }, [map, FarmerLocations.data])

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

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census, address_municipality, address_barangay])

  // REFRESH AND RESET TABLE
  function refreshLocations() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      FarmerLocations.mutate()
    }, 500)
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_farm">
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
          </SearchBox>
          <div id="map" className="map-container" />
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerMap
