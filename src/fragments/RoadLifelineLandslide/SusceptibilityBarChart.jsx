import './SusceptibilityBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function SusceptibilityBarChart() {
  return (
    <div className="frlsbc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          interpolation="natural"
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 48 }, labels: { fill: '#DF9C20', fontSize: 16 } }}
          data={[
            { x: 'Low', y: 516158 },
            { x: 'Moderate', y: 509350 },
            { x: 'High', y: 278401 },
            { x: 'Very High', y: 3322 }
          ]}
        />
        <VictoryAxis
          label="Road Lifeline"
          style={{
            axis: { stroke: 'transparent' },
            axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -245 },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' }
          }}
        />
        <VictoryAxis
          label="Susceptibility and Length (m)"
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            axisLabel: { fill: '#FFFFFF', fontSize: 16, padding: -225 },
            tickLabels: { fill: 'transparent' }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            ticks: { stroke: 'transparent' },
            tickLabels: { padding: 5, fontSize: 14, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { stroke: 'transparent', fill: 'transparent' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default SusceptibilityBarChart
