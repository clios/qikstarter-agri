import './BuildingTotalBarChartMunicipalities.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'

function BuildingTotalBarChartMunicipalities() {
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
            { x: 'Aglipay', y: 1888 },
            { x: 'Cabarroguis', y: 132 },
            { x: 'Diffun ', y: 216 },
            { x: 'Maddela ', y: 105 },
            { x: 'Nagtipunan', y: 147 },
            { x: 'Saguday', y: 96 }
          ]}
        />
        <VictoryLine
          interpolation="step"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 1 } }}
          data={[
            { x: 'Aglipay', y: 1888 },
            { x: 'Cabarroguis', y: 132 },
            { x: 'Diffun ', y: 216 },
            { x: 'Maddela ', y: 105 },
            { x: 'Nagtipunan', y: 147 },
            { x: 'Saguday', y: 96 }
          ]}
        />
        <VictoryAxis
          label="Total Buildings of Municipalities"
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

export default BuildingTotalBarChartMunicipalities
