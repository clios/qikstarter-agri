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
import getFarmerDashboard from '../api/getFarmerDashboard'

function FarmerDashboard() {
  // INFORMATION STATE
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [display, setDisplay] = React.useState(false)

  const [total_farmers, setTotalFarmers] = React.useState(0)
  const [total_farmers_male, setTotalFarmersMale] = React.useState(0)
  const [total_farmers_female, setTotalFarmersFemale] = React.useState(0)
  const [total_farmers_owner, setTotalFarmersOwner] = React.useState(0)
  const [total_farmers_owner_male, setTotalFarmersOwnerMale] = React.useState(0)
  const [total_farmers_owner_female, setTotalFarmersOwnerFemale] = React.useState(0)
  const [total_farmers_tenant, setTotalFarmersTenant] = React.useState(0)
  const [total_farmers_tenant_male, setTotalFarmersTenantMale] = React.useState(0)
  const [total_farmers_tenant_female, setTotalFarmersTenantFemale] = React.useState(0)
  const [total_farmers_laborer, setTotalFarmersLaborer] = React.useState(0)
  const [total_farmers_laborer_male, setTotalFarmersLaborerMale] = React.useState(0)
  const [total_farmers_laborer_female, setTotalFarmersLaborerFemale] = React.useState(0)
  const [total_farmers_below_20, setTotalFarmersBelow_20] = React.useState(0)
  const [total_farmers_below_20_male, setTotalFarmersBelow_20Male] = React.useState(0)
  const [total_farmers_below_20_female, setTotalFarmersBelow_20Female] = React.useState(0)
  const [total_farmers_between_20_to_29, setTotalFarmersBetween_20To_29] = React.useState(0)
  const [total_farmers_between_20_to_29_male, setTotalFarmersBetween_20To_29Male] = React.useState(0)
  const [total_farmers_between_20_to_29_female, setTotalFarmersBetween_20To_29Female] = React.useState(0)
  const [total_farmers_between_30_to_39, setTotalFarmersBetween_30To_39] = React.useState(0)
  const [total_farmers_between_30_to_39_male, setTotalFarmersBetween_30To_39Male] = React.useState(0)
  const [total_farmers_between_30_to_39_female, setTotalFarmersBetween_30To_39Female] = React.useState(0)
  const [total_farmers_between_40_to_49, setTotalFarmersBetween_40To_49] = React.useState(0)
  const [total_farmers_between_40_to_49_male, setTotalFarmersBetween_40To_49Male] = React.useState(0)
  const [total_farmers_between_40_to_49_female, setTotalFarmersBetween_40To_49Female] = React.useState(0)
  const [total_farmers_between_50_to_59, setTotalFarmersBetween_50To_59] = React.useState(0)
  const [total_farmers_between_50_to_59_male, setTotalFarmersBetween_50To_59Male] = React.useState(0)
  const [total_farmers_between_50_to_59_female, setTotalFarmersBetween_50To_59Female] = React.useState(0)
  const [total_farmers_above_59, setTotalFarmersAbove_59] = React.useState(0)
  const [total_farmers_above_59_male, setTotalFarmersAbove_59Male] = React.useState(0)
  const [total_farmers_above_59_female, setTotalFarmersAbove_59Female] = React.useState(0)
  const [total_farmers_single, setTotalFarmersSingle] = React.useState(0)
  const [total_farmers_single_male, setTotalFarmersSingleMale] = React.useState(0)
  const [total_farmers_single_female, setTotalFarmersSingleFemale] = React.useState(0)
  const [total_farmers_living_in, setTotalFarmersLivingIn] = React.useState(0)
  const [total_farmers_living_in_male, setTotalFarmersLivingInMale] = React.useState(0)
  const [total_farmers_living_in_female, setTotalFarmersLivingInFemale] = React.useState(0)
  const [total_farmers_married, setTotalFarmersMarried] = React.useState(0)
  const [total_farmers_married_male, setTotalFarmersMarriedMale] = React.useState(0)
  const [total_farmers_married_female, setTotalFarmersMarriedFemale] = React.useState(0)
  const [total_farmers_divorced, setTotalFarmersDivorced] = React.useState(0)
  const [total_farmers_divorced_male, setTotalFarmersDivorcedMale] = React.useState(0)
  const [total_farmers_divorced_female, setTotalFarmersDivorcedFemale] = React.useState(0)
  const [total_farmers_separated, setTotalFarmersSeparated] = React.useState(0)
  const [total_farmers_separated_male, setTotalFarmersSeparatedMale] = React.useState(0)
  const [total_farmers_separated_female, setTotalFarmersSeparatedFemale] = React.useState(0)
  const [total_farmers_widowed, setTotalFarmersWidowed] = React.useState(0)
  const [total_farmers_widowed_male, setTotalFarmersWidowedMale] = React.useState(0)
  const [total_farmers_widowed_female, setTotalFarmersWidowedFemale] = React.useState(0)
  const [total_rice_area, setTotalRiceArea] = React.useState(0)
  const [total_rice_area_from_farmers, setTotalRiceAreaFromFarmers] = React.useState(0)
  const [total_corn_area, setTotalCornArea] = React.useState(0)
  const [total_corn_area_from_farmers, setTotalCornAreaFromFarmers] = React.useState(0)
  const [total_hvc_area, setTotalHvcArea] = React.useState(0)
  const [total_hvc_area_from_farmers, setTotalHvcAreaFromFarmers] = React.useState(0)
  const [total_hvc_banana_area, setTotalHvcBananaArea] = React.useState(0)
  const [total_hvc_banana_area_from_farmers, setTotalHvcBananaAreaFromFarmers] = React.useState(0)
  const [total_hvc_cacao_area, setTotalHvcCacaoArea] = React.useState(0)
  const [total_hvc_cacao_area_from_farmers, setTotalHvcCacaoAreaFromFarmers] = React.useState(0)
  const [total_hvc_coffee_area, setTotalHvcCoffeeArea] = React.useState(0)
  const [total_hvc_coffee_area_from_farmers, setTotalHvcCoffeeAreaFromFarmers] = React.useState(0)
  const [total_hvc_fruit_tree_area, setTotalHvcFruitTreeArea] = React.useState(0)
  const [total_hvc_fruit_tree_area_from_farmers, setTotalHvcFruitTreeAreaFromFarmers] = React.useState(0)
  const [total_hvc_root_crop_area, setTotalHvcRootCropArea] = React.useState(0)
  const [total_hvc_root_crop_area_from_farmers, setTotalHvcRootCropAreaFromFarmers] = React.useState(0)
  const [total_hvc_spice_area, setTotalHvcSpiceArea] = React.useState(0)
  const [total_hvc_spice_area_from_farmers, setTotalHvcSpiceAreaFromFarmers] = React.useState(0)
  const [total_hvc_vegetable_area, setTotalHvcVegetableArea] = React.useState(0)
  const [total_hvc_vegetable_area_from_farmers, setTotalHvcVegetableAreaFromFarmers] = React.useState(0)
  const [total_livestock_goats, setTotalLivestockGoats] = React.useState(0)
  const [total_livestock_goats_from_farmers, setTotalLivestockGoatsFromFarmers] = React.useState(0)
  const [total_livestock_pigs, setTotalLivestockPigs] = React.useState(0)
  const [total_livestock_pigs_from_farmers, setTotalLivestockPigsFromFarmers] = React.useState(0)
  const [total_livestock_cattles, setTotalLivestockCattles] = React.useState(0)
  const [total_livestock_cattles_from_farmers, setTotalLivestockCattlesFromFarmers] = React.useState(0)
  const [total_livestock_carabaos, setTotalLivestockCarabaos] = React.useState(0)
  const [total_livestock_carabaos_from_farmers, setTotalLivestockCarabaosFromFarmers] = React.useState(0)
  const [total_livestock_sheeps, setTotalLivestockSheeps] = React.useState(0)
  const [total_livestock_sheeps_from_farmers, setTotalLivestockSheepsFromFarmers] = React.useState(0)
  const [total_poultry_chickens, setTotalPoultryChickens] = React.useState(0)
  const [total_poultry_chickens_from_farmers, setTotalPoultryChickensFromFarmers] = React.useState(0)
  const [total_poultry_ducks, setTotalPoultryDucks] = React.useState(0)
  const [total_poultry_ducks_from_farmers, setTotalPoultryDucksFromFarmers] = React.useState(0)
  const [total_poultry_gooses, setTotalPoultryGooses] = React.useState(0)
  const [total_poultry_gooses_from_farmers, setTotalPoultryGoosesFromFarmers] = React.useState(0)
  const [total_poultry_turkeys, setTotalPoultryTurkeys] = React.useState(0)
  const [total_poultry_turkeys_from_farmers, setTotalPoultryTurkeysFromFarmers] = React.useState(0)
  const [total_fishery_area, setTotalFisheryArea] = React.useState(0)
  const [total_fishery_area_from_farmers, setTotalFisheryAreaFromFarmers] = React.useState(0)
  const [total_fishery_fingerlings, setTotalFisheryFingerlings] = React.useState(0)
  const [total_fishery_fingerlings_from_farmers, setTotalFisheryFingerlingsFromFarmers] = React.useState(0)

  // INPUT STATE
  const [census, setCensus] = React.useState(2022)
  const [address_municipality, setAddressMunicipality] = React.useState(Account.vicinity_municipality)
  const [address_barangay, setAddressBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ census, address_municipality, address_barangay })

  // SEND GET FARMERS REQUEST
  const FarmerDashboard = getFarmerDashboard(params)

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
    if (FarmerDashboard.loading) setStatus('loading')
    if (FarmerDashboard.error) setStatus('error')
    if (FarmerDashboard.data) {
      let farmer = FarmerDashboard.data.records
      setStatus('success')
      setTotalFarmers(farmer.total_farmers)
      setTotalFarmersMale(farmer.total_farmers_male)
      setTotalFarmersFemale(farmer.total_farmers_female)
      setTotalFarmersOwner(farmer.total_farmers_owner)
      setTotalFarmersOwnerMale(farmer.total_farmers_owner_male)
      setTotalFarmersOwnerFemale(farmer.total_farmers_owner_female)
      setTotalFarmersTenant(farmer.total_farmers_tenant)
      setTotalFarmersTenantMale(farmer.total_farmers_tenant_male)
      setTotalFarmersTenantFemale(farmer.total_farmers_tenant_female)
      setTotalFarmersLaborer(farmer.total_farmers_laborer)
      setTotalFarmersLaborerMale(farmer.total_farmers_laborer_male)
      setTotalFarmersLaborerFemale(farmer.total_farmers_laborer_female)
      setTotalFarmersBelow_20(farmer.total_farmers_below_20)
      setTotalFarmersBelow_20Male(farmer.total_farmers_below_20_male)
      setTotalFarmersBelow_20Female(farmer.total_farmers_below_20_female)
      setTotalFarmersBetween_20To_29(farmer.total_farmers_between_20_to_29)
      setTotalFarmersBetween_20To_29Male(farmer.total_farmers_between_20_to_29_male)
      setTotalFarmersBetween_20To_29Female(farmer.total_farmers_between_20_to_29_female)
      setTotalFarmersBetween_30To_39(farmer.total_farmers_between_30_to_39)
      setTotalFarmersBetween_30To_39Male(farmer.total_farmers_between_30_to_39_male)
      setTotalFarmersBetween_30To_39Female(farmer.total_farmers_between_30_to_39_female)
      setTotalFarmersBetween_40To_49(farmer.total_farmers_between_40_to_49)
      setTotalFarmersBetween_40To_49Male(farmer.total_farmers_between_40_to_49_male)
      setTotalFarmersBetween_40To_49Female(farmer.total_farmers_between_40_to_49_female)
      setTotalFarmersBetween_50To_59(farmer.total_farmers_between_50_to_59)
      setTotalFarmersBetween_50To_59Male(farmer.total_farmers_between_50_to_59_male)
      setTotalFarmersBetween_50To_59Female(farmer.total_farmers_between_50_to_59_female)
      setTotalFarmersAbove_59(farmer.total_farmers_above_59)
      setTotalFarmersAbove_59Male(farmer.total_farmers_above_59_male)
      setTotalFarmersAbove_59Female(farmer.total_farmers_above_59_female)
      setTotalFarmersSingle(farmer.total_farmers_single)
      setTotalFarmersSingleMale(farmer.total_farmers_single_male)
      setTotalFarmersSingleFemale(farmer.total_farmers_single_female)
      setTotalFarmersLivingIn(farmer.total_farmers_living_in)
      setTotalFarmersLivingInMale(farmer.total_farmers_living_in_male)
      setTotalFarmersLivingInFemale(farmer.total_farmers_living_in_female)
      setTotalFarmersMarried(farmer.total_farmers_married)
      setTotalFarmersMarriedMale(farmer.total_farmers_married_male)
      setTotalFarmersMarriedFemale(farmer.total_farmers_married_female)
      setTotalFarmersDivorced(farmer.total_farmers_divorced)
      setTotalFarmersDivorcedMale(farmer.total_farmers_divorced_male)
      setTotalFarmersDivorcedFemale(farmer.total_farmers_divorced_female)
      setTotalFarmersSeparated(farmer.total_farmers_separated)
      setTotalFarmersSeparatedMale(farmer.total_farmers_separated_male)
      setTotalFarmersSeparatedFemale(farmer.total_farmers_separated_female)
      setTotalFarmersWidowed(farmer.total_farmers_widowed)
      setTotalFarmersWidowedMale(farmer.total_farmers_widowed_male)
      setTotalFarmersWidowedFemale(farmer.total_farmers_widowed_female)
      setTotalRiceArea(farmer.total_rice_area)
      setTotalRiceAreaFromFarmers(farmer.total_rice_area_from_farmers)
      setTotalCornArea(farmer.total_corn_area)
      setTotalCornAreaFromFarmers(farmer.total_corn_area_from_farmers)
      setTotalHvcArea(farmer.total_hvc_area)
      setTotalHvcAreaFromFarmers(farmer.total_hvc_area_from_farmers)
      setTotalHvcBananaArea(farmer.total_hvc_banana_area)
      setTotalHvcBananaAreaFromFarmers(farmer.total_hvc_banana_area_from_farmers)
      setTotalHvcCacaoArea(farmer.total_hvc_cacao_area)
      setTotalHvcCacaoAreaFromFarmers(farmer.total_hvc_cacao_area_from_farmers)
      setTotalHvcCoffeeArea(farmer.total_hvc_coffee_area)
      setTotalHvcCoffeeAreaFromFarmers(farmer.total_hvc_coffee_area_from_farmers)
      setTotalHvcFruitTreeArea(farmer.total_hvc_fruit_tree_area)
      setTotalHvcFruitTreeAreaFromFarmers(farmer.total_hvc_fruit_tree_area_from_farmers)
      setTotalHvcRootCropArea(farmer.total_hvc_root_crop_area)
      setTotalHvcRootCropAreaFromFarmers(farmer.total_hvc_root_crop_area_from_farmers)
      setTotalHvcSpiceArea(farmer.total_hvc_spice_area)
      setTotalHvcSpiceAreaFromFarmers(farmer.total_hvc_spice_area_from_farmers)
      setTotalHvcVegetableArea(farmer.total_hvc_vegetable_area)
      setTotalHvcVegetableAreaFromFarmers(farmer.total_hvc_vegetable_area_from_farmers)
      setTotalLivestockGoats(farmer.total_livestock_goats)
      setTotalLivestockGoatsFromFarmers(farmer.total_livestock_goats_from_farmers)
      setTotalLivestockPigs(farmer.total_livestock_pigs)
      setTotalLivestockPigsFromFarmers(farmer.total_livestock_pigs_from_farmers)
      setTotalLivestockCattles(farmer.total_livestock_cattles)
      setTotalLivestockCattlesFromFarmers(farmer.total_livestock_cattles_from_farmers)
      setTotalLivestockCarabaos(farmer.total_livestock_carabaos)
      setTotalLivestockCarabaosFromFarmers(farmer.total_livestock_carabaos_from_farmers)
      setTotalLivestockSheeps(farmer.total_livestock_sheeps)
      setTotalLivestockSheepsFromFarmers(farmer.total_livestock_sheeps_from_farmers)
      setTotalPoultryChickens(farmer.total_poultry_chickens)
      setTotalPoultryChickensFromFarmers(farmer.total_poultry_chickens_from_farmers)
      setTotalPoultryDucks(farmer.total_poultry_ducks)
      setTotalPoultryDucksFromFarmers(farmer.total_poultry_ducks_from_farmers)
      setTotalPoultryGooses(farmer.total_poultry_gooses)
      setTotalPoultryGoosesFromFarmers(farmer.total_poultry_gooses_from_farmers)
      setTotalPoultryTurkeys(farmer.total_poultry_turkeys)
      setTotalPoultryTurkeysFromFarmers(farmer.total_poultry_turkeys_from_farmers)
      setTotalFisheryArea(farmer.total_fishery_area)
      setTotalFisheryAreaFromFarmers(farmer.total_fishery_area_from_farmers)
      setTotalFisheryFingerlings(farmer.total_fishery_fingerlings)
      setTotalFisheryFingerlingsFromFarmers(farmer.total_fishery_fingerlings_from_farmers)
    }
    return () => setStatus('loading')
  }, [FarmerDashboard.loading, FarmerDashboard.error, FarmerDashboard.data])

  // REFRESH AND RESET DATA
  function refreshData() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      FarmerDashboard.mutate()
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
                total_farmers={total_farmers}
                total_farmers_male={total_farmers_male}
                total_farmers_female={total_farmers_female}
                total_farmers_owner={total_farmers_owner}
                total_farmers_tenant={total_farmers_tenant}
                total_farmers_laborer={total_farmers_laborer}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Farmer Per Age" status={status}>
              <PopulationPerAge
                total_farmers_below_20={total_farmers_below_20}
                total_farmers_below_20_male={total_farmers_below_20_male}
                total_farmers_below_20_female={total_farmers_below_20_female}
                total_farmers_20_to_29={total_farmers_between_20_to_29}
                total_farmers_20_to_29_male={total_farmers_between_20_to_29_male}
                total_farmers_20_to_29_female={total_farmers_between_20_to_29_female}
                total_farmers_30_to_39={total_farmers_between_30_to_39}
                total_farmers_30_to_39_male={total_farmers_between_30_to_39_male}
                total_farmers_30_to_39_female={total_farmers_between_30_to_39_female}
                total_farmers_40_to_49={total_farmers_between_40_to_49}
                total_farmers_40_to_49_male={total_farmers_between_40_to_49_male}
                total_farmers_40_to_49_female={total_farmers_between_40_to_49_female}
                total_farmers_50_to_59={total_farmers_between_50_to_59}
                total_farmers_50_to_59_male={total_farmers_between_50_to_59_male}
                total_farmers_50_to_59_female={total_farmers_between_50_to_59_female}
                total_farmers_above_59={total_farmers_above_59}
                total_farmers_above_59_male={total_farmers_above_59_male}
                total_farmers_above_59_female={total_farmers_above_59_female}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Farmer Per Civil Status" status={status}>
              <PopulationPerCivilStatus
                total_farmers_single={total_farmers_single}
                total_farmers_single_male={total_farmers_single_male}
                total_farmers_single_female={total_farmers_single_female}
                total_farmers_living_in={total_farmers_living_in}
                total_farmers_living_in_male={total_farmers_living_in_male}
                total_farmers_living_in_female={total_farmers_living_in_female}
                total_farmers_married={total_farmers_married}
                total_farmers_married_male={total_farmers_married_male}
                total_farmers_married_female={total_farmers_married_female}
                total_farmers_divorced={total_farmers_divorced}
                total_farmers_divorced_male={total_farmers_divorced_male}
                total_farmers_divorced_female={total_farmers_divorced_female}
                total_farmers_separated={total_farmers_separated}
                total_farmers_separated_male={total_farmers_separated_male}
                total_farmers_separated_female={total_farmers_separated_female}
                total_farmers_widowed={total_farmers_widowed}
                total_farmers_widowed_male={total_farmers_widowed_male}
                total_farmers_widowed_female={total_farmers_widowed_female}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Rice Area" status={status}>
              <RiceArea total_rice_area={total_rice_area} total_rice_area_from_farmers={total_rice_area_from_farmers} />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Corn Area" status={status}>
              <CornArea total_corn_area={total_corn_area} total_corn_area_from_farmers={total_corn_area_from_farmers} />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="High Value Crops Area" status={status}>
              <HighValueCrops
                total_hvc_area={total_hvc_area}
                total_hvc_area_from_farmers={total_hvc_area_from_farmers}
                total_hvc_banana_area={total_hvc_banana_area}
                total_hvc_banana_area_from_farmers={total_hvc_banana_area_from_farmers}
                total_hvc_cacao_area={total_hvc_cacao_area}
                total_hvc_cacao_area_from_farmers={total_hvc_cacao_area_from_farmers}
                total_hvc_coffee_area={total_hvc_coffee_area}
                total_hvc_coffee_area_from_farmers={total_hvc_coffee_area_from_farmers}
                total_hvc_fruit_tree_area={total_hvc_fruit_tree_area}
                total_hvc_fruit_tree_area_from_farmers={total_hvc_fruit_tree_area_from_farmers}
                total_hvc_root_crop_area={total_hvc_root_crop_area}
                total_hvc_root_crop_area_from_farmers={total_hvc_root_crop_area_from_farmers}
                total_hvc_spice_area={total_hvc_spice_area}
                total_hvc_spice_area_from_farmers={total_hvc_spice_area_from_farmers}
                total_hvc_vegetable_area={total_hvc_vegetable_area}
                total_hvc_vegetable_area_from_farmers={total_hvc_vegetable_area_from_farmers}
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
                total_livestock_goats={total_livestock_goats}
                total_livestock_goats_from_farmers={total_livestock_goats_from_farmers}
                total_livestock_pigs={total_livestock_pigs}
                total_livestock_pigs_from_farmers={total_livestock_pigs_from_farmers}
                total_livestock_cattles={total_livestock_cattles}
                total_livestock_cattles_from_farmers={total_livestock_cattles_from_farmers}
                total_livestock_carabaos={total_livestock_carabaos}
                total_livestock_carabaos_from_farmers={total_livestock_carabaos_from_farmers}
                total_livestock_sheeps={total_livestock_sheeps}
                total_livestock_sheeps_from_farmers={total_livestock_sheeps_from_farmers}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Poultry" status={status}>
              <Poultry
                total_poultry_chickens={total_poultry_chickens}
                total_poultry_chickens_from_farmers={total_poultry_chickens_from_farmers}
                total_poultry_ducks={total_poultry_ducks}
                total_poultry_ducks_from_farmers={total_poultry_ducks_from_farmers}
                total_poultry_gooses={total_poultry_gooses}
                total_poultry_gooses_from_farmers={total_poultry_gooses_from_farmers}
                total_poultry_turkeys={total_poultry_turkeys}
                total_poultry_turkeys_from_farmers={total_poultry_turkeys_from_farmers}
              />
            </DashboardItem>
          </DashboardContent>

          <DashboardContent>
            <DashboardItem title="Fish Pond" status={status}>
              <Fishery
                total_fishery_area={total_fishery_area}
                total_fishery_area_from_farmers={total_fishery_area_from_farmers}
                total_fishery_fingerlings={total_fishery_fingerlings}
              />
            </DashboardItem>
          </DashboardContent>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerDashboard
