import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Building, Mail, Settings, Volume2, VolumeX, 
  Bell, BellOff, Palette, Save, RotateCcw, Trophy,
  Calendar, Zap, BookOpen, Award, ChevronRight
} from 'lucide-react'
import useStore, { LEVEL_TITLES } from '../store/useStore'
import { toast } from '../components/Toast'
import StreakCounter from '../components/StreakCounter'

const AVATARS = ['🧑‍💼', '👩‍🏫', '👨‍💻', '👩‍🔬', '🧑‍🎓', '👨‍🎓', '👩‍💼', '🧑‍🏫', '👨‍🔧', '👩‍🔧', '🦸', '🦹', '🧙', '🧝']

export default function Profile() {
  const { 
    user, setUser, settings, updateSettings, 
    xp, level, getLevelTitle, achievements, programs, streak,
    reset
  } = useStore()
  
  const [formData, setFormData] = useState({ ...user })
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleSave = () => {
    setUser(formData)
    toast.success('Profile updated successfully!')
  }

  const handleReset = () => {
    reset()
    setShowResetConfirm(false)
    toast.info('All progress has been reset')
  }

  const stats = [
    { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: '#d4af37' },
    { label: 'Current Level', value: level, icon: Award, color: '#a855f7' },
    { label: 'Programs', value: programs.length, icon: BookOpen, color: '#4ade80' },
    { label: 'Achievements', value: achievements.length, icon: Trophy, color: '#f472b6' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-[#d4af37] mb-2">
          <Settings size={20} />
          <span className="text-sm uppercase tracking-wider">Profile & Settings</span>
        </div>
        <h1 
          className="text-3xl font-bold text-[#f4f1de]"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Your Profile
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          className="md:col-span-2 quest-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-[#f4f1de] mb-6 flex items-center gap-2">
            <User size={18} className="text-[#d4af37]" />
            Personal Information
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Selection */}
            <div className="flex-shrink-0">
              <label className="text-sm text-[#a8a29e] mb-3 block">Avatar</label>
              <div className="grid grid-cols-7 gap-2">
                {AVATARS.map((avatar, i) => (
                  <motion.button
                    key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                      formData.avatar === avatar
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8942e] ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0a1628]'
                        : 'bg-[#1a2744] hover:bg-[#2a3754]'
                    }`}
                    onClick={() => setFormData({ ...formData, avatar })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-[#a8a29e] mb-2">
                  <User size={14} />
                  Name
                </label>
                <input
                  type="text"
                  className="quest-input"
                  placeholder="Your name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-[#a8a29e] mb-2">
                  <Building size={14} />
                  Organization
                </label>
                <input
                  type="text"
                  className="quest-input"
                  placeholder="Your organization"
                  value={formData.organization || ''}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-[#a8a29e] mb-2">
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="email"
                  className="quest-input"
                  placeholder="your@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <motion.button
                className="btn-primary flex items-center gap-2 w-full justify-center mt-4"
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={18} />
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="quest-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="text-6xl mb-3"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {formData.avatar || '🧑‍💼'}
            </motion.div>
            <h3 className="text-xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
              {formData.name || 'Anonymous Hero'}
            </h3>
            <p className="text-sm text-[#d4af37]">{getLevelTitle()}</p>
            <p className="text-xs text-[#6b7280] mt-1">{formData.organization || 'Changemaker'}</p>
          </div>

          <div className="space-y-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-[rgba(26,39,68,0.5)]"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} style={{ color: stat.color }} />
                    <span className="text-sm text-[#a8a29e]">{stat.label}</span>
                  </div>
                  <span className="font-bold text-[#f4f1de]">{stat.value}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Settings */}
      <motion.div
        className="mt-6 quest-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-[#f4f1de] mb-6 flex items-center gap-2">
          <Settings size={18} className="text-[#d4af37]" />
          Preferences
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Sound Toggle */}
          <motion.button
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              settings.soundEnabled 
                ? 'bg-[rgba(212,175,55,0.1)] border border-[#d4af37]' 
                : 'bg-[rgba(26,39,68,0.5)] border border-transparent'
            }`}
            onClick={() => {
              updateSettings({ soundEnabled: !settings.soundEnabled })
              toast.info(settings.soundEnabled ? 'Sounds disabled' : 'Sounds enabled')
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 size={20} className="text-[#d4af37]" />
              ) : (
                <VolumeX size={20} className="text-[#6b7280]" />
              )}
              <div className="text-left">
                <p className="font-medium text-[#f4f1de]">Sound Effects</p>
                <p className="text-xs text-[#6b7280]">Achievement and level up sounds</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-all ${
              settings.soundEnabled ? 'bg-[#d4af37]' : 'bg-[#1a2744]'
            }`}>
              <motion.div
                className="w-4 h-4 rounded-full bg-white"
                animate={{ x: settings.soundEnabled ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.button>

          {/* Notifications Toggle */}
          <motion.button
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              settings.notificationsEnabled 
                ? 'bg-[rgba(212,175,55,0.1)] border border-[#d4af37]' 
                : 'bg-[rgba(26,39,68,0.5)] border border-transparent'
            }`}
            onClick={() => {
              updateSettings({ notificationsEnabled: !settings.notificationsEnabled })
              toast.info(settings.notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled')
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              {settings.notificationsEnabled ? (
                <Bell size={20} className="text-[#d4af37]" />
              ) : (
                <BellOff size={20} className="text-[#6b7280]" />
              )}
              <div className="text-left">
                <p className="font-medium text-[#f4f1de]">Notifications</p>
                <p className="text-xs text-[#6b7280]">Toast notifications for actions</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-all ${
              settings.notificationsEnabled ? 'bg-[#d4af37]' : 'bg-[#1a2744]'
            }`}>
              <motion.div
                className="w-4 h-4 rounded-full bg-white"
                animate={{ x: settings.notificationsEnabled ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Streak Counter */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <StreakCounter />
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        className="mt-6 quest-card p-6 border-red-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
          <RotateCcw size={18} />
          Danger Zone
        </h2>
        
        {!showResetConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#f4f1de]">Reset all progress</p>
              <p className="text-sm text-[#6b7280]">This will delete all your programs, XP, and achievements</p>
            </div>
            <motion.button
              className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
              onClick={() => setShowResetConfirm(true)}
              whileHover={{ scale: 1.05 }}
            >
              Reset
            </motion.button>
          </div>
        ) : (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-400 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <motion.button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
              >
                Yes, Reset Everything
              </motion.button>
              <motion.button
                className="px-4 py-2 rounded-lg border border-[#6b7280] text-[#a8a29e] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                onClick={() => setShowResetConfirm(false)}
                whileHover={{ scale: 1.05 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
