import './PopulationPerMarital.css'

import Box from '../components/Box'
import React from 'react'
import Text from '../components/Text'

function PopulationPerMarital() {
  return (
    <div className="population-per-status">
      <Box>
        <Text className="mb-1" orange>
          Single
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Living-In
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Married
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Widowed
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Separated
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
      <Box>
        <Text className="mb-1" orange>
          Divorced
        </Text>
        <Text blue>Male</Text>
        <Text className="mb-1" onePointThree blue>
          123,203
        </Text>
        <Text yellow>Female</Text>
        <Text className="mb-1" onePointThree yellow>
          123,203
        </Text>
        <Text>Total</Text>
        <Text onePointThree>123,102</Text>
      </Box>
    </div>
  )
}

export default PopulationPerMarital
