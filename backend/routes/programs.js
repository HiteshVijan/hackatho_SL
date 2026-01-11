import express from 'express'
import Program from '../models/Program.js'

const router = express.Router()

// GET all programs
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    const filter = userId ? { userId } : {}
    const programs = await Program.find(filter).sort({ updatedAt: -1 })
    res.json(programs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET single program by ID
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    res.json(program)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST create new program
router.post('/', async (req, res) => {
  try {
    const { name, userId, data } = req.body
    
    const program = new Program({
      name: name || 'Untitled Program',
      userId,
      data: data || {}
    })
    
    const savedProgram = await program.save()
    res.status(201).json(savedProgram)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// PUT update program
router.put('/:id', async (req, res) => {
  try {
    const { name, currentStage, completedStages, data } = req.body
    
    const updateData = {
      updatedAt: new Date()
    }
    
    if (name !== undefined) updateData.name = name
    if (currentStage !== undefined) updateData.currentStage = currentStage
    if (completedStages !== undefined) updateData.completedStages = completedStages
    if (data !== undefined) updateData.data = data
    
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    
    res.json(program)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// PATCH update specific fields
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body
    updates.updatedAt = new Date()
    
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    
    res.json(program)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE program
router.delete('/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id)
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    
    res.json({ message: 'Program deleted successfully', id: req.params.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST complete a stage
router.post('/:id/complete-stage/:stageNumber', async (req, res) => {
  try {
    const { id, stageNumber } = req.params
    const stage = parseInt(stageNumber)
    
    if (stage < 1 || stage > 7) {
      return res.status(400).json({ error: 'Stage number must be between 1 and 7' })
    }
    
    const program = await Program.findById(id)
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    
    // Add stage to completed stages if not already there
    if (!program.completedStages.includes(stage)) {
      program.completedStages.push(stage)
    }
    
    // Update current stage
    program.currentStage = Math.min(stage + 1, 7)
    program.updatedAt = new Date()
    
    await program.save()
    
    res.json({
      message: `Stage ${stage} completed`,
      program
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET export program as formatted document
router.get('/:id/export', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }
    
    // Format as a structured document
    const exportData = {
      metadata: {
        programName: program.data.programName || program.name,
        createdAt: program.createdAt,
        updatedAt: program.updatedAt,
        completionProgress: program.progress + '%',
        exportedAt: new Date().toISOString()
      },
      sections: {
        problemDefinition: {
          title: '1. Problem Definition',
          problemStatement: program.data.problemStatement,
          context: program.data.context,
          scope: program.data.scope,
          targetBeneficiaries: program.data.targetBeneficiaries
        },
        outcomeVision: {
          title: '2. Outcome Vision',
          primaryOutcomes: program.data.primaryOutcomes,
          secondaryOutcomes: program.data.secondaryOutcomes,
          indicators: program.data.indicators
        },
        stakeholderMap: {
          title: '3. Stakeholder Map',
          primaryStakeholders: program.data.primaryStakeholders,
          secondaryStakeholders: program.data.secondaryStakeholders,
          partnerships: program.data.partnerships
        },
        practiceChanges: {
          title: '4. Practice Changes',
          currentPractices: program.data.currentPractices,
          desiredPractices: program.data.desiredPractices,
          barriers: program.data.barriers,
          enablers: program.data.enablers
        },
        successMetrics: {
          title: '5. Success Metrics',
          leadIndicators: program.data.leadIndicators,
          lagIndicators: program.data.lagIndicators,
          dataCollection: program.data.dataCollection,
          frequency: program.data.frequency
        },
        theoryOfChange: {
          title: '6. Theory of Change',
          inputs: program.data.inputs,
          activities: program.data.activities,
          outputs: program.data.outputs,
          outcomes: program.data.outcomes,
          assumptions: program.data.assumptions
        },
        programBlueprint: {
          title: '7. Program Blueprint',
          programName: program.data.programName,
          timeline: program.data.timeline,
          resources: program.data.resources,
          risks: program.data.risks,
          mitigations: program.data.mitigations
        }
      }
    }
    
    res.json(exportData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

