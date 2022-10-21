import './PWDBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import React from 'react'

function PWDBarChart() {
  return (
    <div className="fpdpwdbc">
      <VictoryChart padding={32} domainPadding={{ x: [32, 32], y: [16, 32] }} height={250}>
        <VictoryAxis
          label="Persons With Disabilities"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 16, padding: -220 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          label="Quirino Province: 358 PWDs"
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
            { x: 'Aglipay', y: 735 },
            { x: 'Cabarroguis', y: 937 },
            { x: 'Diffun', y: 371 },
            { x: 'Maddela', y: 459 },
            { x: 'Nagtipunan', y: 612 },
            { x: 'Saguday', y: 475 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default PWDBarChart
