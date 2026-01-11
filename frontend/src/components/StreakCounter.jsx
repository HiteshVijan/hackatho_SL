import { motion } from 'framer-motion'
import { Flame, Calendar, Award } from 'lucide-react'
import useStore from '../store/useStore'

export default function StreakCounter({ compact = false }) {
  const { streak, updateStreak } = useStore()
  
  const flameColors = streak.current >= 7 
    ? 'from-[#ff6b35] via-[#f7c548] to-[#ff6b35]' 
    : streak.current >= 3 
      ? 'from-[#f97316] to-[#fbbf24]' 
      : 'from-[#64748b] to-[#94a3b8]'

  if (compact) {
    return (
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)]"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={streak.current > 0 ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame 
            size={18} 
            className={streak.current > 0 ? 'text-[#ff6b35]' : 'text-[#6b7280]'} 
            fill={streak.current > 0 ? '#ff6b35' : 'transparent'}
          />
        </motion.div>
        <span className={`font-bold ${streak.current > 0 ? 'text-[#ff6b35]' : 'text-[#6b7280]'}`}>
          {streak.current}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="quest-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#f4f1de] flex items-center gap-2">
          <Flame size={20} className="text-[#ff6b35]" />
          Daily Streak
        </h3>
        <div className="text-xs text-[#6b7280] flex items-center gap-1">
          <Award size={12} />
          Best: {streak.longest} days
        </div>
      </div>

      <div className="flex items-center justify-center py-6">
        <motion.div
          className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${flameColors} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: streak.current > 0 ? [
              '0 0 20px rgba(255,107,53,0.3)',
              '0 0 40px rgba(255,107,53,0.5)',
              '0 0 20px rgba(255,107,53,0.3)',
            ] : []
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-white"
              style={{ fontFamily: 'Cinzel, serif' }}
              key={streak.current}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {streak.current}
            </motion.div>
            <div className="text-xs text-white/80 uppercase tracking-wider">
              {streak.current === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          {/* Flame particles */}
          {streak.current > 0 && [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#fbbf24] rounded-full"
              style={{
                left: '50%',
                bottom: '80%',
              }}
              animate={{
                y: [-10, -40],
                x: [(i - 2) * 10, (i - 2) * 15],
                opacity: [0.8, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Week view */}
      <div className="mt-4">
        <div className="flex items-center justify-center gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const isActive = i < streak.current % 7 || (streak.current >= 7 && i < 7)
            return (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#ff6b35] to-[#fbbf24] text-white' 
                    : 'bg-[#1a2744] text-[#6b7280]'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {day}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Streak message */}
      <motion.p
        className="text-center text-sm text-[#a8a29e] mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {streak.current === 0 && "Start designing to begin your streak!"}
        {streak.current === 1 && "Great start! Come back tomorrow to continue."}
        {streak.current >= 2 && streak.current < 7 && `${7 - streak.current} more days to unlock Week Warrior!`}
        {streak.current >= 7 && "🔥 You're on fire! Keep the momentum going!"}
      </motion.p>
    </motion.div>
  )
}
