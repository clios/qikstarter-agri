import './IncidentAreaChart.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'

function IncidentAreaChart() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [30, 30], y: [0, 24] }} padding={{ left: 16, right: 16, bottom: 32, top: 32 }} height={170}>
        <VictoryBar
          labelComponent={<VictoryLabel dy={-5} />}
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 24 }, labels: { fill: '#DF9C20', fontSize: 10 } }}
          data={[
            { x: '10-2022', y: 17 },
            { x: '11-2022', y: 17 },
            { x: '12-2022', y: 5 },
            { x: '01-2022', y: 12 },
            { x: '02-2022', y: 22 },
            { x: '03-2022', y: 10 },
            { x: '04-2022', y: 14 },
            { x: '05-2022', y: 7 },
            { x: '06-2022', y: 5 },
            { x: '07-2022', y: 9 },
            { x: '08-2022', y: 14 },
            { x: '09-2022', y: 0 }
          ]}
        />
        <VictoryLine
          interpolation="step"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 1 } }}
          data={[
            { x: '10-2022', y: 17 },
            { x: '11-2022', y: 17 },
            { x: '12-2022', y: 5 },
            { x: '01-2022', y: 12 },
            { x: '02-2022', y: 22 },
            { x: '03-2022', y: 10 },
            { x: '04-2022', y: 14 },
            { x: '05-2022', y: 7 },
            { x: '06-2022', y: 5 },
            { x: '07-2022', y: 9 },
            { x: '08-2022', y: 14 },
            { x: '09-2022', y: 0 }
          ]}
        />
        <VictoryAxis
          label="Incidents in the last year"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 9, padding: -130 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          label="132 Incidents"
          style={{
            axisLabel: { fill: '#FFFFFF', fontSize: 9, padding: -120 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 2, fontSize: 7, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
      </VictoryChart>
    </div>
  )
}

export default IncidentAreaChart
