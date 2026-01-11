import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Home, Compass, Trophy, BookOpen, FileText, BarChart3 } from 'lucide-react'
import useStore from '../store/useStore'
import XPBar from './XPBar'
import AchievementModal from './AchievementModal'
import Confetti from 'react-confetti'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { path: '/quest', icon: Compass, label: 'Quest' },
  { path: '/programs', icon: BookOpen, label: 'Programs' },
  { path: '/templates', icon: FileText, label: 'Templates' },
  { path: '/achievements', icon: Trophy, label: 'Achievements' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const { showConfetti, showAchievementModal } = useStore()
  
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
      
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                ⚒️
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
                  ProgramForge
                </h1>
                <p className="text-xs text-[#a8a29e]">Design Your Impact</p>
              </div>
            </Link>
            
            {/* XP Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <XPBar />
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`p-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-[rgba(212,175,55,0.2)] text-[#d4af37]' 
                          : 'text-[#a8a29e] hover:text-[#f4f1de] hover:bg-[rgba(255,255,255,0.05)]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={20} />
                    </motion.div>
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Mobile XP Bar */}
          <div className="md:hidden mt-3">
            <XPBar />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="pt-24 md:pt-20 min-h-screen">
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
      
      {/* Footer */}
      <footer className="border-t border-[rgba(212,175,55,0.1)] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#6b7280] text-sm">
          <p>Built with 💛 for ShikshaLokam's Innovation for Education Equity Hackathon</p>
          <p className="mt-1">Empowering NGOs to design impactful education programs</p>
        </div>
      </footer>
    </div>
  )
}

