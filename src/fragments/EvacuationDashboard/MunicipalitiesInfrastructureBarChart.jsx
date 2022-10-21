import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryVoronoiContainer } from 'victory'

import React from 'react'

function MunicipalitiesInfrastructureBarChart() {
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
              if (datum.childName === 'bar-chart-group-2-0') return `Government: ${datum.y}`
              if (datum.childName === 'bar-chart-group-2-1') return `Private: ${datum.y}`
            }}
          />
        }>
        <VictoryAxis
          label="Total Infrastructure of Municipalities"
          style={{
            axis: { stroke: 'white' },
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -122 },
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
        <VictoryGroup offset={18}>
          {/* GOVERNMENT */}
          <VictoryBar
            style={{ data: { fill: '#DF2020', fillOpacity: 0.7, width: 15 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 14 },
              { x: 'Cabarroguis', y: 24 },
              { x: 'Diffun ', y: 25 },
              { x: 'Maddela ', y: 29 },
              { x: 'Nagtipunan', y: 17 },
              { x: 'Saguday', y: 8 }
            ]}
          />
          {/* PRIVATE */}
          <VictoryBar
            style={{ data: { fill: '#20A8DF', fillOpacity: 0.7, width: 15 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 7 },
              { x: 'Cabarroguis', y: 13 },
              { x: 'Diffun ', y: 14 },
              { x: 'Maddela ', y: 17 },
              { x: 'Nagtipunan', y: 7 },
              { x: 'Saguday', y: 4 }
            ]}
          />
        </VictoryGroup>
        <VictoryLegend
          x={177}
          y={15}
          orientation="horizontal"
          gutter={20}
          colorScale={['#DF2020', '#20A8DF']}
          data={[{ name: 'Government' }, { name: 'Private' }]}
          style={{ labels: { fontSize: 6, fill: 'white', textAlign: 'center' } }}
        />
      </VictoryChart>
    </div>
  )
}

export default MunicipalitiesInfrastructureBarChart
