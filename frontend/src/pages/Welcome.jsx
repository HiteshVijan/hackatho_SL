import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Sparkles, ArrowRight, ChevronRight, Shield, Target, 
  Users, BarChart3, Lightbulb, Award, Rocket, CheckCircle,
  User, Building, Mail
} from 'lucide-react'
import useStore from '../store/useStore'

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to ProgramForge',
    subtitle: 'Your quest to design impactful education programs begins here',
    icon: '⚒️',
    content: 'Transform complex program design into an engaging journey. Earn XP, unlock achievements, and create programs that change lives.'
  },
  {
    id: 'journey',
    title: 'The 7-Stage Journey',
    subtitle: 'Aligned with Shikshagraha\'s Common Logical Framework',
    icon: '🗺️',
    stages: [
      { icon: '🔍', name: 'Problem Definition', desc: 'Define the challenge' },
      { icon: '🎯', name: 'Outcome Vision', desc: 'Set success criteria' },
      { icon: '🕸️', name: 'Stakeholder Map', desc: 'Identify key actors' },
      { icon: '⚡', name: 'Practice Changes', desc: 'Define behavior shifts' },
      { icon: '📊', name: 'Success Metrics', desc: 'Measure progress' },
      { icon: '💡', name: 'Theory of Change', desc: 'Connect the logic' },
      { icon: '📜', name: 'Program Blueprint', desc: 'Finalize design' },
    ]
  },
  {
    id: 'gamification',
    title: 'Level Up Your Impact',
    subtitle: 'Earn rewards as you design',
    icon: '🏆',
    features: [
      { icon: Rocket, title: 'Earn XP', desc: 'Gain experience points for every action' },
      { icon: Award, title: 'Unlock Achievements', desc: 'Complete challenges to earn badges' },
      { icon: Target, title: 'Track Progress', desc: 'See your journey at a glance' },
      { icon: Users, title: 'Join the Community', desc: 'Compare with other changemakers' },
    ]
  },
  {
    id: 'profile',
    title: 'Tell Us About Yourself',
    subtitle: 'Personalize your experience',
    icon: '👤',
    isForm: true
  }
]

export default function Welcome() {
  const navigate = useNavigate()
  const { setUser, completeOnboarding, hasCompletedOnboarding, unlockAchievement } = useStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({ name: '', organization: '', email: '' })
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (hasCompletedOnboarding) {
      navigate('/')
    }
    
    const timer = setTimeout(() => setIsAnimating(false), 1500)
    return () => clearTimeout(timer)
  }, [hasCompletedOnboarding, navigate])

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    if (formData.name) {
      setUser({ 
        ...formData, 
        joinedAt: new Date().toISOString(),
        avatar: '🧑‍💼'
      })
    }
    completeOnboarding()
    navigate('/')
  }

  const handleSkip = () => {
    completeOnboarding()
    navigate('/')
  }

  const step = ONBOARDING_STEPS[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0f1d32] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(74,28,107,0.1) 0%, transparent 70%)',
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Particle grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#d4af37] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Initial loading animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1628]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              className="text-8xl"
            >
              ⚒️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 right-0 z-20 p-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2">
              {ONBOARDING_STEPS.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d77a]' 
                      : 'bg-[rgba(255,255,255,0.1)]'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index <= currentStep ? 1 : 0.3 }}
                  style={{ originX: 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="fixed top-6 right-6 z-20 text-[#a8a29e] hover:text-[#f4f1de] text-sm transition-colors"
        >
          Skip intro
        </button>

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center p-6 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl w-full"
            >
              {/* Step header */}
              <div className="text-center mb-10">
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
                <h1 
                  className="text-4xl md:text-5xl font-bold text-[#f4f1de] mb-3"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {step.title}
                </h1>
                <p className="text-xl text-[#a8a29e]">{step.subtitle}</p>
              </div>

              {/* Step content */}
              {step.content && (
                <motion.p
                  className="text-center text-lg text-[#a8a29e] max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.content}
                </motion.p>
              )}

              {/* Journey stages */}
              {step.stages && (
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.stages.map((stage, i) => (
                    <motion.div
                      key={i}
                      className="quest-card p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="text-3xl mb-2">{stage.icon}</div>
                      <h3 className="text-sm font-bold text-[#f4f1de] mb-1">{stage.name}</h3>
                      <p className="text-xs text-[#6b7280]">{stage.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Features grid */}
              {step.features && (
                <motion.div
                  className="grid md:grid-cols-2 gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.features.map((feature, i) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={i}
                        className="quest-card p-5 flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center flex-shrink-0">
                          <Icon size={24} className="text-[#0a1628]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#f4f1de] mb-1">{feature.title}</h3>
                          <p className="text-sm text-[#a8a29e]">{feature.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* Profile form */}
              {step.isForm && (
                <motion.div
                  className="quest-card p-8 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-[#f4f1de] font-medium mb-2">
                        <User size={16} className="text-[#d4af37]" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="quest-input"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[#f4f1de] font-medium mb-2">
                        <Building size={16} className="text-[#d4af37]" />
                        Organization
                      </label>
                      <input
                        type="text"
                        className="quest-input"
                        placeholder="Your NGO or organization name"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[#f4f1de] font-medium mb-2">
                        <Mail size={16} className="text-[#d4af37]" />
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        className="quest-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="p-6 pb-10">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="text-sm text-[#6b7280]">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </div>
            
            <motion.button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? (
                <>
                  <Sparkles size={20} />
                  Begin Your Quest
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
