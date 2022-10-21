import './AnnualBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function AnnualBarChart() {
  return (
    <div className="falabc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Annual Crops: 53,855 Hectares" style={{ axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -245 } }} />
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
            { x: 'Low', y: 14958 },
            { x: 'Moderate', y: 15818 },
            { x: 'High', y: 19595 },
            { x: 'Very High', y: 3480 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default AnnualBarChart
