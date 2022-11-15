export default function mapGeoJSON(map, name, data, structure) {
  let geojson = { 'type': 'FeatureCollection', 'features': [] }
  data?.forEach((item) => geojson.features.push(structure(item)))
  if (map.getSource(name + '-src')) map.getSource(name + '-src').setData(geojson)
  return geojson
}
