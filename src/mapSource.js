export default mapSource = function (map, name, data) {
  if (!map.getSource(name + '-src')) {
    map.addSource(name + '-src', data)
  }
}
