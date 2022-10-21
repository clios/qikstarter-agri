import './BridgeTotalBarChartMunicipalities.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'

function BridgeTotalBarChartMunicipalities() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [30, 30], y: [0, 24] }} padding={{ left: 16, right: 16, bottom: 32, top: 32 }} height={170}>
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 2, fontSize: 11, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { opacity: 0 }, grid: { stroke: '#73858C', strokeDasharray: '7' } }} />
        <VictoryBar
          labelComponent={<VictoryLabel dy={-5} />}
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.5, width: 28 }, labels: { fill: '#DF9C20', fontSize: 12 } }}
          data={[
            { x: 'Aglipay', y: 0 },
            { x: 'Cabarroguis', y: 2 },
            { x: 'Diffun ', y: 12 },
            { x: 'Maddela ', y: 3 },
            { x: 'Nagtipunan', y: 12 },
            { x: 'Saguday', y: 3 }
          ]}
        />
        <VictoryLine
          interpolation="step"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 1 } }}
          data={[
            { x: 'Aglipay', y: 0 },
            { x: 'Cabarroguis', y: 2 },
            { x: 'Diffun ', y: 12 },
            { x: 'Maddela ', y: 3 },
            { x: 'Nagtipunan', y: 12 },
            { x: 'Saguday', y: 3 }
          ]}
        />
        <VictoryAxis
          label="Total Bridges of Municipalities"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 14, padding: -140 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          label="Inside Landslide Prone Area"
          style={{
            axisLabel: { fill: '#FFFFFF', fontSize: 12, padding: -125 },
            tickLabels: { opacity: 0 }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default BridgeTotalBarChartMunicipalities
