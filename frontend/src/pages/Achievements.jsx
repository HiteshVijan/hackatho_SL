import { motion } from 'framer-motion'
import { Trophy, Lock, Star, Zap } from 'lucide-react'
import useStore, { ACHIEVEMENTS, LEVEL_TITLES, LEVEL_THRESHOLDS } from '../store/useStore'

export default function Achievements() {
  const { achievements, xp, level, getLevelProgress, getLevelTitle } = useStore()
  
  const allAchievements = Object.values(ACHIEVEMENTS)
  const unlockedCount = achievements.length
  const totalCount = allAchievements.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-[#d4af37] text-sm mb-4">
          <Trophy size={16} />
          <span>Hall of Achievements</span>
        </div>
        <h1 
          className="text-4xl font-bold text-[#f4f1de] mb-2"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Your Journey
        </h1>
        <p className="text-[#a8a29e]">
          Track your progress and unlock achievements as you design programs
        </p>
      </motion.div>
      
      {/* Level Progress Card */}
      <motion.div
        className="quest-card p-8 mb-12 glow-gold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Current Level */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-3xl font-bold text-[#0a1628]"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {level}
              </motion.div>
              <div>
                <h2 
                  className="text-2xl font-bold text-[#f4f1de]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {getLevelTitle()}
                </h2>
                <p className="text-[#d4af37] flex items-center gap-1">
                  <Zap size={16} />
                  {xp} Total XP
                </p>
              </div>
            </div>
            
            {/* Progress to next level */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#a8a29e] mb-2">
                <span>Level {level}</span>
                <span>Level {Math.min(level + 1, 8)}</span>
              </div>
              <div className="progress-bar h-4">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${getLevelProgress()}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
          
          {/* Level Roadmap */}
          <div>
            <h3 className="text-sm text-[#a8a29e] uppercase tracking-wider mb-4">Level Roadmap</h3>
            <div className="space-y-2">
              {LEVEL_TITLES.map((title, index) => {
                const levelNum = index + 1
                const isCurrentLevel = level === levelNum
                const isUnlocked = level >= levelNum
                const threshold = LEVEL_THRESHOLDS[index]
                
                return (
                  <motion.div
                    key={levelNum}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                      isCurrentLevel 
                        ? 'bg-[rgba(212,175,55,0.2)] border border-[#d4af37]' 
                        : isUnlocked 
                          ? 'opacity-70'
                          : 'opacity-40'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isUnlocked ? (isCurrentLevel ? 1 : 0.7) : 0.4, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8942e] text-[#0a1628]' 
                        : 'bg-[#1a2744] text-[#6b7280]'
                    }`}>
                      {isUnlocked ? levelNum : <Lock size={12} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-[#f4f1de]' : 'text-[#6b7280]'}`}>
                        {title}
                      </p>
                    </div>
                    <span className="text-xs text-[#6b7280]">{threshold} XP</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Achievement Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="quest-card p-6 text-center">
          <div className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
            {unlockedCount}
          </div>
          <div className="text-sm text-[#a8a29e]">Unlocked</div>
        </div>
        <div className="quest-card p-6 text-center">
          <div className="text-3xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
            {totalCount - unlockedCount}
          </div>
          <div className="text-sm text-[#a8a29e]">Remaining</div>
        </div>
        <div className="quest-card p-6 text-center">
          <div className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
            {completionPercentage}%
          </div>
          <div className="text-sm text-[#a8a29e]">Complete</div>
        </div>
      </motion.div>
      
      {/* Achievements Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 
          className="text-2xl font-bold text-[#f4f1de] mb-6"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          All Achievements
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements.map((achievement, index) => {
            const isUnlocked = achievements.includes(achievement.id)
            
            return (
              <motion.div
                key={achievement.id}
                className={`quest-card p-6 transition-all ${
                  isUnlocked 
                    ? 'border-[#d4af37] glow-gold' 
                    : 'opacity-60 grayscale'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isUnlocked ? 1 : 0.6, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8942e]' 
                        : 'bg-[#1a2744]'
                    }`}
                    whileHover={isUnlocked ? { rotate: 10 } : {}}
                  >
                    {isUnlocked ? achievement.icon : <Lock size={20} className="text-[#6b7280]" />}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${isUnlocked ? 'text-[#f4f1de]' : 'text-[#6b7280]'}`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-[#a8a29e] mb-2">
                      {achievement.description}
                    </p>
                    <div className={`inline-flex items-center gap-1 text-xs ${
                      isUnlocked ? 'text-[#d4af37]' : 'text-[#6b7280]'
                    }`}>
                      <Star size={12} fill={isUnlocked ? '#d4af37' : 'transparent'} />
                      +{achievement.xp} XP
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

