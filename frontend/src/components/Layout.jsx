import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Compass, Trophy, BookOpen, FileText, BarChart3, User, Users, Flame } from 'lucide-react'
import useStore from '../store/useStore'
import XPBar from './XPBar'
import AchievementModal from './AchievementModal'
import ToastContainer from './Toast'
import StreakCounter from './StreakCounter'
import Confetti from 'react-confetti'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { path: '/quest', icon: Compass, label: 'Quest' },
  { path: '/programs', icon: BookOpen, label: 'Programs' },
  { path: '/templates', icon: FileText, label: 'Templates' },
  { path: '/leaderboard', icon: Users, label: 'Leaderboard' },
  { path: '/achievements', icon: Trophy, label: 'Achievements' },
]

const mobileNavItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/quest', icon: Compass, label: 'Quest' },
  { path: '/dashboard', icon: BarChart3, label: 'Stats' },
  { path: '/achievements', icon: Trophy, label: 'Awards' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { showConfetti, showAchievementModal, user, streak } = useStore()
  
  return (
    <div className="min-h-screen bg-pattern relative">
      {/* Confetti for level ups */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={['#d4af37', '#f0d77a', '#b8942e', '#1a472a', '#4a1c6b']}
        />
      )}
      
      {/* Achievement Modal */}
      {showAchievementModal && <AchievementModal />}
      
      {/* Toast Notifications */}
      <ToastContainer />
      
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-30"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/80 border-b border-[rgba(212,175,55,0.2)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <motion.div 
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-lg md:text-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                ⚒️
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
                  ProgramForge
                </h1>
                <p className="text-xs text-[#a8a29e]">Design Your Impact</p>
              </div>
            </Link>
            
            {/* XP Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <XPBar />
            </div>
            
            {/* Right side items */}
            <div className="flex items-center gap-3">
              {/* Streak Counter - Compact */}
              <StreakCounter compact />
              
              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        className={`p-2.5 rounded-lg transition-all relative group ${
                          isActive 
                            ? 'bg-[rgba(212,175,55,0.2)] text-[#d4af37]' 
                            : 'text-[#a8a29e] hover:text-[#f4f1de] hover:bg-[rgba(255,255,255,0.05)]'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={18} />
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#0a1628] border border-[rgba(212,175,55,0.3)] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  )
                })}
              </nav>
              
              {/* Profile Button */}
              <motion.button
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-lg"
                onClick={() => navigate('/profile')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user.avatar || '🧑‍💼'}
              </motion.button>
            </div>
          </div>
          
          {/* XP Bar - Tablet */}
          <div className="hidden md:block lg:hidden mt-3">
            <XPBar />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="pt-20 md:pt-24 pb-24 md:pb-8 min-h-screen">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-t border-[rgba(212,175,55,0.2)] safe-area-pb">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <motion.div
                  className={`flex flex-col items-center py-2 transition-all ${
                    isActive ? 'text-[#d4af37]' : 'text-[#6b7280]'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={isActive ? { y: -2 } : { y: 0 }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <span className="text-[10px] mt-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-0 w-1 h-1 rounded-full bg-[#d4af37]"
                      layoutId="activeTab"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
      
      {/* Footer - Desktop only */}
      <footer className="hidden md:block border-t border-[rgba(212,175,55,0.1)] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#6b7280] text-sm">
          <p>Built with 💛 for ShikshaLokam's Innovation for Education Equity Hackathon</p>
          <p className="mt-1">Empowering NGOs to design impactful education programs</p>
        </div>
      </footer>
    </div>
  )
}
