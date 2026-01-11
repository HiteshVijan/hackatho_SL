import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  organization: {
    type: String,
    default: ''
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  achievements: {
    type: [String],
    default: []
  },
  programs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Virtual for level title
userSchema.virtual('levelTitle').get(function() {
  const titles = [
    'Novice Planner',
    'Apprentice Designer',
    'Program Scout',
    'Framework Builder',
    'Impact Strategist',
    'Systems Thinker',
    'Master Architect',
    'Legendary Changemaker'
  ]
  return titles[Math.min(this.level - 1, titles.length - 1)]
})

userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })

const User = mongoose.model('User', userSchema)

export default User

