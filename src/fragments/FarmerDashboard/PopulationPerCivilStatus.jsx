import './PopulationPerCivilStatus.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryVoronoiContainer } from 'victory'

import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'

function PopulationPerCivilStatus(props) {
  const farmers_single = props.total_farmers_single
  const farmers_single_male = props.total_farmers_single_male
  const farmers_single_female = props.total_farmers_single_female
  const farmers_living_in = props.total_farmers_living_in
  const farmers_living_in_male = props.total_farmers_living_in_male
  const farmers_living_in_female = props.total_farmers_living_in_female
  const farmers_married = props.total_farmers_married
  const farmers_married_male = props.total_farmers_married_male
  const farmers_married_female = props.total_farmers_married_female
  const farmers_divorced = props.total_farmers_divorced
  const farmers_divorced_male = props.total_farmers_divorced_male
  const farmers_divorced_female = props.total_farmers_divorced_female
  const farmers_separated = props.total_farmers_separated
  const farmers_separated_male = props.total_farmers_separated_male
  const farmers_separated_female = props.total_farmers_separated_female
  const farmers_widowed = props.total_farmers_widowed
  const farmers_widowed_male = props.total_farmers_widowed_male
  const farmers_widowed_female = props.total_farmers_widowed_female
  const farmers_male = [
    farmers_single_male,
    farmers_living_in_male,
    farmers_married_male,
    farmers_divorced_male,
    farmers_separated_male,
    farmers_widowed_male
  ].reduce((partialSum, a) => partialSum + a, 0)
  const farmers_female = [
    farmers_single_female,
    farmers_living_in_female,
    farmers_married_female,
    farmers_divorced_female,
    farmers_separated_female,
    farmers_widowed_female
  ].reduce((partialSum, a) => partialSum + a, 0)
  const farmers = farmers_male + farmers_female

  return (
    <div className="population-per-civil-status">
      <div className="population-per-civil-status-chart">
        <div className="population-per-civil-status-legend">
          <div className="population-per-civil-status-legend-item">
            <div className="box-blue" />
            <div>Male</div>
          </div>
          <div className="population-per-civil-status-legend-item">
            <div className="box-yellow" />
            <div>Female</div>
          </div>
        </div>
        <VictoryChart
          domainPadding={{
            x: [30, 30],
            y: [30, 16]
          }}
          padding={{
            left: 30,
            right: 30,
            bottom: 20,
            top: 10
          }}
          height={180}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              style={{ fontSize: 16 }}
              labels={({ datum }) => (datum.childName === 'bar-chart-group-2-0' ? `Male: ${datum.y}` : `Female: ${datum.y}`)}
            />
          }>
          <VictoryAxis
            style={{
              axis: {
                stroke: 'white' //CHANGE COLOR OF X-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 14,
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
                stroke: 'none' //CHANGE COLOR OF Y-AXIS
              },
              tickLabels: {
                padding: 5,
                fontSize: 16,
                fontWeight: 'lighter',
                fill: 'none' //CHANGE COLOR OF Y-AXIS LABELS
              },
              grid: {
                stroke: 'grey', //CHANGE COLOR OF Y-AXIS GRID LINES
                strokeDasharray: '7'
              }
            }}
          />
          <VictoryGroup offset={20} colorScale={'qualitative'}>
            {/* MALE */}
            <VictoryBar
              style={{ data: { fill: '#20A8DF' }, labels: { fontSize: 9 } }}
              data={[
                { x: 'Single', y: farmers_single_male },
                { x: 'Living-In', y: farmers_living_in_male },
                { x: 'Married', y: farmers_married_male },
                { x: 'Divorced ', y: farmers_divorced_male },
                { x: 'Separated ', y: farmers_separated_male },
                { x: 'Widowed ', y: farmers_widowed_male }
              ]}
            />
            {/* FEMALE */}
            <VictoryBar
              style={{ data: { fill: '#DFDF20' }, labels: { fontSize: 9 } }}
              data={[
                { x: 'Single', y: farmers_single_female },
                { x: 'Living-In', y: farmers_living_in_female },
                { x: 'Married', y: farmers_married_female },
                { x: 'Divorced ', y: farmers_divorced_female },
                { x: 'Separated ', y: farmers_separated_female },
                { x: 'Widowed ', y: farmers_widowed_female }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
      <div>
        <Table className="no-click" headers={['Civil Status', 'Male', 'Female', 'Total']}>
          <tr>
            <td>Single</td>
            <td>{Help.displayNumberWithComma(farmers_single)}</td>
            <td>{Help.displayNumberWithComma(farmers_single_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_single_female)}</td>
          </tr>
          <tr>
            <td>Living-In</td>
            <td>{Help.displayNumberWithComma(farmers_living_in)}</td>
            <td>{Help.displayNumberWithComma(farmers_living_in_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_living_in_female)}</td>
          </tr>
          <tr>
            <td>Married</td>
            <td>{Help.displayNumberWithComma(farmers_married)}</td>
            <td>{Help.displayNumberWithComma(farmers_married_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_married_female)}</td>
          </tr>
          <tr>
            <td>Divorced</td>
            <td>{Help.displayNumberWithComma(farmers_divorced)}</td>
            <td>{Help.displayNumberWithComma(farmers_divorced_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_divorced_female)}</td>
          </tr>
          <tr>
            <td>Separated</td>
            <td>{Help.displayNumberWithComma(farmers_separated)}</td>
            <td>{Help.displayNumberWithComma(farmers_separated_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_separated_female)}</td>
          </tr>
          <tr>
            <td>Widowed</td>
            <td>{Help.displayNumberWithComma(farmers_widowed)}</td>
            <td>{Help.displayNumberWithComma(farmers_widowed_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_widowed_female)}</td>
          </tr>
          <tr className="text-green">
            <td>-</td>
            <td>{Help.displayNumberWithComma(farmers_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_female)}</td>
            <td>{Help.displayNumberWithComma(farmers)}</td>
          </tr>
        </Table>
      </div>
    </div>
  )
}

export default PopulationPerCivilStatus
