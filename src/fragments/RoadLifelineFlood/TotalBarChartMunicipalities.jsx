import './TotalBarChartMunicipalities.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'

function TotalBarChartMunicipalities() {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [30, 30], y: [0, 24] }} padding={{ left: 16, right: 16, bottom: 32, top: 32 }} height={170}>
        <VictoryBar
          labelComponent={<VictoryLabel dy={-5} />}
          labels={({ datum }) => `${datum.y.toLocaleString()}`}
          style={{ data: { fill: '#20A8DF', fillOpacity: 0.2, width: 28 }, labels: { fill: '#DF9C20', fontSize: 8 } }}
          data={[
            { x: 'Aglipay', y: 22728 },
            { x: 'Cabarroguis', y: 2811 },
            { x: 'Diffun ', y: 0 },
            { x: 'Maddela ', y: 114659 },
            { x: 'Nagtipunan', y: 1994 },
            { x: 'Saguday', y: 0 }
          ]}
        />
        <VictoryLine
          interpolation="step"
          style={{ data: { stroke: '#DF9C20', strokeWidth: 1 } }}
          data={[
            { x: 'Aglipay', y: 22728 },
            { x: 'Cabarroguis', y: 2811 },
            { x: 'Diffun ', y: 0 },
            { x: 'Maddela ', y: 114659 },
            { x: 'Nagtipunan', y: 1994 },
            { x: 'Saguday', y: 0 }
          ]}
        />
        <VictoryAxis
          label="Total Road Length (m) of Municipalities Prone to Landslide"
          style={{
            axis: { stroke: 'transparent' },
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -120 },
            tickLabels: { opacity: 0 }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: '#FFFFFF' },
            tickLabels: { padding: 2, fontSize: 6, fontWeight: 100, fill: '#FFFFFF' },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { opacity: 0 },
            grid: { stroke: '#73858C', strokeDasharray: '7' }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default TotalBarChartMunicipalities
