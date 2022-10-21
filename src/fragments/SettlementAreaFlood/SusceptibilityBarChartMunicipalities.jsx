import './SusceptibilityBarChartMunicipalities.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryVoronoiContainer } from 'victory'

import React from 'react'

function SusceptibilityBarChartMunicipalities() {
  return (
    <div>
      <VictoryChart
        domainPadding={{ x: [50, 50], y: [0, 8] }}
        padding={{ left: 16, right: 16, bottom: 32, top: 32 }}
        height={160}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labelComponent={
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="start"
                labelPlacement="perpendicular"
                backgroundPadding={8}
                backgroundStyle={{ fill: '#22282A', opacity: 0.7, stroke: '#FFFFFF' }}
                style={{ fill: '#FFFFFF', fontSize: 8 }}
              />
            }
            labels={({ datum }) => {
              if (datum.childName === 'bar-chart-group-2-0') return `Low: ${datum.y?.toLocaleString()}`
              if (datum.childName === 'bar-chart-group-2-1') return `Moderate: ${datum.y?.toLocaleString()}`
              if (datum.childName === 'bar-chart-group-2-2') return `High: ${datum.y?.toLocaleString()}`
              if (datum.childName === 'bar-chart-group-2-3') return `Very High: ${datum.y?.toLocaleString()}`
            }}
          />
        }>
        <VictoryAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { padding: 2, fontSize: 6, fontWeight: 100, fill: '#FFFFFF' },
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
        <VictoryGroup offset={13} colorScale={'qualitative'}>
          {/* LOW */}
          <VictoryBar
            style={{ data: { fill: '#20DF20', fillOpacity: 0.7, width: 12 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 0 },
              { x: 'Cabarroguis', y: 0 },
              { x: 'Diffun ', y: 0 },
              { x: 'Maddela ', y: 934.188 },
              { x: 'Nagtipunan', y: 62.686 },
              { x: 'Saguday', y: 0 }
            ]}
          />
          {/* MODERATE */}
          <VictoryBar
            style={{ data: { fill: '#DFDF20', fillOpacity: 0.7, width: 12 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 29.589 },
              { x: 'Cabarroguis', y: 0 },
              { x: 'Diffun ', y: 0 },
              { x: 'Maddela ', y: 683.71 },
              { x: 'Nagtipunan', y: 0 },
              { x: 'Saguday', y: 0 }
            ]}
          />
          {/* HIGH */}
          <VictoryBar
            style={{ data: { fill: '#DF9C20', fillOpacity: 0.7, width: 12 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 134.759 },
              { x: 'Cabarroguis', y: 0 },
              { x: 'Diffun ', y: 0 },
              { x: 'Maddela ', y: 189.181 },
              { x: 'Nagtipunan', y: 40.379 },
              { x: 'Saguday', y: 0 }
            ]}
          />
          {/* VERY HIGH */}
          <VictoryBar
            style={{ data: { fill: '#DF2020', fillOpacity: 0.7, width: 12 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 0 },
              { x: 'Cabarroguis', y: 0 },
              { x: 'Diffun ', y: 0 },
              { x: 'Maddela ', y: 0 },
              { x: 'Nagtipunan', y: 2.943 },
              { x: 'Saguday', y: 0 }
            ]}
          />
        </VictoryGroup>
        <VictoryLegend
          x={139}
          y={15}
          orientation="horizontal"
          gutter={20}
          colorScale={['#20DF20', '#DFDF20', '#DF9C20', '#DF2020']}
          data={[{ name: 'Low' }, { name: 'Moderate' }, { name: 'High' }, { name: 'Very High' }]}
          style={{ labels: { fontSize: 6, fill: 'white', textAlign: 'center' } }}
        />
        <VictoryAxis
          label="Susceptibilities of Municipalities"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -122 },
            tickLabels: { opacity: 0 }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default SusceptibilityBarChartMunicipalities
