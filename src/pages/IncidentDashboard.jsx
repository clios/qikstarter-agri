import './IncidentDashboard.css'

import FadeAnimation from '../components/FadeAnimation'
import IncidentAreaChart from '../fragments/IncidentDashboard/IncidentAreaChart'
import IncidentBarChart from '../fragments/IncidentDashboard/IncidentBarChart'
import PageContent from '../components/PageContent'
import React from 'react'
import VictimAreaChart from '../fragments/IncidentDashboard/VictimAreaChart'
import VictimBarChart from '../fragments/IncidentDashboard/VictimBarChart'

function IncidentDashboard() {
  return (
    <PageContent>
      <FadeAnimation>
        <div className="pid-row-one">
          <IncidentBarChart />
          <VictimBarChart />
        </div>
        <div>
          <IncidentAreaChart />
        </div>
        <div>
          <VictimAreaChart />
        </div>
      </FadeAnimation>
    </PageContent>
  )
}

export default IncidentDashboard
