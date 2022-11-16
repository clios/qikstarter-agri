import './Fishery.css'

import Box from '../../components/Box'
import Help from '../../Help'
import React from 'react'
import Text from '../../components/Text'

function Fishery(props) {
  const fishery_area = props.total_fishery_area
  const fishery_area_from_farmers = props.total_fishery_area_from_farmers
  const fishery_fingerlings = props.total_fishery_fingerlings

  return (
    <div className="fishery">
      <Box>
        <Text orange>Total Area</Text>
        <Text two>{Help.displayNumberWithComma(fishery_area)}</Text>
        <Text>Square Meter</Text>
      </Box>
      <Box>
        <Text orange>Qty. of Fingerlings</Text>
        <Text two>{Help.displayNumberWithComma(fishery_fingerlings)}</Text>
        <Text>Pieces</Text>
      </Box>
      <Box>
        <Text orange>Fishermen</Text>
        <Text two>{Help.displayNumberWithComma(fishery_area_from_farmers)}</Text>
        <Text>Individual</Text>
      </Box>
    </div>
  )
}

export default Fishery
