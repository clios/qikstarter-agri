import { Filter20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import CornArea from '../fragments/FarmerDashboard/CornArea'
import DashboardContent from '../components/DashboardContent'
import DashboardItem from '../components/DashboardItem'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Fishery from '../fragments/FarmerDashboard/Fishery'
import FormRow from '../components/FormRow'
import HighValueCrops from '../fragments/FarmerDashboard/HighValueCrops'
import HighValueCropsSubVariety from '../fragments/FarmerDashboard/HighValueCropsSubVariety'
import Livestock from '../fragments/FarmerDashboard/Livestock'
import PageContent from '../components/PageContent'
import PopulationPerAge from '../fragments/FarmerDashboard/PopulationPerAge'
import PopulationPerCivilStatus from '../fragments/FarmerDashboard/PopulationPerCivilStatus'
import Poultry from '../fragments/FarmerDashboard/Poultry'
import React from 'react'
import RiceArea from '../fragments/FarmerDashboard/RiceArea'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import TableToolbar from '../components/TableToolbar'
import TotalFarmers from '../fragments/FarmerDashboard/TotalFarmers'

function FarmerDashboard() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [display, setDisplay] = React.useState(false)

  // INPUT STATE
  const [census, setCensus] = React.useState(2022)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ census, address_municipality, address_barangay })

  // SEND GET FARMERS REQUEST
  // const FarmerDashboard = getFarmerDashboard(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (census !== '') newParams.census = census
    if (address_municipality !== '') newParams.address_municipality = address_municipality
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    setParams(newParams)
  }

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census, address_municipality, address_barangay])

  // ON GET FARMERS
  React.useEffect(() => {
    // if (FarmerDashboard.loading) setStatus('loading')
    // if (FarmerDashboard.error) setStatus('error')
    // if (FarmerDashboard.data) {
    setStatus('success')
    //   setTotalCount(FarmerDashboard.data?.total_count)
    // }
    // return () => setStatus('loading')
  }, [FarmerDashboard.loading, FarmerDashboard.error, FarmerDashboard.data])

  // REFRESH AND RESET DATA
  function refreshData() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      // FarmerDashboard.mutate()
    }, 500)
  }

  return (
    <Authorization permissions={Account.permissions} permission="read_farmer">
      <PageContent>
        <FadeAnimation>
          <TableToolbar
            mainChild={
              <p>
                AS OF YEAR {census} - QUIRINO{address_municipality && ', ' + address_municipality}
                {address_barangay && ', ' + address_barangay}
              </p>
            }>
            <ButtonIcon label="Filter" onClick={() => setDisplay(!display)} title={display ? 'Hide filter options' : 'Display more filter options'}>
              <Filter20 />
            </ButtonIcon>
            <ButtonIcon label="Refresh" onClick={refreshData} title="Refresh and reset table">
              <Reset20 />
            </ButtonIcon>
          </TableToolbar>

          <SearchBox className={display ? 'display' : 'hidden'}>
            <FormRow>
              <Field label="Year">
                <Select onChange={(e) => setCensus(e.target.value)} value={census}>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                  <option value={2021}>2021</option>
                </Select>
              </Field>
              {/* {Account.vicinity_municipality === '' && ( */}
              <Field label="Municipality">
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
              <Field label="Barangay">
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

          <DashboardContent>
            <DashboardItem title="Farmer Population" status={status}>
              <TotalFarmers
                total_farmers={121071}
                total_farmers_male={59837}
                total_farmers_female={61234}
                total_farmers_owner={263}
                total_farmers_tenant={345}
                total_farmers_laborer={1834}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Farmer Per Age" status={status}>
              <PopulationPerAge
                total_farmers_below_20={30}
                total_farmers_below_20_male={20}
                total_farmers_below_20_female={10}
                total_farmers_20_to_29={1246}
                total_farmers_20_to_29_male={263}
                total_farmers_20_to_29_female={127}
                total_farmers_30_to_39={2457}
                total_farmers_30_to_39_male={2049}
                total_farmers_30_to_39_female={394}
                total_farmers_40_to_49={3476}
                total_farmers_40_to_49_male={3095}
                total_farmers_40_to_49_female={409}
                total_farmers_50_to_59={2921}
                total_farmers_50_to_59_male={1023}
                total_farmers_50_to_59_female={192}
                total_farmers_above_59={509}
                total_farmers_above_59_male={309}
                total_farmers_above_59_female={12}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Farmer Per Civil Status" status={status}>
              <PopulationPerCivilStatus
                total_farmers_single={5923}
                total_farmers_single_male={2376}
                total_farmers_single_female={3278}
                total_farmers_living_in={4561}
                total_farmers_living_in_male={6076}
                total_farmers_living_in_female={1045}
                total_farmers_married={9673}
                total_farmers_married_male={4973}
                total_farmers_married_female={5278}
                total_farmers_divorced={281}
                total_farmers_divorced_male={198}
                total_farmers_divorced_female={57}
                total_farmers_separated={1072}
                total_farmers_separated_male={3095}
                total_farmers_separated_female={1209}
                total_farmers_widowed={4983}
                total_farmers_widowed_male={597}
                total_farmers_widowed_female={519}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Rice Area" status={status}>
              <RiceArea total_rice_area={7645} total_rice_area_from_farmers={3795} />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Corn Area" status={status}>
              <CornArea total_corn_area={7645} total_corn_area_from_farmers={3795} />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="High Value Crops Area" status={status}>
              <HighValueCrops
                total_hvc_area={1000}
                total_hvc_area_from_farmers={1000}
                total_hvc_banana_area={1000}
                total_hvc_banana_area_from_farmers={1000}
                total_hvc_cacao_area={1000}
                total_hvc_cacao_area_from_farmers={1000}
                total_hvc_coffee_area={1000}
                total_hvc_coffee_area_from_farmers={1000}
                total_hvc_fruit_tree_area={1000}
                total_hvc_fruit_tree_area_from_farmers={1000}
                total_hvc_root_crop_area={1000}
                total_hvc_root_crop_area_from_farmers={1000}
                total_hvc_spice_area={1000}
                total_hvc_spice_area_from_farmers={1000}
                total_hvc_vegetable_area={1000}
                total_hvc_vegetable_area_from_farmers={1000}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="High Value Crops Area - Sub Varieties" status={status}>
              <HighValueCropsSubVariety />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Livestock" status={status}>
              <Livestock
                total_livestock_goats={57}
                total_livestock_goats_from_farmers={75}
                total_livestock_pigs={37}
                total_livestock_pigs_from_farmers={73}
                total_livestock_cattles={61}
                total_livestock_cattles_from_farmers={61}
                total_livestock_carabaos={61}
                total_livestock_carabaos_from_farmers={61}
                total_livestock_sheeps={61}
                total_livestock_sheeps_from_farmers={61}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Poultry" status={status}>
              <Poultry
                total_poultry_chickens={1000}
                total_poultry_chickens_from_farmers={1000}
                total_poultry_ducks={1000}
                total_poultry_ducks_from_farmers={1000}
                total_poultry_gooses={1000}
                total_poultry_gooses_from_farmers={1000}
                total_poultry_turkeys={1000}
                total_poultry_turkeys_from_farmers={1000}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Fish Pond" status={status}>
              <Fishery total_fishery_area={82192} total_fishery_area_from_farmers={2927} total_fishery_fingerlings={8192927} />
            </DashboardItem>
          </DashboardContent>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerDashboard
