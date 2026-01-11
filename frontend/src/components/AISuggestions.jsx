import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, ChevronDown, ChevronUp, Copy, Check, Brain, Lightbulb } from 'lucide-react'

// AI-powered suggestions based on field and context
const FIELD_SUGGESTIONS = {
  problemStatement: {
    prompts: [
      "What specific learning gap exists?",
      "Who is affected and how many?",
      "What evidence shows this is a problem?",
      "What happens if this isn't solved?"
    ],
    examples: [
      "Over 60% of Grade 3 students in rural government schools cannot read a simple paragraph at grade level, limiting their ability to access further learning and future opportunities.",
      "Teachers in remote areas lack access to quality professional development, resulting in outdated teaching methods and low student engagement.",
      "School dropout rates among adolescent girls reach 40% due to lack of safe sanitation facilities and menstrual hygiene awareness."
    ],
    tips: [
      "Be specific about the scale (numbers, percentages)",
      "Mention the geographic or demographic context",
      "Connect to broader educational equity goals"
    ]
  },
  context: {
    prompts: [
      "What is the geographic and demographic setting?",
      "What systems or policies are already in place?",
      "What previous interventions have been tried?",
      "What resources currently exist?"
    ],
    examples: [
      "Rural blocks in northern Karnataka with predominantly agricultural communities. Government schools serve 85% of children. DIET provides annual training but limited follow-up support exists.",
      "Post-pandemic context with significant learning loss. State has launched FLN mission but implementation support at school level remains weak."
    ],
    tips: [
      "Include relevant government schemes or policies",
      "Mention existing infrastructure and resources",
      "Note any cultural or social factors"
    ]
  },
  targetBeneficiaries: {
    prompts: [
      "Who will directly benefit from this program?",
      "Are there secondary beneficiaries?",
      "What are their current challenges?",
      "How many will you reach?"
    ],
    examples: [
      "Primary: 5,000 students in Grades 1-3 across 200 government schools\nSecondary: 400 teachers who will receive training\nTertiary: Parents who will be engaged in supporting learning at home",
      "Primary: Government school teachers (8,000) in 5 districts\nSecondary: Students (300,000) who benefit from improved teaching\nTertiary: CRPs and DIETs who build capacity"
    ],
    tips: [
      "Quantify beneficiaries where possible",
      "Consider indirect beneficiaries too",
      "Note specific vulnerabilities or needs"
    ]
  },
  primaryOutcomes: {
    prompts: [
      "What will students be able to do differently?",
      "How will you measure this change?",
      "What is a realistic target?",
      "By when will this be achieved?"
    ],
    examples: [
      "80% of Grade 3 students will achieve grade-appropriate reading fluency (40+ words per minute) by end of Year 2",
      "Student attendance improves by 15% compared to baseline\n70% of students demonstrate improved engagement in classroom activities",
      "Learning outcomes in foundational literacy improve by 25% as measured by standardized assessments"
    ],
    tips: [
      "Make outcomes specific and measurable",
      "Set realistic but ambitious targets",
      "Focus on student-level changes"
    ]
  },
  primaryStakeholders: {
    prompts: [
      "Who will implement the program?",
      "Who will be directly affected?",
      "Who has decision-making power?",
      "Who provides resources?"
    ],
    examples: [
      "Teachers (primary implementers): 500 government school teachers in Grades 1-5\nPrincipals: School leaders who enable and support implementation\nStudents: 25,000 children who are the ultimate beneficiaries\nCRPs: 50 cluster resource persons who provide ongoing support",
      "DIET Faculty: Design and deliver training\nBlock Education Officers: Provide administrative support\nParents: Support learning at home"
    ],
    tips: [
      "Think about Sarkaar, Samaaj, Bazaar, Sanchar",
      "Consider who influences vs. who implements",
      "Map both supporters and potential resistors"
    ]
  },
  currentPractices: {
    prompts: [
      "What are teachers/stakeholders doing now?",
      "What ineffective behaviors exist?",
      "Why do these practices persist?",
      "What is the impact of current practices?"
    ],
    examples: [
      "Teachers rely exclusively on textbook reading and rote memorization. Limited use of teaching-learning materials. Single-pace instruction without differentiation for struggling learners.",
      "Principals focus on administrative tasks (80% of time). Rare classroom visits. No systematic teacher feedback or support.",
      "Parents uninvolved in children's education. SMCs exist on paper but don't meet regularly. Schools seen as government responsibility."
    ],
    tips: [
      "Describe observable behaviors, not intentions",
      "Consider practices at multiple levels",
      "Note underlying causes of current practices"
    ]
  },
  desiredPractices: {
    prompts: [
      "What should stakeholders START doing?",
      "What should they STOP doing?",
      "What should they CONTINUE?",
      "How different is this from current state?"
    ],
    examples: [
      "START: Daily 30-minute FLN activities using structured lesson plans\nSTART: Weekly small-group instruction for struggling learners\nSTOP: Whole-class rote reading without comprehension checks\nCONTINUE: Daily attendance tracking",
      "Teachers conduct formative assessments weekly and adjust instruction based on results. Principals observe 2 classrooms per week and provide constructive feedback."
    ],
    tips: [
      "Be specific about new behaviors",
      "Ensure changes are realistic and achievable",
      "Consider what support is needed for change"
    ]
  },
  leadIndicators: {
    prompts: [
      "What early signals show you're on track?",
      "What can you measure weekly/monthly?",
      "What behaviors indicate adoption?",
      "What participation metrics matter?"
    ],
    examples: [
      "Training completion rate: % of teachers completing all modules\nPractice adoption: % of teachers using new methods weekly (observation)\nEngagement: Attendance at cluster learning sessions\nSupport utilization: # of queries to helpdesk",
      "Classroom observation scores on new practices\nTeacher self-reported confidence levels\nFrequency of TLM usage in classrooms"
    ],
    tips: [
      "Choose indicators you can measure frequently",
      "Focus on behaviors and engagement",
      "Set thresholds that trigger action"
    ]
  },
  inputs: {
    prompts: [
      "What funding is required?",
      "What human resources are needed?",
      "What materials and technology?",
      "What partnerships and permissions?"
    ],
    examples: [
      "Funding: ₹2 Crore over 18 months\nTeam: 8 full-time staff + 25 master trainers\nMaterials: Training handbooks, TLMs, assessment tools\nTechnology: LMS platform, monitoring dashboard\nPartnerships: State education department MoU, DIET collaboration",
      "Core team: Program manager, 5 district coordinators, M&E specialist\nContent: Curated digital resources, micro-learning videos\nInfrastructure: Training venues at DIET, field travel"
    ],
    tips: [
      "Be realistic about resource needs",
      "Include in-kind contributions",
      "Note critical dependencies"
    ]
  },
  activities: {
    prompts: [
      "What training will you provide?",
      "What materials will you create?",
      "What support systems will you establish?",
      "What monitoring activities?"
    ],
    examples: [
      "1. Baseline assessment of all target teachers\n2. 5-day intensive training workshops\n3. Monthly cluster learning sessions\n4. Bi-weekly school support visits by CRPs\n5. Ongoing WhatsApp-based peer support\n6. Quarterly review meetings with stakeholders",
      "Content development: Create 50 lesson plans aligned to curriculum\nTraining: Cascade training reaching 500 teachers\nMonitoring: Monthly data collection and review"
    ],
    tips: [
      "Sequence activities logically",
      "Include both one-time and ongoing activities",
      "Ensure activities address identified barriers"
    ]
  },
  timeline: {
    prompts: [
      "What are your major phases?",
      "What are key milestones?",
      "When will you see results?",
      "What is the total duration?"
    ],
    examples: [
      "Phase 1 (Months 1-3): Setup and baseline\n- Team hiring, partnerships, baseline assessment\n\nPhase 2 (Months 4-6): Pilot\n- Train 100 teachers, test model, refine\n\nPhase 3 (Months 7-12): Scale\n- Expand to all 500 teachers, full implementation\n\nPhase 4 (Months 13-18): Sustain\n- Handover to government, endline evaluation",
      "Year 1: Build and pilot\nYear 2: Scale and refine\nYear 3: Institutionalize and exit"
    ],
    tips: [
      "Build in time for iteration and learning",
      "Include evaluation milestones",
      "Plan for sustainability from the start"
    ]
  },
  risks: {
    prompts: [
      "What could prevent success?",
      "What external factors could disrupt?",
      "What assumptions might not hold?",
      "What capacity gaps exist?"
    ],
    examples: [
      "1. Low teacher adoption: Teachers may resist new methods\n2. Staff turnover: Key team members leave mid-program\n3. Government priority shifts: New policies deprioritize intervention\n4. Funding delays: Resources not released on time\n5. Connectivity issues: Technology doesn't work in remote areas",
      "Political changes affecting education priorities\nNatural disasters or health emergencies\nPartner organization capacity constraints"
    ],
    tips: [
      "Consider likelihood AND impact",
      "Think about risks at different levels",
      "Include both internal and external risks"
    ]
  }
}

