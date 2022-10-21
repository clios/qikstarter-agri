import './SettlementAreaFlood.css'

import FadeAnimation from '../components/FadeAnimation'
import PageContent from '../components/PageContent'
import React from 'react'
import SusceptibilityAreaChart from '../fragments/SettlementAreaFlood/SusceptibilityAreaChart'
import SusceptibilityBarChart from '../fragments/SettlementAreaFlood/SusceptibilityBarChart'
import SusceptibilityBarChartMunicipalities from '../fragments/SettlementAreaFlood/SusceptibilityBarChartMunicipalities'
import TotalBarChartMinicipalities from '../fragments/SettlementAreaFlood/TotalBarChartMinicipalities'
import TotalCard from '../fragments/SettlementAreaFlood/TotalCard'

function SettlementAreaFlood() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="psaf-row-one">
          <SusceptibilityBarChart />
          <TotalCard />
          <SusceptibilityAreaChart />
        </div>
        <div className="psaf-row-two">
          <TotalBarChartMinicipalities />
        </div>
        <div className="psaf-row-three">
          <SusceptibilityBarChartMunicipalities />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default SettlementAreaFlood
