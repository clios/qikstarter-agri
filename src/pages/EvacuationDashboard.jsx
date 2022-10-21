import './EvacuationDashboard.css'

import CapacityBarChart from '../fragments/EvacuationDashboard/CapacityBarChart'
import FadeAnimation from '../components/FadeAnimation'
import InfrastructureBarChart from '../fragments/EvacuationDashboard/InfrastructureBarChart'
import MunicipalitiesCapacityBarChart from '../fragments/EvacuationDashboard/MunicipalitiesCapacityBarChart'
import MunicipalitiesInfrastructureBarChart from '../fragments/EvacuationDashboard/MunicipalitiesInfrastructureBarChart'
import PageContent from '../components/PageContent'
import React from 'react'
import TotalCard from '../fragments/EvacuationDashboard/TotalCard'

function EvacuationDashboard() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="ped-row-one">
          <InfrastructureBarChart />
          <TotalCard />
          <CapacityBarChart />
        </div>
        <div>
          <MunicipalitiesInfrastructureBarChart />
        </div>
        <div>
          <MunicipalitiesCapacityBarChart />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default EvacuationDashboard