// Generate contextual suggestions based on what user has already written
function generateContextualSuggestions(fieldName, currentValue, programData) {
  const suggestions = []
  
  // Check for common improvements
  if (currentValue.length < 50) {
    suggestions.push({
      type: 'expand',
      text: 'Consider adding more detail to strengthen this section',
      icon: '📝'
    })
  }
  
  // Check for numbers/metrics
  if (!currentValue.match(/\d+/) && ['primaryOutcomes', 'scope', 'targetBeneficiaries', 'leadIndicators'].includes(fieldName)) {
    suggestions.push({
      type: 'quantify',
      text: 'Adding specific numbers or percentages will make this more compelling',
      icon: '📊'
    })
  }
  
  // Check for timeline mentions
  if (!currentValue.toLowerCase().match(/(month|year|week|day|phase)/) && ['timeline', 'primaryOutcomes', 'activities'].includes(fieldName)) {
    suggestions.push({
      type: 'timeline',
      text: 'Consider adding timeframes to make this more actionable',
      icon: '📅'
    })
  }
  
  // Cross-reference with other fields
  if (fieldName === 'desiredPractices' && programData.currentPractices) {
    suggestions.push({
      type: 'connect',
      text: 'Good practice: Link your desired practices to the current practices you identified',
      icon: '🔗'
    })
  }
  
  if (fieldName === 'outcomes' && programData.primaryOutcomes) {
    suggestions.push({
      type: 'connect',
      text: 'Ensure these outcomes align with the Outcome Vision you defined in Stage 2',
      icon: '🎯'
    })
  }
  
  return suggestions
}

