import './PerennialBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function PerennialBarChart() {
  return (
    <div className="falpbc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Perennial Crops: 78,323 Hectares" style={{ axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -245 } }} />
        <VictoryAxis label="Susceptibility and Area (ha) Comparison" style={{ axisLabel: { fill: '#FFFFFF', fontSize: 16, padding: -225 } }} />
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
            { x: 'Low', y: 9449 },
            { x: 'Moderate', y: 43492 },
            { x: 'High', y: 22387 },
            { x: 'Very High', y: 3037 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default PerennialBarChart
