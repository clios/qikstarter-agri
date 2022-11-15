import CornArea from '../fragments/FarmerDashboard/CornArea'
import DashboardContent from '../components/DashboardContent'
import DashboardItem from '../components/DashboardItem'
import FadeAnimation from '../components/FadeAnimation'
import Fishery from '../fragments/FarmerDashboard/Fishery'
import HighValueCrops from '../fragments/FarmerDashboard/HighValueCrops'
import HighValueCropsSubVariety from '../fragments/FarmerDashboard/HighValueCropsSubVariety'
import Livestock from '../fragments/FarmerDashboard/Livestock'
import PageContent from '../components/PageContent'
import PopulationPerAge from '../fragments/FarmerDashboard/PopulationPerAge'
import PopulationPerCivilStatus from '../fragments/FarmerDashboard/PopulationPerCivilStatus'
import Poultry from '../fragments/FarmerDashboard/Poultry'
import React from 'react'
import RiceArea from '../fragments/FarmerDashboard/RiceArea'
import TotalFarmers from '../fragments/FarmerDashboard/TotalFarmers'

function FarmerDashboard() {
  return (
    <PageContent>
      <FadeAnimation>
        <DashboardContent>
          <DashboardItem title="Farmer Population">
            <TotalFarmers />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Farmer Per Age">
            <PopulationPerAge />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Farmer Per Civil Status">
            <PopulationPerCivilStatus />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Rice Area">
            <RiceArea />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Corn Area">
            <CornArea />
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

        <DashboardContent>
          <DashboardItem title="Livestock">
            <Livestock />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Poultry">
            <Poultry />
          </DashboardItem>
        </DashboardContent>

        <DashboardContent>
          <DashboardItem title="Fish Pond">
            <Fishery />
          </DashboardItem>
        </DashboardContent>
      </FadeAnimation>
    </PageContent>
  )
}

export default FarmerDashboard
