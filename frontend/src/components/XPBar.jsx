import { motion } from 'framer-motion'
import { Star, Zap } from 'lucide-react'
import useStore from '../store/useStore'

export default function XPBar() {
  const { xp, level, getLevelProgress, getLevelTitle, getXpToNextLevel } = useStore()
  
  const progress = getLevelProgress()
  const title = getLevelTitle()
  const xpNeeded = getXpToNextLevel()
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-[#0a1628] font-bold text-sm"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            {level}
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-[#f4f1de]">{title}</p>
            <p className="text-xs text-[#a8a29e]">{xp} XP</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-[#d4af37]">
          <Zap size={14} />
          <span className="text-xs">{xpNeeded} XP to next level</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

