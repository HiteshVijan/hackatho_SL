import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X, Zap, Trophy, Star } from 'lucide-react'
import { create } from 'zustand'

// Toast store
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now()
    set((state) => ({
      toasts: [...state.toasts, { id, ...toast }]
    }))
    // Auto remove after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, toast.duration || 4000)
    return id
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
  }
}))

// Helper functions for easy toast creation
export const toast = {
  success: (message, options = {}) => 
    useToastStore.getState().addToast({ type: 'success', message, ...options }),
  error: (message, options = {}) => 
    useToastStore.getState().addToast({ type: 'error', message, ...options }),
  warning: (message, options = {}) => 
    useToastStore.getState().addToast({ type: 'warning', message, ...options }),
  info: (message, options = {}) => 
    useToastStore.getState().addToast({ type: 'info', message, ...options }),
  xp: (amount, options = {}) => 
    useToastStore.getState().addToast({ type: 'xp', message: `+${amount} XP earned!`, ...options }),
  achievement: (name, options = {}) => 
    useToastStore.getState().addToast({ type: 'achievement', message: `Achievement Unlocked: ${name}`, ...options }),
  levelUp: (level, title, options = {}) => 
    useToastStore.getState().addToast({ type: 'levelup', message: `Level ${level}: ${title}`, ...options }),
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  xp: Zap,
  achievement: Trophy,
  levelup: Star,
}

const colorMap = {
  success: { bg: 'rgba(74, 222, 128, 0.15)', border: '#4ade80', text: '#4ade80' },
  error: { bg: 'rgba(248, 113, 113, 0.15)', border: '#f87171', text: '#f87171' },
  warning: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24', text: '#fbbf24' },
  info: { bg: 'rgba(96, 165, 250, 0.15)', border: '#60a5fa', text: '#60a5fa' },
  xp: { bg: 'rgba(212, 175, 55, 0.2)', border: '#d4af37', text: '#d4af37' },
  achievement: { bg: 'rgba(212, 175, 55, 0.25)', border: '#f0d77a', text: '#f0d77a' },
  levelup: { bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', text: '#a855f7' },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const Icon = iconMap[t.type] || Info
          const colors = colorMap[t.type] || colorMap.info

          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md shadow-2xl"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 0 20px ${colors.border}40, 0 10px 40px rgba(0,0,0,0.3)`
              }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <Icon size={22} style={{ color: colors.text }} />
              </motion.div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-[#f4f1de]">{t.message}</p>
                {t.description && (
                  <p className="text-xs text-[#a8a29e] mt-0.5">{t.description}</p>
                )}
              </div>
              
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <X size={14} className="text-[#a8a29e]" />
              </button>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
                style={{ background: colors.border }}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: (t.duration || 4000) / 1000, ease: 'linear' }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
