import './BuildingBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function BuildingBarChart() {
  return (
    <div className="fcifbuildingbc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="206 Buildings" style={{ axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -245 } }} />
        <VictoryAxis label="Susceptibilities" style={{ axisLabel: { fill: '#FFFFFF', fontSize: 16, padding: -225 } }} />
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
            { x: 'Low', y: 50 },
            { x: 'Moderate', y: 17 },
            { x: 'High', y: 139 },
            { x: 'Very High', y: 0 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default BuildingBarChart
