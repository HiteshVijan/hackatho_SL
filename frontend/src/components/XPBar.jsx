import { motion } from 'framer-motion'
import { Star, Zap, TrendingUp } from 'lucide-react'
import useStore from '../store/useStore'

export default function XPBar() {
  const { xp, level, getLevelProgress, getLevelTitle, getXpToNextLevel } = useStore()
  
  const progress = getLevelProgress()
  const title = getLevelTitle()
  const xpNeeded = getXpToNextLevel()
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#d4af37] blur-md"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f0d77a] to-[#b8942e] flex items-center justify-center text-[#0a1628] font-bold shadow-lg">
              <span style={{ fontFamily: 'Cinzel, serif' }}>{level}</span>
            </div>
          </motion.div>
          
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
                {title}
              </p>
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <TrendingUp size={12} className="text-[#4ade80]" />
              </motion.div>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={12} className="text-[#d4af37]" />
              <span className="text-xs text-[#d4af37] font-medium">{xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-xs text-[#a8a29e]">Next level in</span>
          <div className="flex items-center gap-1 text-[#d4af37]">
            <span className="text-sm font-bold">{xpNeeded.toLocaleString()}</span>
            <span className="text-xs">XP</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar container */}
      <div className="relative">
        {/* Background track */}
        <div className="h-3 bg-[#1a2744] rounded-full overflow-hidden border border-[rgba(212,175,55,0.2)]">
          {/* Progress fill */}
          <motion.div 
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #b8942e, #d4af37, #f0d77a, #d4af37)',
              backgroundSize: '200% 100%',
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
            }}
            transition={{ 
              width: { duration: 0.8, ease: 'easeOut' },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
        </div>

        {/* Milestone markers */}
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full transition-colors ${
              progress >= milestone ? 'bg-[#0a1628]' : 'bg-[rgba(212,175,55,0.3)]'
            }`}
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>
      
      {/* Progress percentage */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-[#6b7280]">Level {level}</span>
        <span className="text-[10px] text-[#6b7280]">{Math.round(progress)}%</span>
        <span className="text-[10px] text-[#6b7280]">Level {Math.min(level + 1, 8)}</span>
      </div>
    </div>
  )
}
