import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function InfrastructureBarChart() {
  return (
    <div>
      <VictoryChart padding={{ top: 80, left: 32, bottom: 32, right: 32 }} domainPadding={{ x: [100, 100], y: [16, 50] }}>
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{
            data: {
              fill: ({ datum }) => {
                if (datum.x === 'Government') return '#DF2020'
                if (datum.x === 'Private') return '#20A8DF'
              },
              fillOpacity: 0.5,
              width: 60
            },
            labels: { fill: '#DF9C20', fontSize: 14 }
          }}
          data={[
            { x: 'Government', y: 150 },
            { x: 'Private', y: 80 }
          ]}
        />
        <VictoryAxis
          label="Infrastructure"
          style={{
            axis: { stroke: '#FFFFFF' },
            axisLabel: { fill: '#DF9C20', fontSize: 18, padding: -240 },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis
          label="230 Evacuation Centers"
          style={{
            axis: { stroke: '#FFFFFF' },
            axisLabel: { fill: '#FFFFFF', fontSize: 16, padding: -220 },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default InfrastructureBarChart
