import './IncidentBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function IncidentBarChart() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Total Incident" style={{ axisLabel: { fill: '#DF9C20', fontSize: 16, padding: -230 } }} />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 5, fontSize: 12, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          interpolation="natural"
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 48 }, labels: { fill: '#DF9C20', fontSize: 14 } }}
          data={[
            { x: 'Medical', y: 66 },
            { x: 'Obstetric', y: 10 },
            { x: 'Transfer', y: 53 },
            { x: 'Trauma', y: 99 },
            { x: 'Other', y: 13 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default IncidentBarChart
