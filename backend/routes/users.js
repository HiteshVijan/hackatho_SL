import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('programs').sort({ xp: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('programs')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET user by email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('programs')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST create new user
router.post('/', async (req, res) => {
  try {
    const { name, email, organization } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' })
    }
    
    const user = new User({
      name,
      email,
      organization
    })
    
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const { name, organization, xp, level, achievements } = req.body
    
    const updateData = {
      lastActive: new Date()
    }
    
    if (name !== undefined) updateData.name = name
    if (organization !== undefined) updateData.organization = organization
    if (xp !== undefined) updateData.xp = xp
    if (level !== undefined) updateData.level = level
    if (achievements !== undefined) updateData.achievements = achievements
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('programs')
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// POST add XP to user
router.post('/:id/add-xp', async (req, res) => {
  try {
    const { amount } = req.body
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'XP amount must be a positive number' })
    }
    
    const user = await User.findById(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Add XP
    user.xp += amount
    
    // Calculate new level
    const levelThresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900]
    let newLevel = 1
    for (let i = 1; i < levelThresholds.length; i++) {
      if (user.xp >= levelThresholds[i]) {
        newLevel = i + 1
      }
    }
    
    const leveledUp = newLevel > user.level
    user.level = newLevel
    user.lastActive = new Date()
    
    await user.save()
    
    res.json({
      user,
      xpAdded: amount,
      leveledUp,
      newLevel: user.level
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST unlock achievement
router.post('/:id/unlock-achievement', async (req, res) => {
  try {
    const { achievementId } = req.body
    
    if (!achievementId) {
      return res.status(400).json({ error: 'Achievement ID is required' })
    }
    
    const user = await User.findById(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Check if already unlocked
    if (user.achievements.includes(achievementId)) {
      return res.status(400).json({ error: 'Achievement already unlocked' })
    }
    
    user.achievements.push(achievementId)
    user.lastActive = new Date()
    
    await user.save()
    
    res.json({
      message: 'Achievement unlocked!',
      achievementId,
      user
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const users = await User.find()
      .select('name organization xp level achievements')
      .sort({ xp: -1 })
      .limit(limit)
    
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      organization: user.organization,
      xp: user.xp,
      level: user.level,
      levelTitle: user.levelTitle,
      achievementCount: user.achievements.length
    }))
    
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

