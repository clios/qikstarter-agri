import './Livestock.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'
import Text from '../../components/Text'

function Livestock(props) {
  const livestock_goats = props.total_livestock_goats
  const livestock_goats_from_farmers = props.total_livestock_goats_from_farmers
  const livestock_pigs = props.total_livestock_pigs
  const livestock_pigs_from_farmers = props.total_livestock_pigs_from_farmers
  const livestock_cattles = props.total_livestock_cattles
  const livestock_cattles_from_farmers = props.total_livestock_cattles_from_farmers
  const livestock_carabaos = props.total_livestock_carabaos
  const livestock_carabaos_from_farmers = props.total_livestock_carabaos_from_farmers
  const livestock_sheeps = props.total_livestock_sheeps
  const livestock_sheeps_from_farmers = props.total_livestock_sheeps_from_farmers
  const livestock = [livestock_goats, livestock_pigs, livestock_cattles, livestock_carabaos, livestock_sheeps].reduce(
    (partialSum, a) => partialSum + a,
    0
  )
  const farmers = [
    livestock_goats_from_farmers,
    livestock_pigs_from_farmers,
    livestock_cattles_from_farmers,
    livestock_carabaos_from_farmers,
    livestock_sheeps_from_farmers
  ].reduce((partialSum, a) => partialSum + a, 0)

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
            { x: 'Cattle', y: livestock_goats },
            { x: 'Carabao', y: livestock_pigs },
            { x: 'Pig', y: livestock_cattles },
            { x: 'Goat', y: livestock_carabaos },
            { x: 'Sheep', y: livestock_sheeps }
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
            <td>{Help.displayNumberWithComma(livestock_goats)}</td>
            <td>{Help.displayNumberWithComma(livestock_goats_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-orange" />
            </td>
            <td>Carabao</td>
            <td>{Help.displayNumberWithComma(livestock_pigs)}</td>
            <td>{Help.displayNumberWithComma(livestock_pigs_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-yellow" />
            </td>
            <td>Pig</td>
            <td>{Help.displayNumberWithComma(livestock_cattles)}</td>
            <td>{Help.displayNumberWithComma(livestock_cattles_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-green" />
            </td>
            <td>Goat</td>
            <td>{Help.displayNumberWithComma(livestock_carabaos)}</td>
            <td>{Help.displayNumberWithComma(livestock_carabaos_from_farmers)}</td>
          </tr>
          <tr>
            <td>
              <div className="box-blue" />
            </td>
            <td>Sheep</td>
            <td>{Help.displayNumberWithComma(livestock_sheeps)}</td>
            <td>{Help.displayNumberWithComma(livestock_sheeps_from_farmers)}</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>-</td>
            <td>{Help.displayNumberWithComma(livestock)}</td>
            <td>{Help.displayNumberWithComma(farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default Livestock
