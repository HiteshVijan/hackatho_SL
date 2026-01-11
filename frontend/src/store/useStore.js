import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// XP required for each level (cumulative)
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  450,    // Level 4
  700,    // Level 5
  1000,   // Level 6
  1400,   // Level 7
  1900,   // Level 8 - Program Architect
]

const LEVEL_TITLES = [
  'Novice Planner',
  'Apprentice Designer',
  'Program Scout',
  'Framework Builder',
  'Impact Strategist',
  'Systems Thinker',
  'Master Architect',
  'Legendary Changemaker'
]

// Achievement definitions
const ACHIEVEMENTS = {
  first_step: {
    id: 'first_step',
    name: 'First Step',
    description: 'Started your first program design journey',
    icon: '🚀',
    xp: 25
  },
  problem_defined: {
    id: 'problem_defined',
    name: 'Problem Spotter',
    description: 'Clearly defined the core problem',
    icon: '🔍',
    xp: 50
  },
  outcomes_set: {
    id: 'outcomes_set',
    name: 'Outcome Visionary',
    description: 'Set student-level outcomes',
    icon: '🎯',
    xp: 50
  },
  stakeholders_mapped: {
    id: 'stakeholders_mapped',
    name: 'Network Weaver',
    description: 'Mapped all stakeholders',
    icon: '🕸️',
    xp: 50
  },
  practices_defined: {
    id: 'practices_defined',
    name: 'Change Agent',
    description: 'Defined practice changes',
    icon: '⚡',
    xp: 50
  },
  metrics_set: {
    id: 'metrics_set',
    name: 'Data Champion',
    description: 'Set success metrics',
    icon: '📊',
    xp: 50
  },
  theory_complete: {
    id: 'theory_complete',
    name: 'Theory Master',
    description: 'Completed Theory of Change',
    icon: '💡',
    xp: 75
  },
  program_complete: {
    id: 'program_complete',
    name: 'Program Architect',
    description: 'Completed your first program design!',
    icon: '🏆',
    xp: 150
  },
  speed_runner: {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Completed a stage in under 2 minutes',
    icon: '⚡',
    xp: 30
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Filled all optional fields in a stage',
    icon: '✨',
    xp: 40
  },
  multi_program: {
    id: 'multi_program',
    name: 'Portfolio Builder',
    description: 'Created 3 or more programs',
    icon: '📚',
    xp: 100
  },
  streak_3: {
    id: 'streak_3',
    name: 'Consistent Creator',
    description: 'Maintained a 3-day streak',
    icon: '🔥',
    xp: 50
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '⭐',
    xp: 100
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Adopter',
    description: 'One of the first to use ProgramForge',
    icon: '🌅',
    xp: 25
  }
}

// The 7 stages of CLF-aligned program design
const INITIAL_STAGES = [
  {
    id: 1,
    name: 'The Problem Quest',
    description: 'Define the core education challenge you want to solve',
    icon: '🔍',
    fields: ['problemStatement', 'context', 'scope', 'targetBeneficiaries'],
    unlockAchievement: 'problem_defined'
  },
  {
    id: 2,
    name: 'Outcome Vision',
    description: 'Define what success looks like for students',
    icon: '🎯',
    fields: ['primaryOutcomes', 'secondaryOutcomes', 'indicators'],
    unlockAchievement: 'outcomes_set'
  },
  {
    id: 3,
    name: 'Stakeholder Map',
    description: 'Identify all actors in the ecosystem',
    icon: '🕸️',
    fields: ['primaryStakeholders', 'secondaryStakeholders', 'partnerships'],
    unlockAchievement: 'stakeholders_mapped'
  },
  {
    id: 4,
    name: 'Practice Changes',
    description: 'Define what behaviors need to change',
    icon: '⚡',
    fields: ['currentPractices', 'desiredPractices', 'barriers', 'enablers'],
    unlockAchievement: 'practices_defined'
  },
  {
    id: 5,
    name: 'Success Metrics',
    description: 'How will you measure progress and impact?',
    icon: '📊',
    fields: ['leadIndicators', 'lagIndicators', 'dataCollection', 'frequency'],
    unlockAchievement: 'metrics_set'
  },
  {
    id: 6,
    name: 'Theory of Change',
    description: 'Connect your logic model',
    icon: '💡',
    fields: ['inputs', 'activities', 'outputs', 'outcomes', 'assumptions'],
    unlockAchievement: 'theory_complete'
  },
  {
    id: 7,
    name: 'Program Blueprint',
    description: 'Finalize your program design',
    icon: '📜',
    fields: ['programName', 'timeline', 'resources', 'risks', 'mitigations'],
    unlockAchievement: 'program_complete'
  }
]

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { id: '1', name: 'Priya Sharma', organization: 'EduReach Foundation', xp: 2450, level: 8, avatar: '👩‍🏫', programs: 12 },
  { id: '2', name: 'Rahul Verma', organization: 'Learn4All NGO', xp: 2100, level: 7, avatar: '👨‍💼', programs: 9 },
  { id: '3', name: 'Anita Desai', organization: 'Rural Education Trust', xp: 1850, level: 7, avatar: '👩‍💻', programs: 8 },
  { id: '4', name: 'Vikram Singh', organization: 'Youth Uplift', xp: 1600, level: 6, avatar: '👨‍🎓', programs: 7 },
  { id: '5', name: 'Meera Patel', organization: 'Bright Futures', xp: 1400, level: 6, avatar: '👩‍🔬', programs: 6 },
  { id: '6', name: 'Arjun Kumar', organization: 'EduTech Solutions', xp: 1200, level: 5, avatar: '🧑‍🏫', programs: 5 },
  { id: '7', name: 'Kavita Rao', organization: 'Child First India', xp: 1000, level: 5, avatar: '👩‍⚕️', programs: 5 },
  { id: '8', name: 'Suresh Nair', organization: 'Skill Bridge', xp: 850, level: 4, avatar: '👨‍🔧', programs: 4 },
  { id: '9', name: 'Deepa Menon', organization: 'Dream School Project', xp: 700, level: 4, avatar: '👩‍🎨', programs: 3 },
  { id: '10', name: 'Amit Joshi', organization: 'Tech4Education', xp: 550, level: 3, avatar: '👨‍💻', programs: 3 },
]

