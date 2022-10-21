import './PopulationPerAge.css'

import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from 'victory'

import React from 'react'
import Table from '../components/Table'

function PopulationPerAge() {
  return (
    <div className="population-per-age">
      <div className="population-per-age-chart">
        <div className="population-per-age-legend">
          <div className="population-per-age-legend-item">
            <div className="box-green" />
            <div>Total</div>
          </div>
          <div className="population-per-age-legend-item">
            <div className="box-blue" />
            <div>Male</div>
          </div>
          <div className="population-per-age-legend-item">
            <div className="box-yellow" />
            <div>Female</div>
          </div>
        </div>
        <VictoryChart
          domainPadding={{
            x: [16, 16],
            y: [30, 16]
          }}
          padding={{
            left: 30,
            right: 30,
            bottom: 20,
            top: 0
          }}
          height={180}>
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dy={0} dx={10} />}
            style={{
              axis: {
                stroke: 'white' //CHANGE COLOR OF X-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 10,
                fontWeight: 100,
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
          {/* TOTAL */}
          <VictoryLine
            style={{ data: { stroke: '#20DF20', strokeWidth: 1 } }}
            data={[
              { x: 'Below 20', y: 30 },
              { x: '20 - 29', y: 1246 },
              { x: '30 - 39 ', y: 2457 },
              { x: '40 - 49 ', y: 3476 },
              { x: '50 - 59 ', y: 2921 },
              { x: 'Above 60', y: 509 }
            ]}
            // labels={({ datum }) => datum.y.toLocaleString()}
            labelComponent={<VictoryLabel dy={-5} style={{ fontSize: 8, fill: '#20DF20' }} />}
          />
          {/* MALE */}
          <VictoryLine
            style={{ data: { stroke: '#20A8DF', strokeWidth: 1 } }}
            data={[
              { x: 'Below 20', y: 20 },
              { x: '20 - 29', y: 263 },
              { x: '30 - 39 ', y: 2049 },
              { x: '40 - 49 ', y: 3095 },
              { x: '50 - 59 ', y: 1023 },
              { x: 'Above 60', y: 309 }
            ]}
            // labels={({ datum }) => datum.y.toLocaleString()}
            labelComponent={<VictoryLabel dy={-5} style={{ fontSize: 8, fill: '#20A8DF' }} />}
          />
          {/* FEMALE */}
          <VictoryLine
            style={{ data: { stroke: '#DFDF20', strokeWidth: 1 } }}
            data={[
              { x: 'Below 20', y: 10 },
              { x: '20 - 29', y: 127 },
              { x: '30 - 39 ', y: 394 },
              { x: '40 - 49 ', y: 409 },
              { x: '50 - 59 ', y: 192 },
              { x: 'Above 60', y: 12 }
            ]}
            // labels={({ datum }) => datum.y.toLocaleString()}
            labelComponent={<VictoryLabel dy={-5} style={{ fontSize: 8, fill: '#DFDF20' }} />}
          />
        </VictoryChart>
      </div>
      <div>
        <Table className="no-click" headers={['Age', 'Male', 'Female', 'Total']}>
          <tr>
            <td>Below 20</td>
            <td>20</td>
            <td>10</td>
            <td>30</td>
          </tr>
          <tr>
            <td>20 - 29</td>
            <td>263</td>
            <td>127</td>
            <td>1246</td>
          </tr>
          <tr>
            <td>30 - 39</td>
            <td>2049</td>
            <td>394</td>
            <td>2457</td>
          </tr>
          <tr>
            <td>40 - 49</td>
            <td>3095</td>
            <td>409</td>
            <td>3476</td>
          </tr>
          <tr>
            <td>50 - 59</td>
            <td>1023</td>
            <td>192</td>
            <td>2921</td>
          </tr>
          <tr>
            <td>Above 59</td>
            <td>309</td>
            <td>12</td>
            <td>509</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>6893</td>
            <td>987</td>
            <td>7403</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default PopulationPerAge
