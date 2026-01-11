import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  BarChart3, TrendingUp, Award, BookOpen, Zap, 
  Target, Users, Calendar, ArrowRight, Plus,
  CheckCircle, Clock, Sparkles
} from 'lucide-react'
import useStore, { ACHIEVEMENTS, INITIAL_STAGES, LEVEL_TITLES } from '../store/useStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { 
    user, programs, xp, level, achievements, 
    getLevelProgress, getLevelTitle, createProgram 
  } = useStore()
  
  // Calculate analytics
  const totalPrograms = programs.length
  const completedPrograms = programs.filter(p => p.completedStages.length === 7).length
  const inProgressPrograms = programs.filter(p => p.completedStages.length > 0 && p.completedStages.length < 7).length
  const totalStagesCompleted = programs.reduce((acc, p) => acc + p.completedStages.length, 0)
  const achievementProgress = Math.round((achievements.length / Object.keys(ACHIEVEMENTS).length) * 100)
  
  // Recent activity (last 5 updated programs)
  const recentPrograms = [...programs]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
  
  // Stage completion distribution
  const stageDistribution = INITIAL_STAGES.map(stage => {
    const count = programs.filter(p => p.completedStages.includes(stage.id)).length
    return { ...stage, count, percentage: totalPrograms > 0 ? Math.round((count / totalPrograms) * 100) : 0 }
  })
  
  const handleNewProgram = () => {
    createProgram('New Program')
    navigate('/quest')
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="flex items-center gap-2 text-[#d4af37] mb-2">
            <BarChart3 size={20} />
            <span className="text-sm uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 
            className="text-3xl font-bold text-[#f4f1de]"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Welcome back{user.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-[#a8a29e] mt-1">
            Here's your program design journey at a glance
          </p>
        </div>
        
        <motion.button
          className="btn-primary flex items-center gap-2"
          onClick={handleNewProgram}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          New Program
        </motion.button>
      </motion.div>
      
      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { 
            label: 'Total XP', 
            value: xp.toLocaleString(), 
            icon: Zap, 
            color: '#d4af37',
            subtitle: getLevelTitle()
          },
          { 
            label: 'Programs', 
            value: totalPrograms, 
            icon: BookOpen, 
            color: '#4ade80',
            subtitle: `${completedPrograms} completed`
          },
          { 
            label: 'Stages Done', 
            value: totalStagesCompleted, 
            icon: CheckCircle, 
            color: '#60a5fa',
            subtitle: `of ${totalPrograms * 7} total`
          },
          { 
            label: 'Achievements', 
            value: achievements.length, 
            icon: Award, 
            color: '#f472b6',
            subtitle: `${achievementProgress}% unlocked`
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="quest-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <TrendingUp size={16} className="text-[#4ade80]" />
            </div>
            <div 
              className="text-2xl font-bold text-[#f4f1de] mb-1"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-[#a8a29e]">{stat.label}</div>
            <div className="text-xs text-[#6b7280] mt-1">{stat.subtitle}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Level Progress */}
        <motion.div
          className="md:col-span-1 quest-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-[#f4f1de] mb-4 flex items-center gap-2">
            <Target size={18} className="text-[#d4af37]" />
            Your Level
          </h3>
          
          <div className="text-center mb-6">
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-4xl font-bold text-[#0a1628] mb-3"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {level}
            </motion.div>
            <h4 className="text-xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
              {getLevelTitle()}
            </h4>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-[#a8a29e] mb-2">
              <span>Progress to Level {Math.min(level + 1, 8)}</span>
              <span>{Math.round(getLevelProgress())}%</span>
            </div>
            <div className="progress-bar h-3">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${getLevelProgress()}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            {LEVEL_TITLES.slice(0, 4).map((title, i) => (
              <div 
                key={i}
                className={`flex items-center gap-2 text-sm ${
                  level > i + 1 ? 'text-[#d4af37]' : level === i + 1 ? 'text-[#f4f1de]' : 'text-[#6b7280]'
                }`}
              >
                {level > i + 1 ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                <span>Level {i + 1}: {title}</span>
              </div>
            ))}
            {level < 5 && <div className="text-xs text-[#6b7280]">...and more to unlock!</div>}
          </div>
        </motion.div>
        
        {/* Stage Completion Analytics */}
        <motion.div
          className="md:col-span-2 quest-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-[#f4f1de] mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#d4af37]" />
            Stage Completion Analytics
          </h3>
          
          {totalPrograms === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-[#a8a29e]">Start a program to see analytics</p>
              <motion.button
                className="btn-secondary mt-4"
                onClick={() => navigate('/templates')}
                whileHover={{ scale: 1.05 }}
              >
                Browse Templates
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {stageDistribution.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stage.icon}</span>
                      <span className="text-sm text-[#f4f1de]">{stage.name}</span>
                    </div>
                    <span className="text-sm text-[#a8a29e]">
                      {stage.count}/{totalPrograms} programs ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#1a2744] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, #d4af37, #f0d77a)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <motion.div
        className="mt-6 quest-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#f4f1de] flex items-center gap-2">
            <Clock size={18} className="text-[#d4af37]" />
            Recent Activity
          </h3>
          <button 
            onClick={() => navigate('/programs')}
            className="text-sm text-[#d4af37] hover:text-[#f0d77a] flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        {recentPrograms.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🚀</div>
            <p className="text-[#a8a29e] mb-4">No programs yet. Start your first quest!</p>
            <motion.button
              className="btn-primary"
              onClick={handleNewProgram}
              whileHover={{ scale: 1.05 }}
            >
              Create Program
            </motion.button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPrograms.map((program, index) => {
              const progress = Math.round((program.completedStages.length / 7) * 100)
              const currentStage = INITIAL_STAGES.find(s => s.id === program.currentStage)
              
              return (
                <motion.div
                  key={program.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-[rgba(26,39,68,0.5)] hover:bg-[rgba(26,39,68,0.8)] cursor-pointer transition-all"
                  onClick={() => {
                    useStore.getState().selectProgram(program.id)
                    navigate('/quest')
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-lg">
                    {progress === 100 ? '🏆' : currentStage?.icon || '📜'}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#f4f1de] font-medium truncate">
                      {program.data.programName || program.name}
                    </h4>
                    <p className="text-xs text-[#6b7280]">
                      {progress === 100 ? 'Completed' : `Stage ${program.currentStage}: ${currentStage?.name}`}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-[#d4af37] font-medium">{progress}%</div>
                    <div className="text-xs text-[#6b7280]">{formatDate(program.updatedAt)}</div>
                  </div>
                  
                  <ArrowRight size={16} className="text-[#6b7280]" />
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div
        className="mt-6 grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { 
            title: 'Start from Template', 
            description: 'Use pre-built program templates',
            icon: Sparkles,
            action: () => navigate('/templates'),
            color: '#d4af37'
          },
          { 
            title: 'View Achievements', 
            description: 'Track your progress and badges',
            icon: Award,
            action: () => navigate('/achievements'),
            color: '#f472b6'
          },
          { 
            title: 'All Programs', 
            description: 'Manage your program library',
            icon: BookOpen,
            action: () => navigate('/programs'),
            color: '#60a5fa'
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="quest-card p-5 cursor-pointer group"
            onClick={item.action}
            whileHover={{ y: -4 }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon size={20} style={{ color: item.color }} />
            </div>
            <h4 className="text-[#f4f1de] font-medium mb-1">{item.title}</h4>
            <p className="text-sm text-[#6b7280]">{item.description}</p>
            <ArrowRight 
              size={16} 
              className="mt-3 text-[#6b7280] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

