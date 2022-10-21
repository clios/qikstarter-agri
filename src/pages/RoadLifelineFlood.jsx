import './RoadLifelineFlood.css'

import FadeAnimation from '../components/FadeAnimation'
import PageContent from '../components/PageContent'
import React from 'react'
import RoadClassificationBarChart from '../fragments/RoadLifelineFlood/RoadClassificationBarChart'
import RoadLengthMatrix from '../fragments/RoadLifelineFlood/RoadLengthMatrix'
import RoadTypeTable from '../fragments/RoadLifelineFlood/RoadTypeTable'
import SusceptibilityBarChart from '../fragments/RoadLifelineFlood/SusceptibilityBarChart'
import SusceptibilityBarChartMunicipalities from '../fragments/RoadLifelineFlood/SusceptibilityBarChartMunicipalities'
import TotalBarChartMunicipalities from '../fragments/RoadLifelineFlood/TotalBarChartMunicipalities'
import TotalCard from '../fragments/RoadLifelineFlood/TotalCard'

function RoadLifelineFlood() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="prlf-row-one">
          <SusceptibilityBarChart />
          <TotalCard />
          <RoadClassificationBarChart />
        </div>
        <div className="prlf-row-two">
          <TotalBarChartMunicipalities />
        </div>
        <div>
          <RoadTypeTable />
        </div>
        <div>
          <SusceptibilityBarChartMunicipalities />
        </div>
        <div>
          <RoadLengthMatrix />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default RoadLifelineFlood
