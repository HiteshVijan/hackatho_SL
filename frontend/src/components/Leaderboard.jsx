import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, TrendingUp, Zap, Users } from 'lucide-react'
import useStore from '../store/useStore'

const rankColors = {
  1: { bg: 'from-[#ffd700] to-[#ffb700]', text: '#0a1628', icon: Crown },
  2: { bg: 'from-[#c0c0c0] to-[#a8a8a8]', text: '#0a1628', icon: Medal },
  3: { bg: 'from-[#cd7f32] to-[#b87333]', text: '#0a1628', icon: Medal },
}

export default function Leaderboard({ compact = false }) {
  const { getLeaderboard, getUserRank, user, xp, level } = useStore()
  
  const leaderboard = getLeaderboard()
  const userRank = getUserRank()
  const displayList = compact ? leaderboard.slice(0, 5) : leaderboard

  return (
    <div className={compact ? '' : 'quest-card p-6'}>
      {!compact && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#f4f1de] flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
            <Users size={20} className="text-[#d4af37]" />
            Community Leaderboard
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#a8a29e]">
            <span>Your Rank:</span>
            <span className="text-[#d4af37] font-bold">#{userRank}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {displayList.map((entry, index) => {
          const rank = index + 1
          const isTop3 = rank <= 3
          const RankIcon = rankColors[rank]?.icon || null
          const isCurrentUser = entry.isCurrentUser

          return (
            <motion.div
              key={entry.id}
              className={`relative flex items-center gap-4 p-3 rounded-xl transition-all ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-[rgba(212,175,55,0.2)] to-transparent border border-[#d4af37]' 
                  : 'bg-[rgba(26,39,68,0.5)] hover:bg-[rgba(26,39,68,0.8)]'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              {/* Rank */}
              <div className="w-10 flex-shrink-0">
                {isTop3 ? (
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${rankColors[rank].bg} flex items-center justify-center`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {RankIcon && <RankIcon size={16} style={{ color: rankColors[rank].text }} />}
                  </motion.div>
                ) : (
                  <span className="text-lg font-bold text-[#6b7280] pl-2">#{rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div className="text-2xl">{entry.avatar}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium truncate ${isCurrentUser ? 'text-[#d4af37]' : 'text-[#f4f1de]'}`}>
                    {entry.name}
                    {isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                  </h3>
                </div>
                <p className="text-xs text-[#6b7280] truncate">{entry.organization}</p>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-[#d4af37] font-bold">
                  <Zap size={14} />
                  <span>{entry.xp.toLocaleString()}</span>
                </div>
                <div className="text-xs text-[#6b7280]">Level {entry.level}</div>
              </div>

              {/* Highlight glow for current user */}
              {isCurrentUser && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {compact && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm text-[#6b7280]">
            You're ranked <span className="text-[#d4af37] font-bold">#{userRank}</span> out of {leaderboard.length} designers
          </span>
        </motion.div>
      )}
    </div>
  )
}
