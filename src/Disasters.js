import flood_high from './geojson/flood_high.geojson'
import flood_low from './geojson/flood_low.geojson'
import flood_moderate from './geojson/flood_moderate.geojson'
import flood_very_high from './geojson/flood_very_high.geojson'
import landslide_high from './geojson/landslide_high.geojson'
import landslide_low from './geojson/landslide_low.geojson'
import landslide_moderate from './geojson/landslide_moderate.geojson'
import landslide_very_high from './geojson/landslide_very_high.geojson'

export default Disasters = {
  landslide: {
    veryHigh: function (map) {
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
    },
    high: function (map) {
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
    },
    moderate: function (map) {
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
    },
    low: function (map) {
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
    }
  },
  flood: {
    veryHigh: function (map) {
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
    },
    high: function (map) {
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
    },
    moderate: function (map) {
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
    },
    low: function (map) {
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
    }
  }
}
