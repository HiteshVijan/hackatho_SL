import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Users, Target, Lightbulb, ChevronRight, Building2, User, Mail } from 'lucide-react'
import useStore from '../store/useStore'

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to ProgramForge',
    subtitle: 'Your quest to design impactful education programs begins here',
    icon: '⚒️'
  },
  {
    id: 'about',
    title: 'Tell us about yourself',
    subtitle: 'This helps us personalize your experience',
    icon: '👤'
  },
  {
    id: 'ready',
    title: 'You\'re Ready!',
    subtitle: 'Begin your program design journey',
    icon: '🚀'
  }
]

export default function Welcome() {
  const navigate = useNavigate()
  const { user, setUser, createProgram } = useStore()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: user.name || '',
    organization: user.organization || '',
    email: user.email || ''
  })
  
  const currentStep = ONBOARDING_STEPS[step]
  
  const handleNext = () => {
    if (step === 1) {
      // Save user data
      setUser(formData)
    }
    
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1)
    } else {
      // Create first program and navigate
      createProgram('My First Program')
      navigate('/quest')
    }
  }
  
  const canProceed = () => {
    if (step === 1) {
      return formData.name.trim() && formData.organization.trim()
    }
    return true
  }
  
  return (
    <div className="min-h-screen bg-pattern flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-8xl opacity-10"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          🎯
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-8xl opacity-10"
          animate={{ rotate: [0, -10, 10, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          📜
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-10 text-6xl opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </div>
      
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {ONBOARDING_STEPS.map((s, i) => (
            <motion.div
              key={s.id}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step 
                  ? 'bg-[#d4af37] scale-125' 
                  : i < step 
                    ? 'bg-[#d4af37] opacity-50' 
                    : 'bg-[#1a2744]'
              }`}
              animate={i === step ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="quest-card p-8 glow-gold"
          >
            {/* Icon */}
            <motion.div
              className="text-6xl text-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              {currentStep.icon}
            </motion.div>
            
            {/* Title */}
            <h1 
              className="text-3xl font-bold text-center text-[#f4f1de] mb-2"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {currentStep.title}
            </h1>
            
            <p className="text-center text-[#a8a29e] mb-8">
              {currentStep.subtitle}
            </p>
            
            {/* Step Content */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: Target, label: '7 Stages' },
                    { icon: Sparkles, label: '11 Achievements' },
                    { icon: Users, label: 'CLF Aligned' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="text-center p-4 rounded-xl bg-[rgba(212,175,55,0.1)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <item.icon className="mx-auto mb-2 text-[#d4af37]" size={24} />
                      <span className="text-sm text-[#f4f1de]">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-sm text-[#a8a29e] text-center">
                  Design education programs through an engaging, gamified journey aligned with Shikshagraha's Common Logical Framework.
                </p>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[#f4f1de] mb-2">
                    <User size={16} className="text-[#d4af37]" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-[#f4f1de] mb-2">
                    <Building2 size={16} className="text-[#d4af37]" />
                    Organization *
                  </label>
                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Enter your organization name"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-[#f4f1de] mb-2">
                    <Mail size={16} className="text-[#d4af37]" />
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    className="quest-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <motion.div
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-[#1a472a] to-[#0f2d1a]"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <p className="text-[#d4af37] text-lg mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                    Welcome, {formData.name}!
                  </p>
                  <p className="text-[#a8a29e] text-sm">
                    From {formData.organization}
                  </p>
                </motion.div>
                
                <div className="space-y-3">
                  {[
                    '✅ Complete 7 stages to design your program',
                    '⚡ Earn XP and unlock achievements',
                    '📜 Export your program design document',
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-[#f4f1de]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Button */}
            <motion.button
              className={`w-full mt-8 btn-primary flex items-center justify-center gap-2 ${
                !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleNext}
              disabled={!canProceed()}
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
            >
              {step === ONBOARDING_STEPS.length - 1 ? (
                <>
                  Start Your Quest
                  <Sparkles size={18} />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
            
            {step > 0 && (
              <button
                className="w-full mt-3 text-[#a8a29e] hover:text-[#f4f1de] transition-colors text-sm"
                onClick={() => setStep(step - 1)}
              >
                ← Go Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Skip option */}
        {step === 0 && (
          <motion.button
            className="w-full mt-4 text-[#6b7280] hover:text-[#a8a29e] transition-colors text-sm"
            onClick={() => navigate('/')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Skip intro and go to dashboard →
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

