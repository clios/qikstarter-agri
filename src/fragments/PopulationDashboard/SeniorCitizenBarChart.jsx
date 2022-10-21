import './SeniorCitizenBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function SeniorCitizenBarChart() {
  return (
    <div className="fpdscbc">
      <VictoryChart padding={32} domainPadding={{ x: [32, 32], y: [16, 32] }} height={250}>
        <VictoryAxis
          label="Senior Citizens"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 16, padding: -220 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          label="Quirino Province: 32,340 Senior Citizens"
          style={{
            axisLabel: { fill: '#FFFFFF', fontSize: 12, padding: -200 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 5, fontSize: 10, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          interpolation="natural"
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 32 }, labels: { fill: '#DF9C20', fontSize: 14 } }}
          data={[
            { x: 'Aglipay', y: 2475 },
            { x: 'Cabarroguis', y: 4572 },
            { x: 'Diffun', y: 8234 },
            { x: 'Maddela', y: 7345 },
            { x: 'Nagtipunan', y: 6344 },
            { x: 'Saguday', y: 4845 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default SeniorCitizenBarChart
