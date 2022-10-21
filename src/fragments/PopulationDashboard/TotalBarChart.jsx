import './TotalBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory'

import React from 'react'

function TotalBarChart() {
  return (
    <div className="fpdtbc">
      <VictoryChart domainPadding={{ x: [32, 32], y: [0, 24] }} height={200}>
        <VictoryAxis
          label="Total Population of Municipalities"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -115 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 5, fontSize: 6, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labelComponent={<VictoryLabel dy={-5} />}
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 32 }, labels: { fill: '#DF9C20', fontSize: 8 } }}
          data={[
            { x: 'Aglipay', y: 30000 },
            { x: 'Cabarroguis', y: 33000 },
            { x: 'Diffun', y: 56000 },
            { x: 'Maddela', y: 40000 },
            { x: 'Nagtipunan', y: 25000 },
            { x: 'Saguday', y: 17000 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default TotalBarChart
