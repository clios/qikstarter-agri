import { Slide, ToastContainer } from 'react-toastify'

import { AnimatePresence } from 'framer-motion'
import React from 'react'
import Routes from './Routes'

function App() {
  return (
    <React.StrictMode>
      <ToastContainer newestOnTop position="bottom-right" theme="dark" transition={Slide} />
      <AnimatePresence exitBeforeEnter>
        <Routes />
      </AnimatePresence>
    </React.StrictMode>
  )
}

export default App
