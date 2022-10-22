import { AnimatePresence, motion } from 'framer-motion'

import React from 'react'

function FadeAnimation(props) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}

export default FadeAnimation
