import './RoadClassificationBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function RoadClassificationBarChart() {
  return (
    <div className="frlfrcbc">
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{
            data: { fill: '#20A8DF', fillOpacity: 0.5, width: 48 },
            labels: { fill: '#DF9C20', fontSize: 16 }
          }}
          data={[
            { x: 'National', y: 24827 },
            { x: 'Provincial', y: 13704 },
            { x: 'Municipal', y: 454 },
            { x: 'Barangay', y: 103207 }
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
          label="Road Classification and Length (m)"
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

export default RoadClassificationBarChart
