import './Poultry.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function Poultry() {
  return (
    <div className="poultry">
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
            { x: 'Chicken', y: 61 },
            { x: 'Duck', y: 26 },
            { x: 'Goose', y: 37 },
            { x: 'Turkey', y: 57 }
          ]}
        />
      </div>
      <div>
        <Table className="no-click" headers={['Legend', 'Poultry', 'Head', 'Farmer']}>
          <tr>
            <td>
              <div className="box-red" />
            </td>
            <td>Chicken</td>
            <td>61</td>
            <td>16</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Duck</td>
            <td>26</td>
            <td>62</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Goose</td>
            <td>37</td>
            <td>73</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Turkey</td>
            <td>57</td>
            <td>75</td>
          </tr>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>203</td>
            <td>258</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default Poultry
