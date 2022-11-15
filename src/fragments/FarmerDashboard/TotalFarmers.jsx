import './TotalFarmers.css'

import { VictoryPie, VictoryTooltip } from 'victory'

import Box from '../../components/Box'
import React from 'react'
import Text from '../../components/Text'

function TotalFarmers() {
  return (
    <div className="total-farmers">
      <Box>
        <Text blue>Male</Text>
        <Text blue three>
          59%
        </Text>
        <Text>or</Text>
        <Text blue two>
          59,837
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
            { x: 'Female', y: 41 },
            { x: 'Male', y: 59 }
          ]}
          height={150}
          labels={() => null}
          padding={0}
        />
        <Text total>
          <Text two>100,389</Text>
          <Text orange>Total Farmers</Text>
        </Text>
      </Box>
      <Box>
        <Text yellow>Female</Text>
        <Text yellow three>
          41%
        </Text>
        <Text>or</Text>
        <Text yellow two>
          41,738
        </Text>
        <Text orange>Farmers</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Owner
        </Text>
        <Text two>263</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Tenant
        </Text>
        <Text two>345</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Laborer
        </Text>
        <Text two>1,834</Text>
        <Text className="mb-1">Farmer</Text>
      </Box>
    </div>
  )
}

export default TotalFarmers
