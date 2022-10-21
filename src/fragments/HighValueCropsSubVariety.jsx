import './HighValueCropsSubVariety.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryVoronoiContainer } from 'victory'

import React from 'react'
import Table from '../components/Table'

function HighValueCropsSubVariety() {
  return (
    <div className="hvc-subs">
      <div>
        <VictoryChart
          domainPadding={{
            x: [30, 30],
            y: [30, 50]
          }}
          padding={{
            left: 120,
            right: 30,
            bottom: 20,
            top: 10
          }}
          height={600}>
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dy={0} dx={-10} />}
            tickFormat={(y) => y}
            style={{
              axis: {
                stroke: 'white' //CHANGE COLOR OF X-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 16,
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
                fontSize: 16,
                fontWeight: 'lighter',
                fill: 'white' //CHANGE COLOR OF Y-AXIS LABELS
              },
              grid: {
                stroke: 'grey', //CHANGE COLOR OF Y-AXIS GRID LINES
                strokeDasharray: '7'
              }
            }}
          />
          <VictoryGroup horizontal offset={20} style={{ data: { width: 15 } }} colorScale={['#df9c20']}>
            <VictoryBar
              data={[
                { x: 'Onion', y: 56 },
                { x: 'Ginger', y: 26 },
                { x: 'Ube', y: 72 },
                { x: 'Taro', y: 53 },
                { x: 'Sweet Potato', y: 14 },
                { x: 'Rambutan', y: 45 },
                { x: 'Pomelo', y: 24 },
                { x: 'Mango', y: 75 },
                { x: 'Mandarin', y: 25 },
                { x: 'Lemon', y: 14 },
                { x: 'Guyabano', y: 46 },
                { x: 'Calamansi', y: 25 },
                { x: 'Robusta', y: 35 },
                { x: 'Liberica', y: 41 },
                { x: 'Arabica', y: 32 },
                { x: 'Saba', y: 17 },
                { x: 'Latundan', y: 59 },
                { x: 'Lakatan', y: 41 }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
      <div>
        <Table className="no-click" headers={['Variety', 'Sub Variety', 'Hectares']}>
          <tr>
            <td>Banana</td>
            <td>Lakatan</td>
            <td>41</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>Latundan</td>
            <td>59</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>Saba</td>
            <td>17</td>
          </tr>
          <tr>
            <td>Coffee</td>
            <td>Arabica</td>
            <td>32</td>
          </tr>
          <tr>
            <td>Coffee</td>
            <td>Liberica</td>
            <td>41</td>
          </tr>
          <tr>
            <td>Coffee</td>
            <td>Robusta</td>
            <td>35</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Calamansi</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Guyabano</td>
            <td>46</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Lemon</td>
            <td>14</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Mandarin</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Mango</td>
            <td>75</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Pomelo</td>
            <td>24</td>
          </tr>
          <tr>
            <td>Fruit Tree</td>
            <td>Rambutan</td>
            <td>45</td>
          </tr>
          <tr>
            <td>Root Crop</td>
            <td>Sweet Potato</td>
            <td>14</td>
          </tr>
          <tr>
            <td>Root Crop</td>
            <td>Taro</td>
            <td>53</td>
          </tr>
          <tr>
            <td>Root Crop</td>
            <td>Ube</td>
            <td>72</td>
          </tr>
          <tr>
            <td>Spices</td>
            <td>Ginger</td>
            <td>26</td>
          </tr>
          <tr>
            <td>Spices</td>
            <td>Onion</td>
            <td>56</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default HighValueCropsSubVariety
