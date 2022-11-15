import './Livestock.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function Livestock() {
  return (
    <div className="livestock">
      <div>
        <VictoryPie
          height={250}
          labels={() => null}
          padding={0}
          innerRadius={50}
          colorScale={['#DF2020', '#DF9C20', '#DFDF20', '#20DF20', '#20A8DF']}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          data={[
            { x: 'Cattle', y: 61 },
            { x: 'Carabao', y: 26 },
            { x: 'Pig', y: 37 },
            { x: 'Goat', y: 57 },
            { x: 'Sheep', y: 23 }
          ]}
        />
      </div>
      <div>
        <Table className="no-click" headers={['Legend', 'Livestock', 'Head', 'Farmer']}>
          <tr>
            <td>
              <div className="box-red" />
            </td>
            <td>Cattle</td>
            <td>61</td>
            <td>16</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Carabao</td>
            <td>26</td>
            <td>62</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Pig</td>
            <td>37</td>
            <td>73</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Goat</td>
            <td>57</td>
            <td>75</td>
          </tr>
          <tr>
            <td>
              <div className="box-blue" />
            </td>
            <td>Sheep</td>
            <td>23</td>
            <td>32</td>
          </tr>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>159</td>
            <td>219</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default Livestock
