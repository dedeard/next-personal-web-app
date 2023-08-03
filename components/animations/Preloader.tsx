import { memo } from 'react'
import { motion } from 'framer-motion'

const Preloader = memo(() => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.25, delay: 0.25 }}
    className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[130] h-full w-full select-none bg-white dark:bg-black"
  />
))

export default Preloader
