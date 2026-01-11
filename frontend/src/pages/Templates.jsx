import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, ArrowRight, Sparkles, Search, Clock, 
  TrendingUp, Star, ChevronDown, ChevronUp, Eye,
  CheckCircle, X
} from 'lucide-react'
import useStore from '../store/useStore'
import { PROGRAM_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates'
import { toast } from '../components/Toast'

const difficultyColors = {
  'Beginner': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  'Intermediate': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'Advanced': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
}

export default function Templates() {
  const navigate = useNavigate()
  const { createProgram, updateProgramData } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [sortBy, setSortBy] = useState('popularity')
  
  let filteredTemplates = PROGRAM_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort templates
  if (sortBy === 'popularity') {
    filteredTemplates = [...filteredTemplates].sort((a, b) => b.popularity - a.popularity)
  } else if (sortBy === 'name') {
    filteredTemplates = [...filteredTemplates].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'difficulty') {
    const order = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
    filteredTemplates = [...filteredTemplates].sort((a, b) => order[a.difficulty] - order[b.difficulty])
  }
  
  const handleUseTemplate = (template) => {
    // Create new program with template data
    const programId = createProgram(template.data.programName || template.name)
    
    // Get the store and update with template data
    const store = useStore.getState()
    Object.entries(template.data).forEach(([field, value]) => {
      store.updateProgramData(field, value)
    })
    
    toast.success(`Created program from "${template.name}" template!`)
    navigate('/quest')
  }
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-[#d4af37] text-sm mb-4">
          <FileText size={16} />
          <span>Program Templates</span>
        </div>
        <h1 
          className="text-4xl font-bold text-[#f4f1de] mb-2"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Start with a Template
        </h1>
        <p className="text-[#a8a29e] max-w-xl mx-auto">
          Don't start from scratch! Choose from {PROGRAM_TEMPLATES.length} expertly crafted templates
          and customize them for your needs.
        </p>
      </motion.div>
      
      {/* Search and Filter */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Search and Sort Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" size={20} />
            <input
              type="text"
              className="quest-input pl-12"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Sort */}
          <select
            className="quest-input w-full md:w-48 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Most Popular</option>
            <option value="name">Alphabetical</option>
            <option value="difficulty">By Difficulty</option>
          </select>
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {TEMPLATE_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b8942e] text-[#0a1628] font-medium'
                  : 'bg-[#1a2744] text-[#a8a29e] hover:bg-[rgba(212,175,55,0.2)] hover:text-[#f4f1de]'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Results count */}
      <motion.p
        className="text-sm text-[#6b7280] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Showing {filteredTemplates.length} of {PROGRAM_TEMPLATES.length} templates
      </motion.p>
      
      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTemplates.map((template, index) => {
          const diffColors = difficultyColors[template.difficulty] || difficultyColors['Beginner']
          
          return (
            <motion.div
              key={template.id}
              className="quest-card p-6 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Popularity badge */}
              {template.popularity >= 90 && (
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="flex items-center gap-1 px-2 py-1 bg-[#d4af37] text-[#0a1628] rounded-full text-xs font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star size={12} fill="currentColor" />
                    Popular
                  </motion.div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-3xl flex-shrink-0"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                >
                  {template.icon}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <h3 
                    className="text-lg font-bold text-[#f4f1de] mb-1 pr-16"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {template.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-xs bg-[rgba(212,175,55,0.2)] text-[#d4af37] rounded-full">
                      {template.category}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${diffColors.bg} ${diffColors.text}`}>
                      {template.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#6b7280]">
                      <Clock size={12} />
                      {template.estimatedTime}
                    </span>
                  </div>
                  
                  <p className="text-[#a8a29e] text-sm mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  
                  {/* What's included */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['Problem', 'Outcomes', 'Stakeholders', 'Indicators'].map((item) => (
                      <span 
                        key={item}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-[#1a2744] text-[#6b7280] rounded-lg"
                      >
                        <CheckCircle size={10} className="text-green-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5"
                      onClick={() => handleUseTemplate(template)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={16} />
                      Use Template
                    </motion.button>
                    <motion.button
                      className="px-4 py-2.5 rounded-lg border border-[rgba(212,175,55,0.3)] text-[#a8a29e] hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                      onClick={() => setPreviewTemplate(template)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          )
        })}
      </div>
      
      {filteredTemplates.length === 0 && (
        <motion.div
          className="quest-card p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-[#f4f1de] mb-2">No templates found</h3>
          <p className="text-[#a8a29e] mb-4">Try adjusting your search or filters</p>
          <motion.button
            className="btn-secondary"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            whileHover={{ scale: 1.05 }}
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}
      
      {/* Custom Start Option */}
      <motion.div
        className="mt-12 quest-card p-8 text-center glow-gold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-4xl mb-4">✨</div>
        <h3 
          className="text-xl font-bold text-[#f4f1de] mb-2"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Want to start fresh?
        </h3>
        <p className="text-[#a8a29e] mb-6 max-w-md mx-auto">
          Create a program from scratch with our guided 7-stage wizard
        </p>
        <motion.button
          className="btn-primary"
          onClick={() => {
            createProgram('New Program')
            toast.info('New program created!')
            navigate('/quest')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles size={18} className="inline mr-2" />
          Start Blank Program
        </motion.button>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              className="quest-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-2xl">
                    {previewTemplate.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#f4f1de]" style={{ fontFamily: 'Cinzel, serif' }}>
                      {previewTemplate.name}
                    </h2>
                    <p className="text-sm text-[#a8a29e]">{previewTemplate.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                  <X size={20} className="text-[#a8a29e]" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#d4af37] mb-2">Problem Statement</h4>
                  <p className="text-sm text-[#a8a29e] bg-[#1a2744] p-3 rounded-lg">
                    {previewTemplate.data.problemStatement}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#d4af37] mb-2">Primary Outcomes</h4>
                  <p className="text-sm text-[#a8a29e] bg-[#1a2744] p-3 rounded-lg whitespace-pre-line">
                    {previewTemplate.data.primaryOutcomes}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#d4af37] mb-2">Target Beneficiaries</h4>
                  <p className="text-sm text-[#a8a29e] bg-[#1a2744] p-3 rounded-lg whitespace-pre-line">
                    {previewTemplate.data.targetBeneficiaries}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  onClick={() => {
                    handleUseTemplate(previewTemplate)
                    setPreviewTemplate(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Sparkles size={18} />
                  Use This Template
                </motion.button>
                <motion.button
                  className="btn-secondary"
                  onClick={() => setPreviewTemplate(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
