import './AgricultureLandslide.css'

import AnnualBarChart from '../fragments/AgricultureLandslide/AnnualBarChart'
import AnnualTotalBarChartMunicipalities from '../fragments/AgricultureLandslide/AnnualTotalBarChartMunicipalities'
import FadeAnimation from '../components/FadeAnimation'
import PageContent from '../components/PageContent'
import PerennialBarChart from '../fragments/AgricultureLandslide/PerennialBarChart'
import PerennialTotalBarChartMunicipalities from '../fragments/AgricultureLandslide/PerennialTotalBarChartMunicipalities'
import React from 'react'
import TotalCard from '../fragments/AgricultureLandslide/TotalCard'

function AgricultureLandslide() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="pal-row-one">
          <AnnualBarChart />
          <TotalCard />
          <PerennialBarChart />
        </div>
        <div className="pal-row-two">
          <AnnualTotalBarChartMunicipalities />
          <PerennialTotalBarChartMunicipalities />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default AgricultureLandslide
