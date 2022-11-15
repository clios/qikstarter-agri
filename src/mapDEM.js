export default mapDEM = function (map) {
  if (!map.getSource('mapbox-dem-src')) {
    map.addSource('mapbox-dem-src', { 'type': 'raster-dem', 'url': 'mapbox://mapbox.mapbox-terrain-dem-v1', 'tileSize': 512, 'maxzoom': 14 })
    map.setTerrain({ 'source': 'mapbox-dem-src', 'exaggeration': 2 })
    map.setFog({ 'horizon-blend': 0.3, 'color': '#f8f0e3', 'high-color': '#add8e6', 'space-color': '#d8f2ff', 'star-intensity': 0.0 })
  }
}
