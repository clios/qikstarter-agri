import { Redirect, Router } from '@reach/router'

import AgricultureFlood from './pages/AgricultureFlood'
import AgricultureLandslide from './pages/AgricultureLandslide'
import AgricultureTabs from './layouts/AgricultureTabs'
import EvacuationCenterInformation from './pages/EvacuationCenterInformation'
import EvacuationCenterMap from './pages/EvacuationCenterMap'
import EvacuationCenterRecords from './pages/EvacuationCenterRecords'
import EvacuationDashboard from './pages/EvacuationDashboard'
import EvacuationTabs from './layouts/EvacuationTabs'
import FarmCreate from './pages/FarmCreate'
import FarmUpdate from './pages/FarmUpdate'
import FarmerCreate from './pages/FarmerCreate'
import FarmerDashboard from './pages/FarmerDashboard'
import FarmerInformation from './pages/FarmerInformation'
import FarmerMap from './pages/FarmerMap'
import FarmerRecords from './pages/FarmerRecords'
import FarmerTabs from './layouts/FarmerTabs'
import FarmerUpdate from './pages/FarmerUpdate'
import IncidentCreate from './pages/IncidentCreate'
import IncidentDashboard from './pages/IncidentDashboard'
import IncidentInformation from './pages/IncidentInformation'
import IncidentRecords from './pages/IncidentRecords'
import IncidentTabs from './layouts/IncidentTabs'
import PageNotFound from './pages/PageNotFound'
import PopulationDashboard from './pages/PopulationDashboard'
import PopulationTabs from './layouts/PopulationTabs'
import React from 'react'
import RoadLifelineFlood from './pages/RoadLifelineFlood'
import RoadLifelineLandslide from './pages/RoadLifelineLandslide'
import RoadLifelineTabs from './layouts/RoadLifelineTabs'
import SettlementAreaFlood from './pages/SettlementAreaFlood'
import SettlementAreaLandslide from './pages/SettlementAreaLandslide'
import SettlementAreaTabs from './layouts/SettlementAreaTabs'
import Sider from './layouts/Sider'
import SignIn from './pages/SignIn'
import UserCreate from './pages/UserCreate'
import UserInformation from './pages/UserInformation'
import UserRecords from './pages/UserRecords'
import UserTabs from './layouts/UserTabs'
import UserUpdate from './pages/UserUpdate'
import VictimCreate from './pages/VictimCreate'
import YourAccountProfile from './pages/YourAccountProfile'
import YourAccountTabs from './layouts/YourAccountTabs'
import YourAccountUpdate from './pages/YourAccountUpdate'

function Routes() {
  return (
    <Router>
      <SignIn path="/" />
      <Sider path="/">
        <Redirect from="/your-account" to="/your-account/information" noThrow />
        <YourAccountTabs path="your-account">
          <YourAccountProfile path="/information" />
          <YourAccountUpdate path="/information/edit" />
        </YourAccountTabs>

        <Redirect from="/settlement-area" to="/settlement-area/landslide" noThrow />
        <SettlementAreaTabs path="settlement-area">
          <SettlementAreaLandslide path="/landslide" />
          <SettlementAreaFlood path="/flood" />
        </SettlementAreaTabs>

        <Redirect from="/population" to="/population/dashboard" noThrow />
        <PopulationTabs path="population">
          <PopulationDashboard path="/dashboard" />
        </PopulationTabs>

        <Redirect from="/agriculture" to="/agriculture/landslide" noThrow />
        <AgricultureTabs path="agriculture">
          <AgricultureLandslide path="/landslide" />
          <AgricultureFlood path="/flood" />
        </AgricultureTabs>

        <Redirect from="/road-lifeline" to="/road-lifeline/landslide" noThrow />
        <RoadLifelineTabs path="road-lifeline">
          <RoadLifelineLandslide path="/landslide" />
          <RoadLifelineFlood path="/flood" />
        </RoadLifelineTabs>

        <Redirect from="/incidents" to="/incidents/dashboard" noThrow />
        <IncidentTabs path="incidents">
          <IncidentDashboard path="/dashboard" />
          <IncidentRecords path="/records" />
          <IncidentInformation path="/records/:incident_id" />
          <IncidentCreate path="/records/add" />
          <VictimCreate path="/records/:incident_id/victims/add" />
        </IncidentTabs>

        <Redirect from="/evacuation" to="/evacuation/dashboard" noThrow />
        <EvacuationTabs path="/evacuation">
          <EvacuationDashboard path="/dashboard" />
          <EvacuationCenterRecords path="/centers" />
          <EvacuationCenterInformation path="/centers/:evacuation_center_id" />
          <EvacuationCenterMap path="/map" />
        </EvacuationTabs>

        <Redirect from="/farmers" to="/farmers/dashboard" noThrow />
        <FarmerTabs path="farmers">
          <FarmerDashboard path="/dashboard" />
          <FarmerRecords path="/records" />
          <FarmerCreate path="/records/add" />
          <FarmerInformation path="/records/:farmer_id" />
          <FarmerUpdate path="/records/:farmer_id/edit" />
          <FarmCreate path="/records/:farmer_id/farms/add" />
          <FarmUpdate path="/records/:farmer_id/farms/:farm_id/edit" />
          <FarmerMap path="/map" />
        </FarmerTabs>

        <Redirect from="/users" to="/users/records" noThrow />
        <UserTabs path="users">
          <UserRecords path="/records" />
          <UserCreate path="/records/add" />
          <UserInformation path="/records/:user_id" />
          <UserUpdate path="/records/:user_id/edit" />
        </UserTabs>

        <PageNotFound path="/404" />
      </Sider>
    </Router>
  )
}

export default Routes
