import './TotalPopulationPieChart.css'

import React from 'react'
import { VictoryPie } from 'victory'

function TotalPopulationPieChart() {
  return (
    <div className="fpdtppc">
      <p className="fpdtppc-title">Quirino Province</p>
      <p className="fpdtppc-subtitle">Total Population</p>
      <div>
        <VictoryPie
          height={120}
          colorScale={['#DFDF20', '#20A8DF']}
          innerRadius={10}
          labelRadius={50}
          padAngle={1}
          radius={({ datum }) => (datum.y / 300000) * 100 + 120}
          data={[
            { x: 'Female', y: 170000 },
            { x: 'Male', y: 130000 }
          ]}
          style={{ labels: { fontSize: 16, fill: '#000000' }, data: { fillOpacity: 0.7 } }}
        />
      </div>
      <p className="fpdtppc-value">300,000</p>
      <p className="fpdtppc-label">Residents</p>
    </div>
  )
}

export default TotalPopulationPieChart
