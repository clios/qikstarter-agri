import './TotalFarmers.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Text from '../../components/Text'

function TotalFarmers(props) {
  const total_farmers = props.total_farmers
  const total_farmers_male = props.total_farmers_male
  const total_farmers_female = props.total_farmers_female
  const total_farmers_owner = props.total_farmers_owner
  const total_farmers_owner_male = props.total_farmers_owner_male
  const total_farmers_owner_female = props.total_farmers_owner_female
  const total_farmers_tenant = props.total_farmers_tenant
  const total_farmers_tenant_male = props.total_farmers_tenant_male
  const total_farmers_tenant_female = props.total_farmers_tenant_female
  const total_farmers_laborer = props.total_farmers_laborer
  const total_farmers_laborer_male = props.total_farmers_laborer_male
  const total_farmers_laborer_female = props.total_farmers_laborer_female

  return (
    <div className="total-farmers">
      <Box>
        <Text blue>Male</Text>
        <Text blue three>
          {Help.displayPercentage(total_farmers_male, total_farmers)}
        </Text>
        <Text>or</Text>
        <Text blue two>
          {Help.displayNumberWithComma(total_farmers_male)}
        </Text>
        <Text orange>Farmers</Text>
      </Box>
      <Box>
        <VictoryPie
          colorScale={['#DFDF20', '#20A8DF']}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutPadding={{ left: 20, right: 20, bottom: 10, top: 10 }} style={{ fontSize: '16px' }} />
          }
          data={[
            { x: 'Female', y: total_farmers_female },
            { x: 'Male', y: total_farmers_male }
          ]}
          height={150}
          labels={() => null}
          padding={0}
        />
        <Text total>
          <Text two>{Help.displayNumberWithComma(total_farmers)}</Text>
          <Text orange>Total Farmers</Text>
        </Text>
      </Box>
      <Box>
        <Text yellow>Female</Text>
        <Text yellow three>
          {Help.displayPercentage(total_farmers_female, total_farmers)}
        </Text>
        <Text>or</Text>
        <Text yellow two>
          {Help.displayNumberWithComma(total_farmers_female)}
        </Text>
        <Text orange>Farmers</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Owner
        </Text>
        <Text two> {Help.displayNumberWithComma(total_farmers_owner)}</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Tenant
        </Text>
        <Text two> {Help.displayNumberWithComma(total_farmers_tenant)}</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Laborer
        </Text>
        <Text two> {Help.displayNumberWithComma(total_farmers_laborer)}</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
    </div>
  )
}

export default TotalFarmers
