import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import programRoutes from './routes/programs.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection (optional - falls back to in-memory if not configured)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/programforge'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.log('⚠️ MongoDB not connected, using in-memory storage')
    console.log('   To use MongoDB, set MONGODB_URI in .env file')
  })

// Routes
app.use('/api/programs', programRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ProgramForge API is running',
    timestamp: new Date().toISOString()
  })
})

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'ProgramForge API',
    version: '1.0.0',
    description: 'Gamified Program Design Framework for NGOs',
    endpoints: {
      health: '/api/health',
      programs: '/api/programs',
      users: '/api/users'
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  })
})

app.listen(PORT, () => {
  console.log(`
  ⚒️  ProgramForge API Server
  ===========================
  🚀 Server running on port ${PORT}
  📍 http://localhost:${PORT}
  
  Endpoints:
  - GET  /api/health     - Health check
  - GET  /api/programs   - List all programs
  - POST /api/programs   - Create new program
  - GET  /api/programs/:id - Get program by ID
  - PUT  /api/programs/:id - Update program
  - DELETE /api/programs/:id - Delete program
  `)
})

export default app

