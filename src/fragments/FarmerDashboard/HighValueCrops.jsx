import './HighValueCrops.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function HighValueCrops(props) {
  const hvc_area = props.total_hvc_area
  const hvc_area_from_farmers = props.total_hvc_area_from_farmers
  const hvc_banana_area = props.total_hvc_banana_area
  const hvc_banana_area_from_farmers = props.total_hvc_banana_area_from_farmers
  const hvc_cacao_area = props.total_hvc_cacao_area
  const hvc_cacao_area_from_farmers = props.total_hvc_cacao_area_from_farmers
  const hvc_coffee_area = props.total_hvc_coffee_area
  const hvc_coffee_area_from_farmers = props.total_hvc_coffee_area_from_farmers
  const hvc_fruit_tree_area = props.total_hvc_fruit_tree_area
  const hvc_fruit_tree_area_from_farmers = props.total_hvc_fruit_tree_area_from_farmers
  const hvc_root_crop_area = props.total_hvc_root_crop_area
  const hvc_root_crop_area_from_farmers = props.total_hvc_root_crop_area_from_farmers
  const hvc_spice_area = props.total_hvc_spice_area
  const hvc_spice_area_from_farmers = props.total_hvc_spice_area_from_farmers
  const hvc_vegetable_area = props.total_hvc_vegetable_area
  const hvc_vegetable_area_from_farmers = props.total_hvc_vegetable_area_from_farmers

  return (
    <div className="high-value-crops">
      <div>
        <VictoryPie
          height={250}
          labels={() => null}
          padding={0}
          innerRadius={50}
          colorScale={['#DF2020', '#DF9C20', '#DFDF20', '#20DF20', '#20A8DF', '#D020DF', '#DF207C']}
          labels={({ datum }) => `${datum.x}: ${datum.y?.toLocaleString()} ha`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          data={[
            { x: 'Banana', y: hvc_banana_area },
            { x: 'Cacao', y: hvc_cacao_area },
            { x: 'Coffee', y: hvc_coffee_area },
            { x: 'Fruit Trees', y: hvc_fruit_tree_area },
            { x: 'Root Crops', y: hvc_root_crop_area },
            { x: 'Spices', y: hvc_spice_area },
            { x: 'Vegetables', y: hvc_vegetable_area }
          ]}
        />
      </div>
      <div>
        <Table className="no-click" headers={['Legend', 'Variety', 'Hectares', 'Farmer']}>
          <tr>
            <td>
              <div className="box-red" />
            </td>
            <td>Banana</td>
            <td>{Help.displayNumberWithComma(hvc_banana_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_banana_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Cacao</td>
            <td>{Help.displayNumberWithComma(hvc_cacao_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_cacao_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Coffee</td>
            <td>{Help.displayNumberWithComma(hvc_coffee_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_coffee_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Fruit Trees</td>
            <td>{Help.displayNumberWithComma(hvc_fruit_tree_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_fruit_tree_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-blue" />
            </td>
            <td>Root Crops</td>
            <td>{Help.displayNumberWithComma(hvc_root_crop_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_root_crop_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-indigo" />
            </td>
            <td>Spices</td>
            <td>{Help.displayNumberWithComma(hvc_spice_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_spice_area_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-violet" />
            </td>
            <td>Vegetables</td>
            <td>{Help.displayNumberWithComma(hvc_vegetable_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_vegetable_area_from_farmers)}</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>-</td>
            <td>{Help.displayNumberWithComma(hvc_area)}</td>
            <td>{Help.displayNumberWithComma(hvc_area_from_farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default HighValueCrops
