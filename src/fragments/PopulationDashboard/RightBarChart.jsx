import './RightBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip } from 'victory'

import React from 'react'

function RightBarChart() {
  return (
    <div className="fpdrbc">
      <VictoryChart padding={{ left: 32, top: 32, right: 32 }} domainPadding={{ x: [32, 32], y: [32, 32] }}>
        <VictoryAxis
          style={{
            tickLabels: { opacity: 0 },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { opacity: 0 },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryBar
          horizontal
          labelComponent={
            <VictoryTooltip x={32} cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          labels={({ datum }) => `${datum.x}: ${datum.y.toLocaleString()} females`}
          style={{
            data: { fill: '#DFDF20', width: 30, opacity: 0.2 },
            labels: { fill: '#FFFFFF', fontSize: 12 }
          }}
          data={[
            { x: 'Saguday', y: 17000 },
            { x: 'Nagtipunan', y: 25000 },
            { x: 'Maddela', y: 40000 },
            { x: 'Diffun', y: 56000 },
            { x: 'Cabarroguis', y: 33000 },
            { x: 'Aglipay', y: 30000 }
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default RightBarChart
