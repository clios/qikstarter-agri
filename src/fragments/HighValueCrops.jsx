import './HighValueCrops.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../components/Box'
import React from 'react'
import Table from '../components/Table'
import Text from '../components/Text'

function HighValueCrops() {
  return (
    <div className="high-value-crops">
      <div className="high-value-crops-item">
        <VictoryPie
          height={250}
          padding={0}
          innerRadius={50}
          colorScale={['#DF2020', '#DF9C20', '#DFDF20', '#20DF20', '#20A8DF', '#D020DF', '#DF207C']}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          data={[
            { x: 'Banana', y: 41 },
            { x: 'Cacao', y: 59 },
            { x: 'Coffee', y: 17 },
            { x: 'Fruit Trees', y: 32 },
            { x: 'Root Crops', y: 41 },
            { x: 'Spices', y: 35 },
            { x: 'Vegetables', y: 56 }
          ]}
        />
      </div>
      <div className="high-value-crops-item">
        <Table className="no-click" headers={['Legend', 'Variety', 'Area']}>
          <tr>
            <td>
              <div className="box-red" />
            </td>
            <td>Banana</td>
            <td>41</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Cacao</td>
            <td>59</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Coffee</td>
            <td>17</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Fruit Trees</td>
            <td>32</td>
          </tr>
          <tr>
            <td>
              <div className="box-blue" />
            </td>
            <td>Root Crops</td>
            <td>41</td>
          </tr>
          <tr>
            <td>
              <div className="box-indigo" />
            </td>
            <td>Spices</td>
            <td>35</td>
          </tr>
          <tr>
            <td>
              <div className="box-violet" />
            </td>
            <td>Vegetables</td>
            <td>56</td>
          </tr>
        </Table>
      </div>
      <div className="high-value-crops-item">
        <Box>
          <Text orange>High Value Crops</Text>
          <Text>Total Area</Text>
          <Text two>281</Text>
          <Text>Hectares</Text>
        </Box>
      </div>
    </div>
  )
}

export default HighValueCrops
