import './Poultry.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function Poultry(props) {
  const poultry_chickens = props.total_poultry_chickens
  const poultry_chickens_from_farmers = props.total_poultry_chickens_from_farmers
  const poultry_ducks = props.total_poultry_ducks
  const poultry_ducks_from_farmers = props.total_poultry_ducks_from_farmers
  const poultry_gooses = props.total_poultry_gooses
  const poultry_gooses_from_farmers = props.total_poultry_gooses_from_farmers
  const poultry_turkeys = props.total_poultry_turkeys
  const poultry_turkeys_from_farmers = props.total_poultry_turkeys_from_farmers
  const poultry = [poultry_chickens, poultry_ducks, poultry_gooses, poultry_turkeys].reduce((partialSum, a) => partialSum + a, 0)
  const farmers = [poultry_chickens_from_farmers, poultry_ducks_from_farmers, poultry_gooses_from_farmers, poultry_turkeys_from_farmers].reduce(
    (partialSum, a) => partialSum + a,
    0
  )

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
            { x: 'Chicken', y: poultry_chickens },
            { x: 'Duck', y: poultry_ducks },
            { x: 'Goose', y: poultry_gooses },
            { x: 'Turkey', y: poultry_turkeys }
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
            <td>{Help.displayNumberWithComma(poultry_chickens)}</td>
            <td>{Help.displayNumberWithComma(poultry_chickens_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Duck</td>
            <td>{Help.displayNumberWithComma(poultry_ducks)}</td>
            <td>{Help.displayNumberWithComma(poultry_ducks_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Goose</td>
            <td>{Help.displayNumberWithComma(poultry_gooses)}</td>
            <td>{Help.displayNumberWithComma(poultry_gooses_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Turkey</td>
            <td>{Help.displayNumberWithComma(poultry_turkeys)}</td>
            <td>{Help.displayNumberWithComma(poultry_turkeys_from_farmers)}</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>-</td>
            <td>{Help.displayNumberWithComma(poultry)}</td>
            <td>{Help.displayNumberWithComma(farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default Poultry
