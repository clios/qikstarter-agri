import './SusceptibilityAreaChart.css'

import { VictoryArea, VictoryAxis, VictoryChart, VictoryTooltip } from 'victory'

import React from 'react'

function SusceptibilityAreaChart() {
  return (
    <div className="fsalsac">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Susceptibility and Area (ha) Relation" style={{ axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -230 } }} />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 5, fontSize: 14, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryArea
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          interpolation="natural"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 3, fill: '#20A8DF', fillOpacity: 0.2 }, labels: { color: 'red' } }}
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

export default SusceptibilityAreaChart
