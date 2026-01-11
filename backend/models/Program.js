import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Untitled Program'
  },
  userId: {
    type: String,
    required: false
  },
  currentStage: {
    type: Number,
    default: 1,
    min: 1,
    max: 7
  },
  completedStages: {
    type: [Number],
    default: []
  },
  data: {
    // Stage 1: Problem
    problemStatement: { type: String, default: '' },
    context: { type: String, default: '' },
    scope: { type: String, default: '' },
    targetBeneficiaries: { type: String, default: '' },
    
    // Stage 2: Outcomes
    primaryOutcomes: { type: String, default: '' },
    secondaryOutcomes: { type: String, default: '' },
    indicators: { type: String, default: '' },
    
    // Stage 3: Stakeholders
    primaryStakeholders: { type: String, default: '' },
    secondaryStakeholders: { type: String, default: '' },
    partnerships: { type: String, default: '' },
    
    // Stage 4: Practice Changes
    currentPractices: { type: String, default: '' },
    desiredPractices: { type: String, default: '' },
    barriers: { type: String, default: '' },
    enablers: { type: String, default: '' },
    
    // Stage 5: Metrics
    leadIndicators: { type: String, default: '' },
    lagIndicators: { type: String, default: '' },
    dataCollection: { type: String, default: '' },
    frequency: { type: String, default: '' },
    
    // Stage 6: Theory of Change
    inputs: { type: String, default: '' },
    activities: { type: String, default: '' },
    outputs: { type: String, default: '' },
    outcomes: { type: String, default: '' },
    assumptions: { type: String, default: '' },
    
    // Stage 7: Blueprint
    programName: { type: String, default: '' },
    timeline: { type: String, default: '' },
    resources: { type: String, default: '' },
    risks: { type: String, default: '' },
    mitigations: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Update the updatedAt field before saving
programSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Virtual for progress percentage
programSchema.virtual('progress').get(function() {
  return Math.round((this.completedStages.length / 7) * 100)
})

// Ensure virtuals are included in JSON
programSchema.set('toJSON', { virtuals: true })
programSchema.set('toObject', { virtuals: true })

const Program = mongoose.model('Program', programSchema)

export default Program

