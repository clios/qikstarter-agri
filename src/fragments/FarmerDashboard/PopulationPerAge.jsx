import './PopulationPerAge.css'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryVoronoiContainer } from 'victory'

import Help from '../../Help'
import React from 'react'
import Table from '../../components/Table'

function PopulationPerAge(props) {
  const farmers_below_20 = props.total_farmers_below_20
  const farmers_below_20_male = props.total_farmers_below_20_male
  const farmers_below_20_female = props.total_farmers_below_20_female
  const farmers_20_to_29 = props.total_farmers_20_to_29
  const farmers_20_to_29_male = props.total_farmers_20_to_29_male
  const farmers_20_to_29_female = props.total_farmers_20_to_29_female
  const farmers_30_to_39 = props.total_farmers_30_to_39
  const farmers_30_to_39_male = props.total_farmers_30_to_39_male
  const farmers_30_to_39_female = props.total_farmers_30_to_39_female
  const farmers_40_to_49 = props.total_farmers_40_to_49
  const farmers_40_to_49_male = props.total_farmers_40_to_49_male
  const farmers_40_to_49_female = props.total_farmers_40_to_49_female
  const farmers_50_to_59 = props.total_farmers_50_to_59
  const farmers_50_to_59_male = props.total_farmers_50_to_59_male
  const farmers_50_to_59_female = props.total_farmers_50_to_59_female
  const farmers_above_59 = props.total_farmers_above_59
  const farmers_above_59_male = props.total_farmers_above_59_male
  const farmers_above_59_female = props.total_farmers_above_59_female
  const farmers_male = [
    farmers_below_20_male,
    farmers_20_to_29_male,
    farmers_30_to_39_male,
    farmers_40_to_49_male,
    farmers_50_to_59_male,
    farmers_above_59_male
  ].reduce((partialSum, a) => partialSum + a, 0)
  const farmers_female = [
    farmers_below_20_female,
    farmers_20_to_29_female,
    farmers_30_to_39_female,
    farmers_40_to_49_female,
    farmers_50_to_59_female,
    farmers_above_59_female
  ].reduce((partialSum, a) => partialSum + a, 0)
  const farmers = farmers_male + farmers_female

  return (
    <div className="population-per-age">
      <div className="population-per-age-chart">
        <div className="population-per-age-legend">
          <div className="population-per-age-legend-item">
            <div className="box-green" />
            <div>Total</div>
          </div>
          <div className="population-per-age-legend-item">
            <div className="box-blue" />
            <div>Male</div>
          </div>
          <div className="population-per-age-legend-item">
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
                { x: 'Below 20', y: farmers_below_20_male },
                { x: '20-29', y: farmers_20_to_29_male },
                { x: '30-39', y: farmers_30_to_39_male },
                { x: '40-49 ', y: farmers_40_to_49_male },
                { x: '50-59 ', y: farmers_50_to_59_male },
                { x: 'Above 59 ', y: farmers_above_59_male }
              ]}
            />
            {/* FEMALE */}
            <VictoryBar
              style={{ data: { fill: '#DFDF20' }, labels: { fontSize: 9 } }}
              data={[
                { x: 'Below 20', y: farmers_below_20_female },
                { x: '20-29', y: farmers_20_to_29_female },
                { x: '30-39', y: farmers_30_to_39_female },
                { x: '40-49 ', y: farmers_40_to_49_female },
                { x: '50-59 ', y: farmers_50_to_59_female },
                { x: 'Above 59 ', y: farmers_above_59_female }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
      <div>
        <Table className="no-click" headers={['Age', 'Male', 'Female', 'Total']}>
          <tr>
            <td>Below 20</td>
            <td>{Help.displayNumberWithComma(farmers_below_20_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_below_20_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_below_20)}</td>
          </tr>
          <tr>
            <td>20 - 29</td>
            <td>{Help.displayNumberWithComma(farmers_20_to_29_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_20_to_29_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_20_to_29)}</td>
          </tr>
          <tr>
            <td>30 - 39</td>
            <td>{Help.displayNumberWithComma(farmers_30_to_39_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_30_to_39_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_30_to_39)}</td>
          </tr>
          <tr>
            <td>40 - 49</td>
            <td>{Help.displayNumberWithComma(farmers_40_to_49_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_40_to_49_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_40_to_49)}</td>
          </tr>
          <tr>
            <td>50 - 59</td>
            <td>{Help.displayNumberWithComma(farmers_50_to_59_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_50_to_59_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_50_to_59)}</td>
          </tr>
          <tr>
            <td>Above 59</td>
            <td>{Help.displayNumberWithComma(farmers_above_59_male)}</td>
            <td>{Help.displayNumberWithComma(farmers_above_59_female)}</td>
            <td>{Help.displayNumberWithComma(farmers_above_59)}</td>
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

export default PopulationPerAge
