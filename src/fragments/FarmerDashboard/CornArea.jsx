import './CornArea.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function CornArea(props) {
  const corn_area = props.total_corn_area
  const corn_area_from_farmers = props.total_corn_area_from_farmers

  return (
    <div className="corn-area">
      <div>
        <VictoryPie
          height={250}
          labels={() => null}
          padding={0}
          innerRadius={50}
          colorScale={['#20DF20', '#20A8DF', '#D020DF', '#DF207C']}
          // labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labels={({ datum }) => `${datum.x}: NOT AVAILABLE`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          data={[
            { x: 'Upper Vega', y: 25 },
            { x: 'Lower Vega', y: 25 },
            { x: 'Broad Plain', y: 25 },
            { x: 'Hilly Areas', y: 25 }
          ]}
        />
      </div>
      <div>
        <Table className="no-click" headers={['Legend', 'Variety', 'Hectares', 'Farmer']}>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Upper Vega</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <div className="box-blue" />
            </td>
            <td>Lower Vega</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <div className="box-indigo" />
            </td>
            <td>Broad Plain</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <div className="box-violet" />
            </td>
            <td>Hilly Areas</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>-</td>
            <td>{Help.displayNumberWithComma(corn_area)}</td>
            <td>{Help.displayNumberWithComma(corn_area_from_farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default CornArea
