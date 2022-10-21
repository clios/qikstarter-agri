import './SusceptibilityBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function SusceptibilityBarChart() {
  return (
    <div className="fsalsbc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Susceptibility and Area (ha) Comparison" style={{ axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -230 } }} />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 5, fontSize: 14, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          interpolation="natural"
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 48 }, labels: { fill: '#DF9C20', fontSize: 16 } }}
          data={[
            { x: 'Low', y: 996.874 },
            { x: 'Moderate', y: 713.299 },
            { x: 'High', y: 364.319 },
            { x: 'Very High', y: 2.943 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default SusceptibilityBarChart
