import Account from '../json/account.json'
import AccountContext from '../contexts/AccountContext'
import Address from '../Address'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import DashboardContent from '../components/DashboardContent'
import DashboardItem from '../components/DashboardItem'
import DashboardToolbar from '../components/DashboardToolbar'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import HighValueCrops from '../fragments/HighValueCrops'
import HighValueCropsSubVariety from '../fragments/HighValueCropsSubVariety'
import PageContent from '../components/PageContent'
import PopulationPerAge from '../fragments/PopulationPerAge'
import PopulationPerCivilStatus from '../fragments/PopulationPerCivilStatus'
import PopulationPerMarital from '../fragments/PopulationPerMarital'
import PopulationPerSex from '../fragments/PopulationPerSex'
import React from 'react'
import { Reset20 } from '@carbon/icons-react'
import Select from '../components/Select'

const Dashboard = {
  data: {
    total_population: 200,
    total_population_male: 100,
    total_population_female: 100
  }
}

function ResidentDashboard() {
  // INFORMATION STATE
  // const Account = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')

  // INFORMATION STATE: ACTUAL POPULATION
  const [total_population, setTotalPopulation] = React.useState(0)
  const [total_population_male, setTotalPopulationMale] = React.useState(0)
  const [total_population_female, setTotalPopulationFemale] = React.useState(0)

  // INPUT STATE
  const [censuses, setCensuses] = React.useState([])
  const [census_year, setCensusYear] = React.useState(0)
  const [census_visit, setCensusVisit] = React.useState(0)
  const [municipality, setMunicipality] = React.useState(Account.vicinity_municipality)
  const [barangay, setBarangay] = React.useState(Account.vicinity_barangay)
  const [params, setParams] = React.useState({ census_year, census_visit, municipality, barangay })
  // const Dashboard = getResidentsDashboard(params)
  // const Censuses = getResidentsCensuses()

  // ON RENDER, REVALIDATE
  React.useEffect(() => {
    // mutate('dashboard/residents')
    // mutate('censuses/residents')
  }, [])

  // ON FETCH DASHBOARD
  React.useEffect(() => {
    // if (Dashboard.loading) setStatus('loading')
    // if (Dashboard.error) setStatus('error')

    // if (Dashboard.data) {
    setStatus('success')

    // INFORMATION STATE
    setTotalPopulation(Dashboard.data?.total_population)
    setTotalPopulationMale(Dashboard.data?.total_population_male)
    setTotalPopulationFemale(Dashboard.data?.total_population_female)
    // }

    return () => setStatus('loading')
    // }, [Dashboard.loading, Dashboard.error, Dashboard.data])
  }, [])

  // ON FETCH CENSUSES
  React.useEffect(() => {
    // if (Censues.loading) setStatus('loading')
    // if (Censues.error) setStatus('error')

    // if (Censues.data) {
    // setStatus('success')
    // setCensuses(Censues.data)
    // setCensusYear(Censues.data?.[0].year)
    // setCensusVisit(Censues.data?.[0].visit)
    // }

    return () => setStatus('loading')
    // }, [Censues.loading, Censues.error, Censues.data])
  }, [])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census_year, census_visit, municipality, barangay])

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (census_year !== '') newParams.census_year = census_year
    if (census_visit !== '') newParams.census_visit = census_visit
    if (municipality !== '') newParams.municipality = municipality
    if (barangay !== '') newParams.barangay = barangay
    setParams(newParams)
  }

  // REFRESH AND RESET TABLE
  function refreshDashboard() {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setCensusYear(new Date().getFullYear())
      setCensusVisit(1)
      setMunicipality(Account.vicinity_municipality)
      setBarangay(Account.vicinity_barangay)
      // Dashboard.mutate()
      // Censuses.mutate()
    }, 500)
  }

  return (
    // <Authorization permissions={Account.permissions} permission="read_resident">
    <PageContent>
      <FadeAnimation>
        <DashboardToolbar
          action={
            <ButtonIcon className="is-gray" onClick={refreshDashboard} status={status} title="Refresh">
              <Reset20 />
            </ButtonIcon>
          }>
          <Field label="Municipality" status={status}>
            <Select
              onChange={(e) => {
                setBarangay('')
                setMunicipality(e.target.value)
              }}
              value={municipality}>
              <option value="">ALL MUNICIPALS</option>
              {Address.Municipalities('02', 'QUIRINO').map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Barangay" status={status}>
            <Select onChange={(e) => setBarangay(e.target.value)} value={barangay}>
              <option value="">ALL BARANGAYS</option>
              {Address.Barangays('02', 'QUIRINO', municipality).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Year" status={status}>
            <Select defaultValue="2022">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Select>
          </Field>
        </DashboardToolbar>

        <DashboardContent>
          <DashboardItem status={status} title="Population Per Sex">
            <PopulationPerSex />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem status={status} title="Population Per Marital Status">
            <PopulationPerMarital />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Population Per Age">
            <PopulationPerAge />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Population Per Civil Status">
            <PopulationPerCivilStatus />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="High Value Crops Area">
            <HighValueCrops />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="High Value Crops Area - Sub Varieties">
            <HighValueCropsSubVariety />
          </DashboardItem>
        </DashboardContent>
      </FadeAnimation>
    </PageContent>
    // </Authorization>
  )
}

export default ResidentDashboard
