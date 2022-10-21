import './PopulationPerSex.css'

import Box from '../components/Box'
import React from 'react'
import Text from '../components/Text'
import { VictoryPie } from 'victory'

function PopulationBySex() {
  return (
    <div className="population-per-sex">
      <Box className="bg-gray">
        <Text orange>To Do</Text>
        <Text blue three>
          59%
        </Text>
        <Text>or</Text>
        <Text blue two>
          59,837
        </Text>
        <Text blue>Male</Text>
      </Box>
      <Box>
        <VictoryPie
          colorScale={['#DFDF20', '#20A8DF']}
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
          <Text orange>Total Population</Text>
        </Text>
      </Box>
      <Box>
        <Text orange>Completed</Text>
        <Text yellow three>
          41%
        </Text>
        <Text>or</Text>
        <Text yellow two>
          41,738
        </Text>
        <Text yellow>Female</Text>
      </Box>
    </div>
  )
}

export default PopulationBySex
