import address from './json/address.json'

export default Address = {
  Regions: () => {
    return Object.keys(address)
  },
  Provinces: (region) => {
    if (!region) return []
    return Object.keys(address[region].province_list)
  },
  Municipalities: (region, province) => {
    if (!region || !province) return []
    return Object.keys(address[region].province_list[province].municipality_list)
  },
  Barangays: (region, province, municipality) => {
    if (!region || !province || !municipality) return []
    return address[region].province_list[province].municipality_list[municipality].barangay_list
  }
}
