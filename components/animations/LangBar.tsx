import { useMounted } from '@/contexts/MountContext'
import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'

const LangBar = memo(({ size, color, className }: { size: number; color?: string; className?: string }) => {
  const mount = useMounted()
  if (!mount) return <></>
  return (
    <>
      <motion.div
        initial={{ width: '0px' }}
        animate={{ width: size + '%' }}
        transition={{ delay: 1, duration: 1 }}
        className={className}
        style={{ backgroundColor: color }}
      />
    </>
  )
})

export default LangBar
