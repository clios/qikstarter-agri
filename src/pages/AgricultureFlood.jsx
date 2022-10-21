import './AgricultureFlood.css'

import AnnualBarChart from '../fragments/AgricultureFlood/AnnualBarChart'
import AnnualTotalBarChartMunicipalities from '../fragments/AgricultureFlood/AnnualTotalBarChartMunicipalities'
import FadeAnimation from '../components/FadeAnimation'
import PageContent from '../components/PageContent'
import PerennialBarChart from '../fragments/AgricultureFlood/PerennialBarChart'
import PerennialTotalBarChartMunicipalities from '../fragments/AgricultureFlood/PerennialTotalBarChartMunicipalities'
import React from 'react'
import TotalCard from '../fragments/AgricultureFlood/TotalCard'

function AgricultureFlood() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="paf-row-one">
          <AnnualBarChart />
          <TotalCard />
          <PerennialBarChart />
        </div>
        <div className="paf-row-two">
          <AnnualTotalBarChartMunicipalities />
          <PerennialTotalBarChartMunicipalities />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default AgricultureFlood
