import './Fishery.css'

import Box from '../../components/Box'
import React from 'react'
import Text from '../../components/Text'

function Fishery() {
  return (
    <div className="fishery">
      <Box>
        <Text orange>Total Area</Text>
        <Text two>82,192</Text>
        <Text>Square Meter</Text>
      </Box>
      <Box>
        <Text orange>Qty. of Fingerlings</Text>
        <Text two>8,192,927</Text>
        <Text>Pieces</Text>
      </Box>
      <Box>
        <Text orange>Fishermen</Text>
        <Text two>2,927</Text>
        <Text>Individual</Text>
      </Box>
    </div>
  )
}

export default Fishery