export default function AISuggestions({ fieldName, currentValue = '', programData = {} }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [activeTab, setActiveTab] = useState('examples')
  
  const fieldSuggestions = FIELD_SUGGESTIONS[fieldName] || {}
  const contextualSuggestions = generateContextualSuggestions(fieldName, currentValue, programData)
  
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  
  if (!fieldSuggestions.examples && !fieldSuggestions.prompts) {
    return null
  }
  
  return (
    <motion.div
      className="mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Contextual Suggestions */}
      <AnimatePresence>
        {contextualSuggestions.length > 0 && currentValue.length > 10 && (
          <motion.div
            className="mb-2 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {contextualSuggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-xs text-[#d4af37] bg-[rgba(212,175,55,0.1)] px-3 py-2 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.text}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Assistant Toggle */}
      <motion.button
        className="flex items-center gap-2 text-sm text-[#a8a29e] hover:text-[#d4af37] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ x: 2 }}
      >
        <Wand2 size={14} className="text-[#d4af37]" />
        <span>AI Writing Assistant</span>
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </motion.button>
      
      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-3 p-4 rounded-xl bg-gradient-to-br from-[#1a2744] to-[#0f1d32] border border-[rgba(212,175,55,0.2)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center">
                <Brain size={16} className="text-[#0a1628]" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#f4f1de]">AI Writing Assistant</h4>
                <p className="text-xs text-[#6b7280]">Get help crafting this section</p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { id: 'examples', label: 'Examples', icon: Sparkles },
                { id: 'prompts', label: 'Guiding Questions', icon: Lightbulb },
                { id: 'tips', label: 'Tips', icon: Brain }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#d4af37] text-[#0a1628]'
                      : 'bg-[rgba(255,255,255,0.05)] text-[#a8a29e] hover:text-[#f4f1de]'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={12} />
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Content */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activeTab === 'examples' && fieldSuggestions.examples?.map((example, i) => (
                <motion.div
                  key={i}
                  className="group relative p-3 rounded-lg bg-[rgba(26,39,68,0.5)] hover:bg-[rgba(26,39,68,0.8)] transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-sm text-[#a8a29e] whitespace-pre-wrap pr-8">{example}</p>
                  <motion.button
                    className="absolute top-2 right-2 p-1.5 rounded bg-[rgba(212,175,55,0.2)] text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(example, i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Copy to clipboard"
                  >
                    {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                  </motion.button>
                </motion.div>
              ))}
              
              {activeTab === 'prompts' && fieldSuggestions.prompts?.map((prompt, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-[#d4af37] mt-0.5">→</span>
                  <span className="text-[#f4f1de]">{prompt}</span>
                </motion.div>
              ))}
              
              {activeTab === 'tips' && fieldSuggestions.tips?.map((tip, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 p-2 rounded-lg bg-[rgba(212,175,55,0.1)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Lightbulb size={14} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#f4f1de]">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

