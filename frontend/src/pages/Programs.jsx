import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, BookOpen, Trash2, Download, Play, Clock, CheckCircle, Calendar } from 'lucide-react'
import useStore, { INITIAL_STAGES } from '../store/useStore'

export default function Programs() {
  const navigate = useNavigate()
  const { programs, createProgram, deleteProgram, selectProgram, exportProgram } = useStore()
  
  const handleCreateProgram = () => {
    const name = prompt('Enter program name:', 'New Program')
    if (name) {
      createProgram(name)
      navigate('/quest')
    }
  }
  
  const handleContinueProgram = (programId) => {
    selectProgram(programId)
    navigate('/quest')
  }
  
  const handleDeleteProgram = (e, programId) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this program? This cannot be undone.')) {
      deleteProgram(programId)
    }
  }
  
  const handleExportProgram = (e, programId) => {
    e.stopPropagation()
    const programData = exportProgram(programId)
    if (programData) {
      const blob = new Blob([JSON.stringify(programData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${programData.name.replace(/\s+/g, '_')}_program.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }
  
  const getProgressPercentage = (program) => {
    return Math.round((program.completedStages.length / 7) * 100)
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="flex items-center gap-2 text-[#d4af37] mb-2">
            <BookOpen size={20} />
            <span className="text-sm uppercase tracking-wider">Program Library</span>
          </div>
          <h1 
            className="text-3xl font-bold text-[#f4f1de]"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Your Programs
          </h1>
          <p className="text-[#a8a29e] mt-1">
            {programs.length} program{programs.length !== 1 ? 's' : ''} in your library
          </p>
        </div>
        
        <motion.button
          className="btn-primary flex items-center gap-2"
          onClick={handleCreateProgram}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          New Program
        </motion.button>
      </motion.div>
      
      {/* Programs Grid */}
      {programs.length === 0 ? (
        <motion.div
          className="quest-card p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📜
          </motion.div>
          <h2 
            className="text-2xl font-bold text-[#f4f1de] mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            No Programs Yet
          </h2>
          <p className="text-[#a8a29e] mb-6 max-w-md mx-auto">
            Start your first program design journey and create impactful education programs.
          </p>
          <motion.button
            className="btn-primary flex items-center gap-2 mx-auto"
            onClick={handleCreateProgram}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Create Your First Program
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => {
            const progress = getProgressPercentage(program)
            const isComplete = progress === 100
            const currentStage = INITIAL_STAGES.find(s => s.id === program.currentStage)
            
            return (
              <motion.div
                key={program.id}
                className={`quest-card p-6 cursor-pointer group ${isComplete ? 'glow-gold' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handleContinueProgram(program.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        isComplete 
                          ? 'bg-gradient-to-br from-[#d4af37] to-[#b8942e]' 
                          : 'bg-[#1a2744]'
                      }`}
                      whileHover={{ rotate: 10 }}
                    >
                      {isComplete ? '🏆' : currentStage?.icon || '📜'}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-[#f4f1de]">
                        {program.data.programName || program.name}
                      </h3>
                      <p className="text-sm text-[#a8a29e] flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(program.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[#a8a29e] hover:text-[#f4f1de]"
                      onClick={(e) => handleExportProgram(e, program.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Export Program"
                    >
                      <Download size={16} />
                    </motion.button>
                    <motion.button
                      className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(220,38,38,0.2)] text-[#a8a29e] hover:text-red-400"
                      onClick={(e) => handleDeleteProgram(e, program.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete Program"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#a8a29e]">Progress</span>
                    <span className={isComplete ? 'text-[#d4af37]' : 'text-[#f4f1de]'}>
                      {progress}%
                    </span>
                  </div>
                  <div className="progress-bar h-2">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </div>
                
                {/* Stage Indicators */}
                <div className="flex gap-2 mb-4">
                  {INITIAL_STAGES.map((stage) => {
                    const isCompleted = program.completedStages.includes(stage.id)
                    const isCurrent = program.currentStage === stage.id
                    
                    return (
                      <div
                        key={stage.id}
                        className={`stage-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                        title={stage.name}
                      />
                    )
                  })}
                </div>
                
                {/* Current Stage Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(212,175,55,0.1)]">
                  <div className="flex items-center gap-2 text-sm">
                    {isComplete ? (
                      <>
                        <CheckCircle size={16} className="text-[#d4af37]" />
                        <span className="text-[#d4af37]">Program Complete!</span>
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="text-[#a8a29e]" />
                        <span className="text-[#a8a29e]">
                          Stage {program.currentStage}: {currentStage?.name}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <motion.div
                    className="flex items-center gap-1 text-[#d4af37] text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <Play size={14} />
                    {isComplete ? 'Review' : 'Continue'}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

