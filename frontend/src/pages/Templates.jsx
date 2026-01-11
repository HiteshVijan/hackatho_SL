import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight, Sparkles, Search } from 'lucide-react'
import useStore from '../store/useStore'
import { PROGRAM_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates'

export default function Templates() {
  const navigate = useNavigate()
  const { createProgram, selectProgram, updateProgramData } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredTemplates = PROGRAM_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  const handleUseTemplate = (template) => {
    // Create new program with template data
    const programId = createProgram(template.data.programName || template.name)
    
    // Get the store and update with template data
    const store = useStore.getState()
    Object.entries(template.data).forEach(([field, value]) => {
      store.updateProgramData(field, value)
    })
    
    navigate('/quest')
  }
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
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
          Don't start from scratch! Choose a template based on common education program types
          and customize it for your needs.
        </p>
      </motion.div>
      
      {/* Search and Filter */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
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
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TEMPLATE_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#d4af37] text-[#0a1628]'
                  : 'bg-[#1a2744] text-[#a8a29e] hover:bg-[rgba(212,175,55,0.2)] hover:text-[#f4f1de]'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            className="quest-card p-6 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center text-2xl"
                whileHover={{ rotate: 10 }}
              >
                {template.icon}
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 
                    className="text-lg font-bold text-[#f4f1de]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {template.name}
                  </h3>
                </div>
                
                <span className="inline-block px-2 py-0.5 text-xs bg-[rgba(212,175,55,0.2)] text-[#d4af37] rounded mb-2">
                  {template.category}
                </span>
                
                <p className="text-[#a8a29e] text-sm mb-4">
                  {template.description}
                </p>
                
                {/* Preview of what's included */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Problem', 'Outcomes', 'Stakeholders'].map((item) => (
                    <span 
                      key={item}
                      className="text-xs px-2 py-1 bg-[#1a2744] text-[#6b7280] rounded"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
                
                <motion.button
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  onClick={() => handleUseTemplate(template)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={16} />
                  Use This Template
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <motion.div
          className="quest-card p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#a8a29e]">No templates match your search</p>
        </motion.div>
      )}
      
      {/* Custom Start Option */}
      <motion.div
        className="mt-12 quest-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 
          className="text-xl font-bold text-[#f4f1de] mb-2"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Want to start fresh?
        </h3>
        <p className="text-[#a8a29e] mb-4">
          Create a program from scratch with our guided wizard
        </p>
        <motion.button
          className="btn-secondary"
          onClick={() => {
            createProgram('New Program')
            navigate('/quest')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Blank Program
        </motion.button>
      </motion.div>
    </div>
  )
}

