import { Close20, Information24 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import Cleave from 'cleave.js/react'
import { Entropy } from 'entropy-string'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormError from '../components/FormError'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Help from '../Help'
import Input from '../components/Input'
import PageContent from '../components/PageContent'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import SubSection from '../components/SubSection'
import SubSectionHeader from '../components/SubSectionHeader'
import axios from 'axios'
import { toast } from 'react-toastify'

function FarmerCreate() {
  // INFORMATION STATE
  const ROUTE = useParams()
  const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})
  const [error, setError] = React.useState({})

  // NEW FARM FORM -----------------------------------------------|
  // 1. OWNERSHIP
  const [ownership, setOwnership] = React.useState('')
  // 2. FARM ADDRESS
  const address_region = '02'
  const address_province = 'QUIRINO'
  const [address_municipality, setAddressMunicipality] = React.useState('')
  const [address_barangay, setAddressBarangay] = React.useState('')
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  // 3. FARM LOCATION
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')
  // 4. TYPE OF FARMING ACTIVITY
  const [rice, setRice] = React.useState(false)
  const [corn, setCorn] = React.useState(false)
  const [high_value_crops, setHighValueCrops] = React.useState(false)
  const [livestock, setLivestock] = React.useState(false)
  const [poultry, setPoultry] = React.useState(false)
  const [fish_pond, setFishPond] = React.useState(false)
  // 4.1 RICE
  const [rice_irrigated, setRiceIrrigated] = React.useState(0)
  const [rice_rainfed, setRiceRainfed] = React.useState(0)
  const [rice_upland, setRiceUpland] = React.useState(0)
  const [rice_area, setRiceArea] = React.useState(0)
  // 4.2 CORN
  const [corn_lower_vega, setCornLowerVega] = React.useState(0)
  const [corn_upper_vega, setCornUpperVega] = React.useState(0)
  const [corn_broad_plain, setCornBroadPlain] = React.useState(0)
  const [corn_hilly_areas, setCornHillyAreas] = React.useState(0)
  const [corn_area, setCornArea] = React.useState(0)
  // 4.3 HIGH VALUE CROPS
  const [hvc_banana_area, setHvcBananaArea] = React.useState(0)
  const [hvc_cacao_area, setHvcCacaoArea] = React.useState(0)
  const [hvc_coffee_area, setHvcCoffeeArea] = React.useState(0)
  const [hvc_fruit_tree_area, setHvcFruitTreeArea] = React.useState(0)
  const [hvc_root_crop_area, setHvcRootCropArea] = React.useState(0)
  const [hvc_spice_area, setHvcSpiceArea] = React.useState(0)
  const [hvc_vegetable_area, setHvcVegetableArea] = React.useState(0)
  const [hvc_area, setHvcArea] = React.useState(0)
  // 4.4 LIVESTOCK
  const [livestock_carabaos, setLivestockCarabaos] = React.useState(0)
  const [livestock_goats, setLivestockGoats] = React.useState(0)
  const [livestock_cattles, setLivestockCattles] = React.useState(0)
  const [livestock_pigs, setLivestockPigs] = React.useState(0)
  const [livestock_sheeps, setLivestockSheeps] = React.useState(0)
  // 4.5 POULTRY
  const [poultry_chickens, setPoultryChickens] = React.useState(0)
  const [poultry_ducks, setPoultryDucks] = React.useState(0)
  const [poultry_gooses, setPoultryGooses] = React.useState(0)
  const [poultry_turkeys, setPoultryTurkeys] = React.useState(0)
  // 4.6 FISH POND
  const [fishery_area, setFisheryArea] = React.useState(0)
  const [fishery_fingerlings, setFisheryFingerlings] = React.useState(0)
  // ----------------------------------------------------------------------|

  // SEND POST FARMER REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/farms'
    const DATA = {
      address_barangay: address_barangay,
      address_latitude: Help.formInputNumber(address_latitude),
      address_longitude: Help.formInputNumber(address_longitude),
      address_municipality: address_municipality,
      address_province: address_province,
      address_purok: Help.formInputText(address_purok),
      address_street: Help.formInputText(address_street),
      corn_area: Help.formInputNumber(corn_area),
      farmer_id: Number(ROUTE.farmer_id),
      fishery_area: Help.formInputNumber(fishery_area),
      fishery_fingerlings: Help.formInputNumber(fishery_fingerlings),
      hvc_area: Help.formInputNumber(hvc_area),
      hvc_banana_area: Help.formInputNumber(hvc_banana_area),
      hvc_cacao_area: Help.formInputNumber(hvc_cacao_area),
      hvc_coffee_area: Help.formInputNumber(hvc_coffee_area),
      hvc_fruit_tree_area: Help.formInputNumber(hvc_fruit_tree_area),
      hvc_root_crop_area: Help.formInputNumber(hvc_root_crop_area),
      hvc_spice_area: Help.formInputNumber(hvc_spice_area),
      hvc_vegetable_area: Help.formInputNumber(hvc_vegetable_area),
      livestock_carabaos: Help.formInputNumber(livestock_carabaos),
      livestock_cattles: Help.formInputNumber(livestock_cattles),
      livestock_goats: Help.formInputNumber(livestock_goats),
      livestock_pigs: Help.formInputNumber(livestock_pigs),
      livestock_sheeps: Help.formInputNumber(livestock_sheeps),
      ownership: Help.formSelect(ownership),
      poultry_chickens: Help.formInputNumber(poultry_chickens),
      poultry_ducks: Help.formInputNumber(poultry_ducks),
      poultry_gooses: Help.formInputNumber(poultry_gooses),
      poultry_turkeys: Help.formInputNumber(poultry_turkeys),
      rice_area: Help.formInputNumber(rice_area)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .post(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Farm record created')
          navigate(`/farmers/records/${ROUTE.farmer_id}`, { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data)
            setError(error.response.data)
          } else if (error.response?.status === 403) toast.error('User credential is forbidden')
          else if (error.response?.status === 500) toast.error('Unexpected server error')
        } else if (error.request) console.error(error.request)
        else console.error('Error', error.message)
      })
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Authorization permissions={Account.permissions} permission="write_farmer">
      <PageContent>
        <FadeAnimation>
          <Form status={status}>
            <SectionHeader bigTitle="New Farm Record Form">
              <ButtonIcon
                color="red"
                onClick={() => navigate('/farmers/records/' + ROUTE.farmer_id, { replace: true })}
                status={status}
                title="Close">
                <Close20 />
              </ButtonIcon>
            </SectionHeader>
            <SectionHeader title="1. Ownership" />
            <SectionBody>
              <Field error={helper.ownership} label="Owned or Tenant?" status={status}>
                <Select onChange={(e) => setOwnership(e.target.value)} value={ownership}>
                  <option value="">NO ANSWER</option>
                  <option value="owned">OWNED</option>
                  <option value="tenanted">TENANT</option>
                </Select>
              </Field>
            </SectionBody>
            <SectionHeader title="2. Farm Address" />
            <FormRow>
              <Field label="Region" status={status}>
                <Select disabled>
                  <option>02</option>
                </Select>
              </Field>
              <Field label="Province" status={status}>
                <Select disabled>
                  <option>QUIRINO</option>
                </Select>
              </Field>
              {/* {Account.vicinity_municipality === '' && ( */}
              <Field error={helper.address_municipality} label="Municipality" status={status}>
                <Select
                  onChange={(e) => {
                    setAddressBarangay('')
                    setAddressMunicipality(e.target.value)
                  }}
                  value={address_municipality}>
                  <option value=""></option>
                  {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              {/* )} */}
            </FormRow>
            <FormRow>
              {/* {Account.vicinity_barangay === '' && ( */}
              <Field error={helper.address_barangay} label="Barangay" status={status}>
                <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                  <option value=""></option>
                  {Address.Barangays('02', 'QUIRINO', address_municipality).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              {/* )} */}
              <Field error={helper.address_purok} label="Purok" status={status}>
                <Input uppercase onChange={(e) => setAddressPurok(e.target.value)} required size={20} type="text" value={address_purok} />
              </Field>
              <Field error={helper.address_street} label="Street" status={status}>
                <Input uppercase onChange={(e) => setAddressStreet(e.target.value)} required size={20} type="text" value={address_street} />
              </Field>
            </FormRow>
            <SectionHeader title="3. Farm Location" />
            <FormRow>
              <Field error={helper.address_latitude} label="Latitude" status={status}>
                <Cleave
                  className="input"
                  onChange={(e) => setAddressLatitude(e.target.value)}
                  size={20}
                  type="text"
                  options={{
                    numeral: true,
                    numeralIntegerScale: 2,
                    numeralDecimalScale: 15,
                    numeralThousandsGroupStyle: 'none'
                  }}
                  value={address_latitude}
                />
              </Field>
              <Field error={helper.address_longitude} label="Longitude" status={status}>
                <Cleave
                  className="input"
                  onChange={(e) => setAddressLongitude(e.target.value)}
                  size={20}
                  type="text"
                  options={{
                    numeral: true,
                    numeralIntegerScale: 3,
                    numeralDecimalScale: 15,
                    numeralThousandsGroupStyle: 'none'
                  }}
                  value={address_longitude}
                />
              </Field>
            </FormRow>
            <SectionHeader title="4. Farming Activity" />
            <FormRow>
              <Field status={status}>
                <Checkbox text="RICE" onChange={(e) => setRice(e.target.checked)} />
              </Field>
              <Field status={status}>
                <Checkbox text="CORN" onChange={(e) => setCorn(e.target.checked)} />
              </Field>
              <Field status={status}>
                <Checkbox text="HIGH VALUE CROPS" onChange={(e) => setHighValueCrops(e.target.checked)} />
              </Field>
              <Field status={status}>
                <Checkbox text="LIVESTOCK" onChange={(e) => setLivestock(e.target.checked)} />
              </Field>
              <Field status={status}>
                <Checkbox text="POULTRY" onChange={(e) => setPoultry(e.target.checked)} />
              </Field>
              <Field status={status}>
                <Checkbox text="FISH POND" onChange={(e) => setFishPond(e.target.checked)} />
              </Field>
            </FormRow>
            {rice && (
              <FadeAnimation>
                <SubSection title="4.1 Rice Area">
                  <FormRow>
                    <Field label="Irrigated">
                      <Cleave
                        className="input"
                        disabled
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Rainfed">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Upland">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total Area">
                      <Cleave
                        className="input"
                        onChange={(e) => setRiceArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={rice_area}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            {corn && (
              <FadeAnimation>
                <SubSection title="4.2 Corn Area">
                  <FormRow>
                    <Field label="Lower Vega">
                      <Cleave
                        className="input"
                        disabled
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Upper Vega">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Broad Plain">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Hilly Areas">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total Area">
                      <Cleave
                        className="input"
                        size={13}
                        onChange={(e) => setCornArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        value={corn_area}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            {high_value_crops && (
              <FadeAnimation>
                <SubSection title="4.3 High Value Crops Area">
                  <FormRow title="4.3.1 Banana Area">
                    <Field label="Lakatan">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Latundan">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Saba">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total">
                      <Cleave
                        className="input"
                        size={13}
                        onChange={(e) => setHvcBananaArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        value={hvc_banana_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.2 Cacao Area">
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcCacaoArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_cacao_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.3 Coffee Area">
                    <Field label="Arabica">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Liberica">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Robusta">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcCoffeeArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_coffee_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.4 Fruit Trees Area">
                    <Field label="Calamansi">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Guyabano">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Lemon">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Mandarin">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Mango">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Pomelo">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Rambutan">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcFruitTreeArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_fruit_tree_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.5 Root Crops Area">
                    <Field label="Potato">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Taro">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Ube">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcRootCropArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_root_crop_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.6 Spices Area">
                    <Field label="Ginger">
                      <Cleave
                        className="input"
                        disabled
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                      />
                    </Field>
                    <Field label="Onion">
                      <Cleave
                        className="input"
                        disabled
                        size={13}
                        placeholder="Hectare"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        title="Available soon..."
                      />
                    </Field>
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcSpiceArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_spice_area}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="4.3.7 Vegetables Area">
                    <Field label="Total">
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcVegetableArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                      />
                    </Field>
                  </FormRow>
                  <FormRow title="High Value Crops Total Area">
                    <Field>
                      <Cleave
                        className="input"
                        onChange={(e) => setHvcArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Hectare"
                        size={13}
                        value={hvc_area}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            {livestock && (
              <FadeAnimation>
                <SubSection title="4.4 Livestock Total Head">
                  <FormRow>
                    <Field label="Carabaos">
                      <Cleave
                        className="input"
                        onChange={(e) => setLivestockCarabaos(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={livestock_carabaos}
                      />
                    </Field>
                    <Field label="Cattles">
                      <Cleave
                        className="input"
                        onChange={(e) => setLivestockCattles(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={livestock_cattles}
                      />
                    </Field>
                    <Field label="Goats">
                      <Cleave
                        className="input"
                        onChange={(e) => setLivestockGoats(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={livestock_goats}
                      />
                    </Field>
                    <Field label="Pigs">
                      <Cleave
                        className="input"
                        onChange={(e) => setLivestockPigs(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={livestock_pigs}
                      />
                    </Field>
                    <Field label="Sheeps">
                      <Cleave
                        className="input"
                        onChange={(e) => setLivestockSheeps(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={livestock_sheeps}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            {poultry && (
              <FadeAnimation>
                <SubSection title="4.5 Poultry Total Head">
                  <FormRow>
                    <Field label="Chickens">
                      <Cleave
                        className="input"
                        onChange={(e) => setPoultryChickens(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={poultry_chickens}
                      />
                    </Field>
                    <Field label="Ducks">
                      <Cleave
                        className="input"
                        onChange={(e) => setPoultryDucks(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={poultry_ducks}
                      />
                    </Field>
                    <Field label="Gooses">
                      <Cleave
                        className="input"
                        onChange={(e) => setPoultryGooses(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={poultry_gooses}
                      />
                    </Field>
                    <Field label="Turkeys">
                      <Cleave
                        className="input"
                        onChange={(e) => setPoultryTurkeys(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Heads"
                        size={13}
                        value={poultry_turkeys}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            {fish_pond && (
              <FadeAnimation>
                <SubSection title="4.6 Fish Pond">
                  <FormRow>
                    <Field label="Area">
                      <Cleave
                        className="input"
                        size={13}
                        onChange={(e) => setFisheryArea(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Square meter"
                        value={fishery_area}
                      />
                    </Field>
                    <Field label="Qty. of Fingerlings">
                      <Cleave
                        className="input"
                        size={13}
                        onChange={(e) => setFisheryFingerlings(e.target.value)}
                        options={{
                          numeral: true,
                          numeralIntegerScale: 5,
                          numeralDecimalScale: 3,
                          numeralPositiveOnly: true,
                          numeralThousandsGroupStyle: 'none'
                        }}
                        placeholder="Pieces"
                        value={fishery_fingerlings}
                      />
                    </Field>
                  </FormRow>
                </SubSection>
              </FadeAnimation>
            )}
            <FormError error={error} />
            <FormFooter>
              <Button
                disabled={status === 'loading'}
                loadingText="Creating..."
                onClick={submitForm}
                status={status}
                title="Create new farm record"
                type="submit">
                Create Farm Record
              </Button>
            </FormFooter>
          </Form>
        </FadeAnimation>
      </PageContent>
    </Authorization>
  )
}

export default FarmerCreate
