import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, ChevronRight, CheckCircle, Sparkles, 
  Save, Download, ArrowLeft, Trophy, HelpCircle, Printer
} from 'lucide-react'
import useStore, { INITIAL_STAGES } from '../store/useStore'
import ProgramPDFExport from '../components/ProgramPDFExport'
import AISuggestions from '../components/AISuggestions'

// Stage-specific form configurations
const STAGE_FIELDS = {
  1: {
    title: 'The Problem Quest',
    subtitle: 'Define the core education challenge you want to solve',
    icon: '🔍',
    fields: [
      {
        name: 'problemStatement',
        label: 'Problem Statement',
        type: 'textarea',
        placeholder: 'What is the core education challenge you want to address? Be specific about the problem and who it affects.',
        hint: 'A clear problem statement helps focus your entire program design.',
        required: true
      },
      {
        name: 'context',
        label: 'Context & Background',
        type: 'textarea',
        placeholder: 'What is the context? Include geographic scope, existing conditions, and relevant background.',
        hint: 'Understanding context helps design appropriate interventions.'
      },
      {
        name: 'scope',
        label: 'Scope & Scale',
        type: 'textarea',
        placeholder: 'What is the intended scope? Number of schools, students, teachers, geographic area, etc.',
        hint: 'Define boundaries to make your program manageable.'
      },
      {
        name: 'targetBeneficiaries',
        label: 'Target Beneficiaries',
        type: 'textarea',
        placeholder: 'Who are the primary beneficiaries? Students, teachers, parents, community members?',
        hint: 'Be specific about who will benefit from your program.',
        required: true
      }
    ]
  },
  2: {
    title: 'Outcome Vision',
    subtitle: 'Define what success looks like for students',
    icon: '🎯',
    fields: [
      {
        name: 'primaryOutcomes',
        label: 'Primary Student Outcomes',
        type: 'textarea',
        placeholder: 'What specific outcomes will students achieve? (e.g., improved literacy, numeracy, attendance)',
        hint: 'Focus on measurable changes in student learning or behavior.',
        required: true
      },
      {
        name: 'secondaryOutcomes',
        label: 'Secondary Outcomes',
        type: 'textarea',
        placeholder: 'What other outcomes might result? (e.g., teacher capacity, parent engagement)',
        hint: 'Consider ripple effects beyond direct student outcomes.'
      },
      {
        name: 'indicators',
        label: 'Success Indicators',
        type: 'textarea',
        placeholder: 'How will you know when these outcomes are achieved? What are the observable indicators?',
        hint: 'Indicators should be specific and measurable.',
        required: true
      }
    ]
  },
  3: {
    title: 'Stakeholder Map',
    subtitle: 'Identify all actors in the ecosystem',
    icon: '🕸️',
    fields: [
      {
        name: 'primaryStakeholders',
        label: 'Primary Stakeholders',
        type: 'textarea',
        placeholder: 'Who are the key stakeholders directly involved? (e.g., teachers, principals, students, parents)',
        hint: 'These are people who will be directly implementing or affected by the program.',
        required: true
      },
      {
        name: 'secondaryStakeholders',
        label: 'Secondary Stakeholders',
        type: 'textarea',
        placeholder: 'Who are the supporting stakeholders? (e.g., district officials, NGOs, community leaders)',
        hint: 'These stakeholders influence or support program success.'
      },
      {
        name: 'partnerships',
        label: 'Potential Partnerships',
        type: 'textarea',
        placeholder: 'What partnerships could strengthen your program? What role would each partner play?',
        hint: 'Consider government, civil society, academic, and private sector partners.'
      }
    ]
  },
  4: {
    title: 'Practice Changes',
    subtitle: 'Define what behaviors need to change',
    icon: '⚡',
    fields: [
      {
        name: 'currentPractices',
        label: 'Current Practices',
        type: 'textarea',
        placeholder: 'What are the current practices that contribute to the problem? What behaviors exist today?',
        hint: 'Understanding current state helps design the change journey.',
        required: true
      },
      {
        name: 'desiredPractices',
        label: 'Desired Practices',
        type: 'textarea',
        placeholder: 'What new practices should stakeholders adopt? What should they start, stop, or continue doing?',
        hint: 'Be specific about observable behavior changes.',
        required: true
      },
      {
        name: 'barriers',
        label: 'Barriers to Change',
        type: 'textarea',
        placeholder: 'What barriers might prevent these practice changes? (mindsets, resources, skills, time)',
        hint: 'Identifying barriers helps design support mechanisms.'
      },
      {
        name: 'enablers',
        label: 'Enablers for Change',
        type: 'textarea',
        placeholder: 'What factors could enable these changes? What existing strengths can you leverage?',
        hint: 'Build on existing strengths and assets.'
      }
    ]
  },
  5: {
    title: 'Success Metrics',
    subtitle: 'How will you measure progress and impact?',
    icon: '📊',
    fields: [
      {
        name: 'leadIndicators',
        label: 'Leading Indicators',
        type: 'textarea',
        placeholder: 'What early signals will show you\'re on track? (e.g., participation rates, behavior adoption)',
        hint: 'Leading indicators help you course-correct early.',
        required: true
      },
      {
        name: 'lagIndicators',
        label: 'Lagging Indicators (Outcomes)',
        type: 'textarea',
        placeholder: 'What outcome metrics will demonstrate success? (e.g., learning outcomes, completion rates)',
        hint: 'These measure whether you achieved your intended outcomes.',
        required: true
      },
      {
        name: 'dataCollection',
        label: 'Data Collection Methods',
        type: 'textarea',
        placeholder: 'How will you collect data? What tools, processes, and responsibilities are needed?',
        hint: 'Plan for practical, sustainable data collection.'
      },
      {
        name: 'frequency',
        label: 'Monitoring Frequency',
        type: 'textarea',
        placeholder: 'How often will you measure each indicator? What triggers a review?',
        hint: 'Balance between frequent feedback and measurement burden.'
      }
    ]
  },
  6: {
    title: 'Theory of Change',
    subtitle: 'Connect your logic model',
    icon: '💡',
    fields: [
      {
        name: 'inputs',
        label: 'Inputs (Resources)',
        type: 'textarea',
        placeholder: 'What resources will you invest? (funding, people, materials, partnerships, time)',
        hint: 'Be realistic about what you need to make this work.',
        required: true
      },
      {
        name: 'activities',
        label: 'Activities (What you do)',
        type: 'textarea',
        placeholder: 'What specific activities will you implement? (training, mentoring, content creation)',
        hint: 'Activities should directly address the barriers you identified.',
        required: true
      },
      {
        name: 'outputs',
        label: 'Outputs (Direct results)',
        type: 'textarea',
        placeholder: 'What are the direct products of your activities? (trained teachers, materials distributed)',
        hint: 'Outputs are what you produce; outcomes are what changes.',
        required: true
      },
      {
        name: 'outcomes',
        label: 'Outcomes (Changes achieved)',
        type: 'textarea',
        placeholder: 'What changes will result from your outputs? Connect back to your outcome vision.',
        hint: 'This should link back to Stage 2.',
        required: true
      },
      {
        name: 'assumptions',
        label: 'Key Assumptions',
        type: 'textarea',
        placeholder: 'What must be true for this theory to work? What are you assuming?',
        hint: 'Being explicit about assumptions helps identify risks.'
      }
    ]
  },
  7: {
    title: 'Program Blueprint',
    subtitle: 'Finalize your program design',
    icon: '📜',
    fields: [
      {
        name: 'programName',
        label: 'Program Name',
        type: 'text',
        placeholder: 'Give your program a memorable name',
        hint: 'A good name communicates purpose and inspires action.',
        required: true
      },
      {
        name: 'timeline',
        label: 'Implementation Timeline',
        type: 'textarea',
        placeholder: 'What is your implementation timeline? Key phases and milestones?',
        hint: 'Consider pilot, scale, and sustainability phases.',
        required: true
      },
      {
        name: 'resources',
        label: 'Resource Requirements',
        type: 'textarea',
        placeholder: 'What resources do you need? Budget, team, materials, infrastructure?',
        hint: 'Be specific for planning and fundraising purposes.'
      },
      {
        name: 'risks',
        label: 'Key Risks',
        type: 'textarea',
        placeholder: 'What are the major risks to program success?',
        hint: 'Identify risks you need to monitor and manage.'
      },
      {
        name: 'mitigations',
        label: 'Risk Mitigations',
        type: 'textarea',
        placeholder: 'How will you mitigate each identified risk?',
        hint: 'Having mitigations ready shows thoughtful planning.'
      }
    ]
  }
}

