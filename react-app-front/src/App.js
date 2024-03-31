import { useState } from 'react'
import Header from './components/header/header.tsx'
import Main from './components/main/main.tsx'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="App" data-theme={isDark ? 'dark' : 'light'}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Main />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
