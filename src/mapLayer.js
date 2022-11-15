export default mapLayer = {
  cluster: function (map, name, color) {
    map.addLayer({
      id: name + '-cluster-layer',
      type: 'circle',
      source: name + '-src',
      filter: ['has', 'point_count'],
      paint: {
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': ['step', ['get', 'point_count'], '#FFFFFF', 100, '#FFFFFF', 750, '#FFFFFF'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
        'circle-stroke-color': color,
        'circle-stroke-width': 5
      }
    })
  },
  clusterCount: function (map, name) {
    map.addLayer({
      id: name + '-cluster-count-layer',
      type: 'symbol',
      source: name + '-src',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    })
  },
  unclusteredPoint: function (map, name, icon_image) {
    map.addLayer({
      'id': name + '-unclustered-point-layer',
      'type': 'symbol',
      'source': name + '-src',
      'filter': ['!', ['has', 'point_count']],
      'layout': { 'icon-image': icon_image }
    })
  }
}
