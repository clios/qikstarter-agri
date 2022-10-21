import './TotalBarChartMinicipalities.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'

function TotalBarChartMinicipalities() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [30, 30], y: [0, 24] }} padding={{ left: 16, right: 16, bottom: 32, top: 32 }} height={170}>
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 2, fontSize: 6, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labelComponent={<VictoryLabel dy={-5} />}
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.2, width: 28 }, labels: { fill: '#DF9C20', fontSize: 8 } }}
          data={[
            { x: 'Aglipay', y: 283.514 },
            { x: 'Cabarroguis', y: 373.787 },
            { x: 'Diffun ', y: 693.864 },
            { x: 'Maddela ', y: 559.635 },
            { x: 'Nagtipunan', y: 220.99 },
            { x: 'Saguday', y: 239.205 }
          ]}
        />
        <VictoryLine
          interpolation="step"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 1 } }}
          data={[
            { x: 'Aglipay', y: 283.514 },
            { x: 'Cabarroguis', y: 373.787 },
            { x: 'Diffun ', y: 693.864 },
            { x: 'Maddela ', y: 559.635 },
            { x: 'Nagtipunan', y: 220.99 },
            { x: 'Saguday', y: 239.205 }
          ]}
        />
        <VictoryAxis
          label="Flood Prone Area (ha) of Municipalities"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -120 },
            tickLabels: { opacity: 0 }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default TotalBarChartMinicipalities
