import './RoadLifelineLandslide.css'

import FadeAnimation from '../components/FadeAnimation'
import PageContent from '../components/PageContent'
import React from 'react'
import RoadClassificationBarChart from '../fragments/RoadLifelineLandslide/RoadClassificationBarChart'
import RoadLengthMatrix from '../fragments/RoadLifelineLandslide/RoadLengthMatrix'
import RoadTypeTable from '../fragments/RoadLifelineLandslide/RoadTypeTable'
import SusceptibilityBarChart from '../fragments/RoadLifelineLandslide/SusceptibilityBarChart'
import SusceptibilityBarChartMunicipalities from '../fragments/RoadLifelineLandslide/SusceptibilityBarChartMunicipalities'
import TotalBarChartMunicipalities from '../fragments/RoadLifelineLandslide/TotalBarChartMunicipalities'
import TotalCard from '../fragments/RoadLifelineLandslide/TotalCard'

function RoadLifelineLandslide() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="prll-row-one">
          <SusceptibilityBarChart />
          <TotalCard />
          <RoadClassificationBarChart />
        </div>
        <div className="prll-row-two">
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

export default RoadLifelineLandslide
