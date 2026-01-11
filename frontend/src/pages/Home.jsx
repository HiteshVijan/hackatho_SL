import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Compass, Trophy, BookOpen, Sparkles, ArrowRight, Users, Target, Lightbulb } from 'lucide-react'
import useStore from '../store/useStore'

const features = [
  {
    icon: Compass,
    title: 'Guided Journey',
    description: 'Step-by-step program design aligned with Shikshagraha\'s Common Logical Framework'
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Unlock achievements, gain XP, and level up as you complete your program design'
  },
  {
    icon: BookOpen,
    title: 'Export & Share',
    description: 'Generate review-ready program documents to share with stakeholders'
  }
]

const stats = [
  { value: '7', label: 'Design Stages' },
  { value: '11', label: 'Achievements' },
  { value: '8', label: 'Mastery Levels' },
]

export default function Home() {
  const navigate = useNavigate()
  const { user, programs, level, getLevelTitle, createProgram } = useStore()
  
  const handleStartQuest = () => {
    if (programs.length === 0) {
      createProgram('My First Program')
    }
    navigate('/quest')
  }
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center py-16">
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🎯
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-10 text-6xl opacity-20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ⚒️
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-4xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          ✨
        </motion.div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-[#d4af37] text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={16} />
              <span>Shikshagraha Hackathon 2026</span>
            </motion.div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold text-[#f4f1de] mb-4 leading-tight"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              <span className="block">Forge Your</span>
              <span className="text-glow text-[#d4af37]">Program Design</span>
            </h1>
            
            <p className="text-xl text-[#a8a29e] max-w-2xl mx-auto mb-8">
              A gamified platform that transforms complex program design into an engaging quest. 
              Build education programs that create real impact.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                onClick={handleStartQuest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Compass size={20} />
                Begin Your Quest
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                className="btn-secondary flex items-center gap-2"
                onClick={() => navigate('/templates')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} />
                Use a Template
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <motion.section 
        className="py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center quest-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="text-4xl font-bold text-[#d4af37] mb-1"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#a8a29e]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 
          className="text-3xl font-bold text-center text-[#f4f1de] mb-12"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="quest-card p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon size={28} className="text-[#0a1628]" />
                </motion.div>
                <h3 
                  className="text-xl font-bold text-[#f4f1de] mb-3"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#a8a29e]">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
      
      {/* CLF Framework Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="quest-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-[#d4af37] mb-4">
                <Target size={20} />
                <span className="text-sm uppercase tracking-wider">Based on</span>
              </div>
              <h2 
                className="text-3xl font-bold text-[#f4f1de] mb-4"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Shikshagraha's Common Logical Framework
              </h2>
              <p className="text-[#a8a29e] mb-6">
                Our 7-stage program design journey is carefully aligned with the Common Logical 
                Framework developed by Shikshagraha, ensuring your program design follows 
                proven methodologies for education impact.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🔍', text: 'Problem Definition & Context' },
                  { icon: '🎯', text: 'Student-Level Outcomes' },
                  { icon: '🕸️', text: 'Stakeholder Mapping' },
                  { icon: '⚡', text: 'Practice Change Identification' },
                  { icon: '📊', text: 'Success Metrics & Indicators' },
                  { icon: '💡', text: 'Theory of Change' },
                  { icon: '📜', text: 'Program Blueprint' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-3 text-[#f4f1de]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                className="aspect-square rounded-2xl bg-gradient-to-br from-[#1a472a] to-[#0f2d1a] p-8 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-8xl mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🏛️
                  </motion.div>
                  <p 
                    className="text-2xl text-[#d4af37]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Shikshagraha
                  </p>
                  <p className="text-[#a8a29e] text-sm mt-2">
                    1 Million Schools by 2030
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="quest-card p-12 glow-gold">
          <h2 
            className="text-3xl font-bold text-[#f4f1de] mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Ready to Design Your Impact?
          </h2>
          <p className="text-[#a8a29e] mb-8 max-w-xl mx-auto">
            Join the movement to transform education. Start designing your program today 
            and contribute to systemic change in education.
          </p>
          <motion.button
            className="btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto"
            onClick={handleStartQuest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb size={20} />
            Start Designing
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}