export default function Quest() {
  const navigate = useNavigate()
  const { 
    programs, 
    currentProgramId, 
    createProgram, 
    updateProgramData, 
    completeStage,
    startStageTimer,
    exportProgram,
    selectProgram
  } = useStore()
  
  const currentProgram = programs.find(p => p.id === currentProgramId)
  const [activeStage, setActiveStage] = useState(currentProgram?.currentStage || 1)
  const [showHint, setShowHint] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  
  // Initialize program if none selected
  useEffect(() => {
    if (!currentProgram) {
      if (programs.length > 0) {
        selectProgram(programs[0].id)
      } else {
        const id = createProgram('My Program')
        selectProgram(id)
      }
    }
  }, [currentProgram, programs])
  
  // Start timer when stage changes
  useEffect(() => {
    startStageTimer()
  }, [activeStage])
  
  // Check for completion
  useEffect(() => {
    if (currentProgram?.completedStages.length === 7) {
      setIsComplete(true)
    }
  }, [currentProgram?.completedStages])
  
  if (!currentProgram) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#a8a29e]">Loading...</div>
      </div>
    )
  }
  
  const stageConfig = STAGE_FIELDS[activeStage]
  const isStageCompleted = currentProgram.completedStages.includes(activeStage)
  
  const validateStage = () => {
    const requiredFields = stageConfig.fields.filter(f => f.required)
    return requiredFields.every(f => currentProgram.data[f.name]?.trim())
  }
  
  const handleNext = () => {
    if (validateStage()) {
      completeStage(activeStage)
      if (activeStage < 7) {
        setActiveStage(activeStage + 1)
      }
    } else {
      alert('Please fill in all required fields before continuing.')
    }
  }
  
  const handlePrevious = () => {
    if (activeStage > 1) {
      setActiveStage(activeStage - 1)
    }
  }
  
  const handleExport = () => {
    const programData = exportProgram(currentProgram.id)
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
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button 
          onClick={() => navigate('/programs')}
          className="flex items-center gap-2 text-[#a8a29e] hover:text-[#f4f1de] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Programs</span>
        </button>
        
        <div className="flex items-center gap-3">
          <motion.button
            className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm"
            onClick={handleExport}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Export
          </motion.button>
        </div>
      </motion.div>
      
      {/* Stage Progress Bar */}
      <motion.div
        className="quest-card p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-xl font-bold text-[#f4f1de]"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            {currentProgram.data.programName || currentProgram.name}
          </h2>
          <span className="text-[#d4af37] text-sm">
            Stage {activeStage} of 7
          </span>
        </div>
        
        {/* Stage Indicators */}
        <div className="flex items-center gap-2">
          {INITIAL_STAGES.map((stage, index) => {
            const isCompleted = currentProgram.completedStages.includes(stage.id)
            const isCurrent = activeStage === stage.id
            const isAccessible = stage.id <= currentProgram.currentStage || isCompleted
            
            return (
              <div key={stage.id} className="flex items-center flex-1">
                <motion.button
                  className={`relative flex flex-col items-center flex-1 ${
                    isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={() => isAccessible && setActiveStage(stage.id)}
                  whileHover={isAccessible ? { scale: 1.05 } : {}}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8942e]' 
                        : isCurrent 
                          ? 'bg-[#1a2744] border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                          : 'bg-[#1a2744] border border-[rgba(212,175,55,0.2)]'
                    }`}
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} className="text-[#0a1628]" />
                    ) : (
                      <span>{stage.icon}</span>
                    )}
                  </motion.div>
                  <span className={`mt-2 text-xs text-center ${
                    isCurrent ? 'text-[#d4af37]' : 'text-[#a8a29e]'
                  }`}>
                    {stage.name}
                  </span>
                </motion.button>
                
                {index < INITIAL_STAGES.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${
                    currentProgram.completedStages.includes(stage.id)
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8942e]'
                      : 'bg-[#1a2744]'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
      
      {/* Completion Card */}
      <AnimatePresence>
        {isComplete && activeStage === 7 && (
          <motion.div
            className="quest-card p-8 mb-8 text-center glow-gold-intense"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <h2 
              className="text-2xl font-bold text-[#d4af37] mb-2"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Quest Complete!
            </h2>
            <p className="text-[#a8a29e] mb-6">
              Congratulations! You've completed your program design. 
              Export your program to share with stakeholders.
            </p>
            <div className="flex flex-col items-center gap-4">
              <ProgramPDFExport program={currentProgram} />
              <motion.button
                className="text-[#a8a29e] hover:text-[#d4af37] flex items-center gap-2 transition-colors"
                onClick={() => navigate('/achievements')}
                whileHover={{ scale: 1.02 }}
              >
                <Trophy size={16} />
                View All Achievements
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Stage Content */}
      <motion.div
        key={activeStage}
        className="quest-card p-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Stage Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-3xl"
            whileHover={{ rotate: 10 }}
          >
            {stageConfig.icon}
          </motion.div>
          <div>
            <h2 
              className="text-2xl font-bold text-[#f4f1de]"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {stageConfig.title}
            </h2>
            <p className="text-[#a8a29e]">{stageConfig.subtitle}</p>
          </div>
          {isStageCompleted && (
            <div className="ml-auto achievement-badge">
              <CheckCircle size={16} />
              <span>Completed</span>
            </div>
          )}
        </div>
        
        {/* Form Fields */}
        <div className="space-y-6">
          {stageConfig.fields.map((field) => (
            <div key={field.name} className="relative">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-[#f4f1de] font-medium">
                  {field.label}
                  {field.required && <span className="text-[#d4af37] ml-1">*</span>}
                </label>
                {field.hint && (
                  <button
                    className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                    onMouseEnter={() => setShowHint(field.name)}
                    onMouseLeave={() => setShowHint(null)}
                  >
                    <HelpCircle size={16} />
                  </button>
                )}
              </div>
              
              {/* Hint tooltip */}
              <AnimatePresence>
                {showHint === field.name && field.hint && (
                  <motion.div
                    className="absolute z-10 left-0 top-0 mt-8 p-3 bg-[#0a1628] border border-[#d4af37] rounded-lg text-sm text-[#a8a29e] max-w-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Sparkles size={14} className="inline text-[#d4af37] mr-2" />
                    {field.hint}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {field.type === 'textarea' ? (
                <textarea
                  className="quest-input quest-textarea"
                  placeholder={field.placeholder}
                  value={currentProgram.data[field.name] || ''}
                  onChange={(e) => updateProgramData(field.name, e.target.value)}
                />
              ) : (
                <input
                  type={field.type}
                  className="quest-input"
                  placeholder={field.placeholder}
                  value={currentProgram.data[field.name] || ''}
                  onChange={(e) => updateProgramData(field.name, e.target.value)}
                />
              )}
              
              {/* AI Writing Assistant */}
              <AISuggestions 
                fieldName={field.name}
                currentValue={currentProgram.data[field.name] || ''}
                programData={currentProgram.data}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(212,175,55,0.1)]">
          <motion.button
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeStage === 1 
                ? 'text-[#6b7280] cursor-not-allowed' 
                : 'text-[#a8a29e] hover:text-[#f4f1de] hover:bg-[rgba(255,255,255,0.05)]'
            }`}
            onClick={handlePrevious}
            disabled={activeStage === 1}
            whileHover={activeStage > 1 ? { x: -5 } : {}}
          >
            <ChevronLeft size={20} />
            Previous Stage
          </motion.button>
          
          <motion.button
            className="btn-primary flex items-center gap-2"
            onClick={handleNext}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeStage === 7 ? (
              <>
                <CheckCircle size={20} />
                Complete Quest
              </>
            ) : (
              <>
                Continue Quest
                <ChevronRight size={20} />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

