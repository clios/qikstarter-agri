import './VictimBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function VictimBarChart() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [50, 50], y: [16, 50] }}>
        <VictoryAxis label="Total Victim" style={{ axisLabel: { fill: '#DF9C20', fontSize: 16, padding: -230 } }} />
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
          style={{
            data: {
              fill: ({ datum }) => {
                if (datum.x === 'Green') return '#20DF20'
                if (datum.x === 'Yellow') return '#DFDF20'
                if (datum.x === 'Red') return '#DF2020'
                if (datum.x === 'Black') return '#171B1C'
              },
              fillOpacity: 0.5,
              width: 48
            },
            labels: { fill: '#DF9C20', fontSize: 14 }
          }}
          data={[
            { x: 'Green', y: 150 },
            { x: 'Yellow', y: 80 },
            { x: 'Red', y: 21 },
            { x: 'Black', y: 2 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default VictimBarChart
