import { motion } from 'framer-motion'
import { Trophy, Users, TrendingUp, Zap, Medal, Target, Filter } from 'lucide-react'
import useStore from '../store/useStore'
import Leaderboard from '../components/Leaderboard'

export default function LeaderboardPage() {
  const { getUserRank, xp, level, getLevelTitle, programs } = useStore()
  const userRank = getUserRank()

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-[#d4af37] text-sm mb-4">
          <Users size={16} />
          <span>Community Rankings</span>
        </div>
        <h1 
          className="text-4xl font-bold text-[#f4f1de] mb-2"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Leaderboard
        </h1>
        <p className="text-[#a8a29e]">
          See how you rank among fellow program designers
        </p>
      </motion.div>

      {/* User Stats Card */}
      <motion.div
        className="quest-card p-6 mb-8 glow-gold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Cinzel, serif' }}>
                  #{userRank}
                </span>
              </div>
              {userRank <= 3 && (
                <motion.div
                  className="absolute -top-2 -right-2 text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {userRank === 1 ? '👑' : '🏅'}
                </motion.div>
              )}
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
                Your Ranking
              </h2>
              <p className="text-[#d4af37]">{getLevelTitle()}</p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-[#d4af37]">
                <Zap size={20} />
                {xp.toLocaleString()}
              </div>
              <div className="text-xs text-[#6b7280]">Total XP</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-[#f4f1de]">
                <Medal size={20} className="text-[#a855f7]" />
                {level}
              </div>
              <div className="text-xs text-[#6b7280]">Level</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-[#4ade80]">
                <Target size={20} />
                {programs.length}
              </div>
              <div className="text-xs text-[#6b7280]">Programs</div>
            </div>
          </div>
        </div>

        {/* Progress message */}
        <motion.div
          className="mt-6 p-4 bg-[rgba(26,39,68,0.5)] rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {userRank <= 3 ? (
            <p className="text-center text-[#d4af37]">
              🎉 Amazing! You're in the top 3! Keep up the incredible work!
            </p>
          ) : userRank <= 10 ? (
            <p className="text-center text-[#a8a29e]">
              💪 Great progress! You're in the top 10. Keep designing to climb higher!
            </p>
          ) : (
            <p className="text-center text-[#a8a29e]">
              🚀 Complete more stages and earn XP to climb the leaderboard!
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Tips for climbing */}
      <motion.div
        className="grid md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { icon: '🎯', title: 'Complete Stages', desc: 'Earn 35-95 XP per stage' },
          { icon: '🏆', title: 'Unlock Achievements', desc: 'Bonus XP for milestones' },
          { icon: '🔥', title: 'Maintain Streaks', desc: 'Daily activity rewards' },
        ].map((tip, i) => (
          <motion.div
            key={i}
            className="quest-card p-4 text-center"
            whileHover={{ y: -4 }}
          >
            <div className="text-3xl mb-2">{tip.icon}</div>
            <h3 className="font-bold text-[#f4f1de] mb-1">{tip.title}</h3>
            <p className="text-xs text-[#6b7280]">{tip.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Leaderboard />
      </motion.div>
    </div>
  )
}
