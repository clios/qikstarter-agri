import './RiceArea.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function RiceArea(props) {
  const rice_area = props.total_rice_area
  const rice_area_from_farmers = props.total_rice_area_from_farmers

  return (
    <div className="rice-area">
      <div>
        <VictoryPie
          height={250}
          labels={() => null}
          padding={0}
          innerRadius={50}
          // labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labels={({ datum }) => `${datum.x}: NOT AVAILABLE`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          colorScale={['#DF2020', '#DF9C20', '#DFDF20']}
          data={[
            { x: 'Irrigated', y: 33 },
            { x: 'Rainfed', y: 33 },
            { x: 'Upland', y: 33 }
          ]}
        />
      </div>
      <div>
        <Table className="no-click" headers={['Legend', 'Variety', 'Hectares', 'Farmer']}>
          <tr>
            <td>
              <div className="box-red" />
            </td>
            <td>Irrigated</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Rainfed</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Upland</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>-</td>
            <td>{Help.displayNumberWithComma(rice_area)}</td>
            <td>{Help.displayNumberWithComma(rice_area_from_farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default RiceArea
