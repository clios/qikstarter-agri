import './PopulationByAgeAndSex.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryStack, VictoryVoronoiContainer } from 'victory'

import React from 'react'

function PopulationByAgeAndSex() {
  const data_male = [
    { x: 'Above 100', y: 0 },
    { x: '91 - 100', y: 1 },
    { x: '81 - 90', y: 0 },
    { x: '71 - 80', y: 13 },
    { x: '61 - 70', y: 155 },
    { x: '51 - 60', y: 1902 },
    { x: '41 - 50', y: 2548 },
    { x: '31 - 40', y: 3701 },
    { x: '21 - 30', y: 3895 },
    { x: '11 - 20', y: 4093 },
    { x: '1 - 10', y: 5736 }
  ]

  const data_female = [
    { x: 'Above 100', y: 0 },
    { x: '91 - 100', y: 0 },
    { x: '81 - 90', y: 3 },
    { x: '71 - 80', y: 23 },
    { x: '61 - 70', y: 169 },
    { x: '51 - 60', y: 1983 },
    { x: '41 - 50', y: 2523 },
    { x: '31 - 40', y: 3765 },
    { x: '21 - 30', y: 3823 },
    { x: '11 - 20', y: 4045 },
    { x: '1 - 10', y: 5783 }
  ]

  const width = 400
  const height = 400

  return (
    <div>
      <VictoryChart horizontal height={height} width={width} padding={40} domainPadding={30}>
        <VictoryStack style={{ data: { width: 8 }, labels: { fontSize: 6, fill: '#FFFFFF' } }}>
          <VictoryBar
            style={{ data: { fill: '#20A8DF', opacity: 0.5 } }}
            data={data_male}
            y={(data) => -Math.abs(data.y)}
            labels={({ datum }) => {
              if (Number(datum.y) <= 0) {
                return null
              } else {
                return `${datum.y?.toLocaleString()}`
              }
            }}
          />
          <VictoryBar
            style={{ data: { fill: '#DFDF20', opacity: 0.5 } }}
            data={data_female}
            labels={({ datum }) => {
              if (Number(datum.y) <= 0) {
                return null
              } else {
                return `${datum.y?.toLocaleString()}`
              }
            }}
          />
        </VictoryStack>
        <VictoryAxis
          axisLabelComponent={<VictoryLabel dy={-170} angle={0} />}
          label="Population by Age Bracket"
          style={{
            grid: { stroke: '#73858C', strokeDasharray: '7' },
            axis: { stroke: 'transparent' },
            axisLabel: { fill: '#DF9C20', fontSize: 8, padding: 0, stroke: 'transparent' },
            tickLabels: { opacity: 0, stroke: 'transparent' }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fontSize: 5, fill: '#DF9C20', fontWeight: 300 }
          }}
          tickLabelComponent={<VictoryLabel dy={-7} x={width / 2} textAnchor="middle" />}
          tickValues={data_male.map((point) => point.x).reverse()}
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: { stroke: '#73858C', strokeDasharray: '7' },
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' }
          }}
        />
        <VictoryLegend
          x={160}
          y={30}
          orientation="horizontal"
          gutter={20}
          colorScale={['#20A8DF', '#DFDF20']}
          data={[{ name: 'Male' }, { name: 'Female' }]}
          style={{ labels: { fontSize: 6, fill: 'white', textAlign: 'center' } }}
        />
      </VictoryChart>
    </div>
  )
}

export default PopulationByAgeAndSex
