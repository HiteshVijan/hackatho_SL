import { motion, AnimatePresence } from 'framer-motion'
import { X, Star } from 'lucide-react'
import useStore from '../store/useStore'

export default function AchievementModal() {
  const { latestAchievement, closeAchievementModal } = useStore()
  
  if (!latestAchievement) return null
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeAchievementModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Modal */}
        <motion.div
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8942e] rounded-2xl blur-xl opacity-30" />
          
          <div className="relative bg-gradient-to-b from-[#1a2744] to-[#0f1d32] rounded-2xl border border-[#d4af37] overflow-hidden">
            {/* Close button */}
            <button 
              onClick={closeAchievementModal}
              className="absolute top-4 right-4 text-[#a8a29e] hover:text-[#f4f1de] transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Stars decoration */}
            <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#d4af37]"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 60}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Star size={12} fill="#d4af37" />
                </motion.div>
              ))}
            </div>
            
            {/* Content */}
            <div className="p-8 pt-16 text-center">
              <motion.p 
                className="text-[#d4af37] text-sm uppercase tracking-widest mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Achievement Unlocked!
              </motion.p>
              
              <motion.div
                className="text-7xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10, delay: 0.3 }}
              >
                {latestAchievement.icon}
              </motion.div>
              
              <motion.h2
                className="text-2xl font-bold text-[#f4f1de] mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {latestAchievement.name}
              </motion.h2>
              
              <motion.p
                className="text-[#a8a29e] mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {latestAchievement.description}
              </motion.p>
              
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.2)] rounded-full text-[#d4af37]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Star size={16} fill="#d4af37" />
                <span className="font-bold">+{latestAchievement.xp} XP</span>
              </motion.div>
              
              <motion.button
                className="mt-6 btn-primary w-full"
                onClick={closeAchievementModal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Quest
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

