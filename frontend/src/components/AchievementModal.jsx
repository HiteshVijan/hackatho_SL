import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Sparkles, Zap } from 'lucide-react'
import useStore from '../store/useStore'
import Confetti from 'react-confetti'

export default function AchievementModal() {
  const { latestAchievement, closeAchievementModal, settings } = useStore()
  
  if (!latestAchievement) return null

  // Play sound effect if enabled
  if (settings?.soundEnabled) {
    // Sound would be played here in a real implementation
  }
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Mini confetti for achievement */}
        <div className="absolute inset-0 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={100}
            gravity={0.3}
            colors={['#d4af37', '#f0d77a', '#b8942e', '#ffffff']}
          />
        </div>

        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={closeAchievementModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Modal */}
        <motion.div
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.3, opacity: 0, y: 100, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        >
          {/* Animated glow rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-2xl border-2 border-[#d4af37]"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.1 + i * 0.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
          
          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8942e] rounded-2xl blur-2xl"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative bg-gradient-to-b from-[#1a2744] to-[#0f1d32] rounded-2xl border-2 border-[#d4af37] overflow-hidden shadow-2xl">
            {/* Animated top banner */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              animate={{ 
                x: ['-100%', '100%']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Close button */}
            <button 
              onClick={closeAchievementModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-[rgba(255,255,255,0.1)] text-[#a8a29e] hover:text-[#f4f1de] hover:bg-[rgba(255,255,255,0.2)] transition-all z-10"
            >
              <X size={20} />
            </button>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    background: i % 2 === 0 ? '#d4af37' : '#f0d77a',
                  }}
                  initial={{ 
                    y: '100%',
                    opacity: 0 
                  }}
                  animate={{ 
                    y: '-100%',
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
            
            {/* Stars decoration */}
            <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#d4af37]"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 70}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Star size={8 + Math.random() * 8} fill="#d4af37" />
                </motion.div>
              ))}
            </div>
            
            {/* Content */}
            <div className="p-8 pt-20 text-center relative">
              {/* Badge with glow */}
              <motion.div 
                className="relative inline-block mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 8, delay: 0.2 }}
              >
                {/* Icon glow */}
                <motion.div
                  className="absolute inset-0 blur-xl"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)'
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <motion.div
                  className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f0d77a] to-[#b8942e] flex items-center justify-center shadow-2xl"
                  animate={{ 
                    boxShadow: [
                      '0 0 30px rgba(212,175,55,0.5)',
                      '0 0 60px rgba(212,175,55,0.8)',
                      '0 0 30px rgba(212,175,55,0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl">{latestAchievement.icon}</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles size={16} className="text-[#d4af37]" />
                <p 
                  className="text-[#d4af37] text-sm uppercase tracking-widest font-bold"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Achievement Unlocked!
                </p>
                <Sparkles size={16} className="text-[#d4af37]" />
              </motion.div>
              
              <motion.h2
                className="text-3xl font-bold text-[#f4f1de] mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {latestAchievement.name}
              </motion.h2>
              
              <motion.p
                className="text-[#a8a29e] mb-6 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {latestAchievement.description}
              </motion.p>
              
              {/* XP Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[rgba(212,175,55,0.2)] to-[rgba(184,148,46,0.2)] rounded-xl border border-[rgba(212,175,55,0.4)]"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap size={24} className="text-[#d4af37]" fill="#d4af37" />
                </motion.div>
                <span className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
                  +{latestAchievement.xp} XP
                </span>
              </motion.div>
              
              <motion.button
                className="mt-8 btn-primary w-full py-4 text-lg"
                onClick={closeAchievementModal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={18} className="inline mr-2" />
                Continue Your Quest
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
