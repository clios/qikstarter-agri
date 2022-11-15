export default mapEvent = {
  clickCluster: function (map, name) {
    map.on('click', name + '-cluster-layer', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [name + '-cluster-layer']
      })
      const clusterId = features[0].properties.cluster_id
      map.getSource(name + '-src').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + 1
        })
      })
    })
  },
  clickUnclusteredPoint: function (map, name, fn) {
    map.on('click', name + '-unclustered-point-layer', (e) => {
      const id = e.features[0].properties.id
      const name = e.features[0].properties.name
      const coordinates = e.features[0].geometry.coordinates.slice()
      // ZOOM IN
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      fn(e.features[0].properties)
    })
  },
  mouse: function (map, name) {
    map.on('mouseenter', name + '-cluster-layer', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', name + '-cluster-layer', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseenter', name + '-unclustered-point-layer', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', name + '-unclustered-point-layer', () => {
      map.getCanvas().style.cursor = ''
    })
  }
}
