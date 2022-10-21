import './PopulationPerCivilStatus.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryVoronoiContainer } from 'victory'

import React from 'react'
import Table from '../components/Table'

function PopulationPerCivilStatus() {
  return (
    <div className="population-per-civil-status">
      <div className="population-per-civil-status-chart">
        <div className="population-per-civil-status-legend">
          <div className="population-per-civil-status-legend-item">
            <div className="box-blue" />
            <div>Male</div>
          </div>
          <div className="population-per-civil-status-legend-item">
            <div className="box-yellow" />
            <div>Female</div>
          </div>
        </div>
        <VictoryChart
          domainPadding={{
            x: [30, 30],
            y: [30, 16]
          }}
          padding={{
            left: 30,
            right: 30,
            bottom: 20,
            top: 10
          }}
          height={180}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }) => (datum.childName === 'bar-chart-group-2-0' ? `Male: ${datum.y}` : `Female: ${datum.y}`)}
            />
          }>
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dy={0} dx={10} />}
            style={{
              axis: {
                stroke: 'white' //CHANGE COLOR OF X-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 10,
                fontWeight: 10,
                fill: 'white' //CHANGE COLOR OF X-AXIS LABELS
              },
              grid: {
                stroke: 'grey', //CHANGE COLOR OF X-AXIS GRID LINES
                strokeDasharray: '7'
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => y.toLocaleString()}
            style={{
              axis: {
                stroke: 'white' //CHANGE COLOR OF Y-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 10,
                fontWeight: 'lighter',
                fill: 'white' //CHANGE COLOR OF Y-AXIS LABELS
              },
              grid: {
                stroke: 'grey', //CHANGE COLOR OF Y-AXIS GRID LINES
                strokeDasharray: '7'
              }
            }}
          />
          <VictoryGroup offset={20} colorScale={'qualitative'}>
            {/* MALE */}
            <VictoryBar
              style={{ data: { fill: '#20A8DF' }, labels: { fontSize: 9 } }}
              data={[
                { x: 'Single', y: 2376 },
                { x: 'Married', y: 4973 },
                { x: 'Divorced ', y: 198 },
                { x: 'Widowed ', y: 742 },
                { x: 'Separated ', y: 597 }
              ]}
            />
            {/* FEMALE */}
            <VictoryBar
              style={{ data: { fill: '#DFDF20' }, labels: { fontSize: 9 } }}
              data={[
                { x: 'Single', y: 3278 },
                { x: 'Married', y: 5278 },
                { x: 'Divorced ', y: 57 },
                { x: 'Widowed ', y: 1209 },
                { x: 'Separated ', y: 519 }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
      <div>
        <Table className="no-click" headers={['Civil Status', 'Male', 'Female', 'Total']}>
          <tr>
            <td>Single</td>
            <td>2376</td>
            <td>3278</td>
            <td>5923</td>
          </tr>
          <tr>
            <td>Married</td>
            <td>4973</td>
            <td>5278</td>
            <td>9673</td>
          </tr>
          <tr>
            <td>Divorced</td>
            <td>198</td>
            <td>57</td>
            <td>281</td>
          </tr>
          <tr>
            <td>Widowed</td>
            <td>3095</td>
            <td>1209</td>
            <td>4983</td>
          </tr>
          <tr>
            <td>Separated</td>
            <td>597</td>
            <td>519</td>
            <td>1072</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>10597</td>
            <td>9783</td>
            <td>19783</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default PopulationPerCivilStatus
