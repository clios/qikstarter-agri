import './SexBarChart.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryVoronoiContainer } from 'victory'

import React from 'react'

function SexBarChart() {
  return (
    <div className="fpdsbc">
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
              if (datum.childName === 'bar-chart-group-2-0') return `Male: ${datum.y?.toLocaleString()}`
              if (datum.childName === 'bar-chart-group-2-1') return `Female: ${datum.y?.toLocaleString()}`
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
        <VictoryGroup offset={18} colorScale={'qualitative'}>
          {/* MALE */}
          <VictoryBar
            style={{ data: { fill: '#20A8DF', fillOpacity: 0.7, width: 15 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 283 },
              { x: 'Cabarroguis', y: 373 },
              { x: 'Diffun ', y: 693 },
              { x: 'Maddela ', y: 559 },
              { x: 'Nagtipunan', y: 220 },
              { x: 'Saguday', y: 239 }
            ]}
          />
          {/* FEMALE */}
          <VictoryBar
            style={{ data: { fill: '#DFDF20', fillOpacity: 0.7, width: 15 }, labels: { fontSize: 6 } }}
            data={[
              { x: 'Aglipay', y: 309 },
              { x: 'Cabarroguis', y: 513 },
              { x: 'Diffun ', y: 729 },
              { x: 'Maddela ', y: 562 },
              { x: 'Nagtipunan', y: 258 },
              { x: 'Saguday', y: 253 }
            ]}
          />
        </VictoryGroup>
        <VictoryLegend
          x={187}
          y={15}
          orientation="horizontal"
          gutter={20}
          colorScale={['#20A8DF', '#DFDF20']}
          data={[{ name: 'Male' }, { name: 'Female' }]}
          style={{ labels: { fontSize: 6, fill: 'white', textAlign: 'center' } }}
        />
        <VictoryAxis
          label="Total Population of Municipalities by Sex"
          style={{
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: -122 },
            tickLabels: { opacity: 0 }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default SexBarChart