const useStore = create(
  persist(
    (set, get) => ({
      // User profile
      user: {
        name: '',
        organization: '',
        email: '',
        avatar: '🧑‍💼',
        joinedAt: null
      },
      
      // Gamification state
      xp: 0,
      level: 1,
      achievements: [],
      
      // Streak tracking
      streak: {
        current: 0,
        longest: 0,
        lastActiveDate: null
      },
      
      // Settings
      settings: {
        soundEnabled: true,
        notificationsEnabled: true,
        theme: 'dark'
      },
      
      // Programs
      programs: [],
      currentProgramId: null,
      
      // UI state
      showAchievementModal: false,
      latestAchievement: null,
      showConfetti: false,
      hasCompletedOnboarding: false,
      
      // Stage timing for speed achievements
      stageStartTime: null,
      
      // Computed values
      get currentProgram() {
        const state = get()
        return state.programs.find(p => p.id === state.currentProgramId)
      },
      
      getLevelProgress: () => {
        const { xp, level } = get()
        const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
        const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
        const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        return Math.min(100, Math.max(0, progress))
      },
      
      getLevelTitle: () => {
        const { level } = get()
        return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]
      },
      
      getXpToNextLevel: () => {
        const { xp, level } = get()
        const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
        return Math.max(0, nextThreshold - xp)
      },
      
      getLeaderboard: () => {
        const { user, xp, level, programs } = get()
        // Insert current user into leaderboard
        const currentUser = {
          id: 'current',
          name: user.name || 'You',
          organization: user.organization || 'Your Organization',
          xp,
          level,
          avatar: user.avatar,
          programs: programs.length,
          isCurrentUser: true
        }
        
        const combined = [...MOCK_LEADERBOARD, currentUser]
        return combined.sort((a, b) => b.xp - a.xp).slice(0, 15)
      },
      
      getUserRank: () => {
        const leaderboard = get().getLeaderboard()
        const rank = leaderboard.findIndex(u => u.isCurrentUser) + 1
        return rank || leaderboard.length + 1
      },
      
      // Actions
      setUser: (userData) => set({ user: { ...get().user, ...userData } }),
      
      updateSettings: (newSettings) => set({ 
        settings: { ...get().settings, ...newSettings } 
      }),
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      // Streak management
      updateStreak: () => {
        const { streak } = get()
        const today = new Date().toDateString()
        const lastActive = streak.lastActiveDate
        
        if (lastActive === today) {
          // Already active today
          return streak.current
        }
        
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        
        if (lastActive === yesterday) {
          // Continuing streak
          const newStreak = streak.current + 1
          const newLongest = Math.max(streak.longest, newStreak)
          
          set({
            streak: {
              current: newStreak,
              longest: newLongest,
              lastActiveDate: today
            }
          })
          
          // Check for streak achievements
          if (newStreak === 3) get().unlockAchievement('streak_3')
          if (newStreak === 7) get().unlockAchievement('streak_7')
          
          return newStreak
        }
        
        // Streak broken or first day
        set({
          streak: {
            current: 1,
            longest: Math.max(streak.longest, 1),
            lastActiveDate: today
          }
        })
        
        return 1
      },
      
      addXp: (amount) => {
        const { xp, level } = get()
        const newXp = xp + amount
        let newLevel = level
        
        // Check for level up
        while (newLevel < LEVEL_THRESHOLDS.length && newXp >= LEVEL_THRESHOLDS[newLevel]) {
          newLevel++
        }
        
        const leveledUp = newLevel > level
        
        set({ 
          xp: newXp, 
          level: newLevel,
          showConfetti: leveledUp
        })
        
        if (leveledUp) {
          setTimeout(() => set({ showConfetti: false }), 5000)
        }
        
        return { leveledUp, newLevel, newLevelTitle: LEVEL_TITLES[newLevel - 1] }
      },
      
      unlockAchievement: (achievementId) => {
        const { achievements } = get()
        const achievement = ACHIEVEMENTS[achievementId]
        
        if (!achievement || achievements.includes(achievementId)) {
          return false
        }
        
        set({
          achievements: [...achievements, achievementId],
          latestAchievement: achievement,
          showAchievementModal: true
        })
        
        // Add XP for achievement
        get().addXp(achievement.xp)
        
        return true
      },
      
      closeAchievementModal: () => set({ 
        showAchievementModal: false, 
        latestAchievement: null 
      }),
      
      // Program management
      createProgram: (name = 'Untitled Program') => {
        const newProgram = {
          id: Date.now().toString(),
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          currentStage: 1,
          completedStages: [],
          data: {
            // Stage 1: Problem
            problemStatement: '',
            context: '',
            scope: '',
            targetBeneficiaries: '',
            // Stage 2: Outcomes
            primaryOutcomes: '',
            secondaryOutcomes: '',
            indicators: '',
            // Stage 3: Stakeholders
            primaryStakeholders: '',
            secondaryStakeholders: '',
            partnerships: '',
            // Stage 4: Practice Changes
            currentPractices: '',
            desiredPractices: '',
            barriers: '',
            enablers: '',
            // Stage 5: Metrics
            leadIndicators: '',
            lagIndicators: '',
            dataCollection: '',
            frequency: '',
            // Stage 6: Theory of Change
            inputs: '',
            activities: '',
            outputs: '',
            outcomes: '',
            assumptions: '',
            // Stage 7: Blueprint
            programName: name,
            timeline: '',
            resources: '',
            risks: '',
            mitigations: ''
          }
        }
        
        set(state => ({
          programs: [...state.programs, newProgram],
          currentProgramId: newProgram.id
        }))
        
        // Update streak
        get().updateStreak()
        
        // First program achievement
        if (get().programs.length === 1) {
          get().unlockAchievement('first_step')
          get().unlockAchievement('early_bird')
        }
        
        // Multi-program achievement
        if (get().programs.length >= 3) {
          get().unlockAchievement('multi_program')
        }
        
        return newProgram.id
      },
      
      selectProgram: (programId) => set({ currentProgramId: programId }),
      
      updateProgramData: (field, value) => {
        set(state => ({
          programs: state.programs.map(p => 
            p.id === state.currentProgramId
              ? { 
                  ...p, 
                  data: { ...p.data, [field]: value },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }))
        
        // Update streak on activity
        get().updateStreak()
      },
      
      startStageTimer: () => set({ stageStartTime: Date.now() }),
      
      completeStage: (stageNumber) => {
        const { stageStartTime } = get()
        const stage = INITIAL_STAGES.find(s => s.id === stageNumber)
        
        set(state => ({
          programs: state.programs.map(p => 
            p.id === state.currentProgramId
              ? { 
                  ...p, 
                  completedStages: [...new Set([...p.completedStages, stageNumber])],
                  currentStage: Math.min(stageNumber + 1, 7),
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }))
        
        // XP for completing stage
        const xpEarned = 25 + (stageNumber * 10)
        const result = get().addXp(xpEarned)
        
        // Unlock stage achievement
        if (stage?.unlockAchievement) {
          get().unlockAchievement(stage.unlockAchievement)
        }
        
        // Speed runner achievement
        if (stageStartTime && (Date.now() - stageStartTime) < 120000) {
          get().unlockAchievement('speed_runner')
        }
        
        // Update streak
        get().updateStreak()
        
        return { xpEarned, ...result }
      },
      
      deleteProgram: (programId) => {
        set(state => ({
          programs: state.programs.filter(p => p.id !== programId),
          currentProgramId: state.currentProgramId === programId ? null : state.currentProgramId
        }))
      },
      
      // Get all achievement data
      getAllAchievements: () => ACHIEVEMENTS,
      getStages: () => INITIAL_STAGES,
      
      // Export program as JSON
      exportProgram: (programId) => {
        const program = get().programs.find(p => p.id === programId)
        if (!program) return null
        
        return {
          ...program,
          exportedAt: new Date().toISOString(),
          exportedBy: get().user
        }
      },
      
      // Reset (for testing)
      reset: () => set({
        xp: 0,
        level: 1,
        achievements: [],
        programs: [],
        currentProgramId: null,
        streak: { current: 0, longest: 0, lastActiveDate: null },
        hasCompletedOnboarding: false
      })
    }),
    {
      name: 'programforge-storage',
      partialize: (state) => ({
        user: state.user,
        xp: state.xp,
        level: state.level,
        achievements: state.achievements,
        programs: state.programs,
        currentProgramId: state.currentProgramId,
        streak: state.streak,
        settings: state.settings,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      })
    }
  )
)

export default useStore
export { ACHIEVEMENTS, INITIAL_STAGES, LEVEL_TITLES, LEVEL_THRESHOLDS }
