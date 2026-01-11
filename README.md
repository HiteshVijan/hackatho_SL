# ⚒️ ProgramForge

> A Gamified Program Design Framework for NGOs | ShikshaLokam Innovation for Education Equity Hackathon 2026

![Theme 3](https://img.shields.io/badge/Theme-Gamified%20Program%20Design-gold)
![Status](https://img.shields.io/badge/Status-In%20Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Overview

**ProgramForge** transforms the complex, expert-dependent process of education program design into an engaging, gamified journey. Built for Shikshagraha's network of education-focused NGOs, it guides organizations step-by-step through program design using an intuitive quest-based interface.

### The Problem We're Solving

Many education-focused organizations struggle with:
- Starting program design from a blank page
- Complex, expert-dependent design processes
- Slow, expensive program development cycles
- Difficulty translating ideas into coherent, review-ready designs

### Our Solution

A **gamified platform** that:
- ✅ Guides users through 7 CLF-aligned design stages
- ✅ Rewards progress with XP, levels, and achievements
- ✅ Makes program design engaging and accessible
- ✅ Exports review-ready program documents
- ✅ Builds internal capability within organizations

## 🚀 Features

### 🎮 Gamification System
- **8 Mastery Levels**: From "Novice Planner" to "Legendary Changemaker"
- **11 Achievements**: Unlock badges as you complete milestones
- **XP & Progress Tracking**: Visual feedback on your design journey
- **Celebration Moments**: Confetti and animations for accomplishments

### 📜 7-Stage Program Design Quest
Aligned with Shikshagraha's Common Logical Framework (CLF):

1. **🔍 The Problem Quest** - Define your education challenge
2. **🎯 Outcome Vision** - Set student-level outcomes
3. **🕸️ Stakeholder Map** - Identify ecosystem actors
4. **⚡ Practice Changes** - Define behavior changes needed
5. **📊 Success Metrics** - Set measurable indicators
6. **💡 Theory of Change** - Connect your logic model
7. **📜 Program Blueprint** - Finalize your design

### 💾 Data Management
- Auto-save to local storage
- Export programs as JSON
- Multiple program support
- Progress persistence across sessions

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **TailwindCSS v4** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - API framework
- **MongoDB** - Database (optional)
- **Mongoose** - ODM

## 📦 Getting Started

### Prerequisites

- Node.js v18+ 
- npm v9+
- MongoDB (optional - app works without it)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hackatho_SL.git
cd hackatho_SL

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

#### Frontend (Development)
```bash
cd frontend
npm run dev
```
Frontend will be available at `http://localhost:5173`

#### Backend (Development)
```bash
cd backend
npm run dev
```
API will be available at `http://localhost:5000`

### Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Connection (optional)
MONGODB_URI=mongodb://localhost:27017/programforge

# Server Port
PORT=5000
```

## 📁 Project Structure

```
hackatho_SL/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Layout.jsx
│   │   │   ├── XPBar.jsx
│   │   │   └── AchievementModal.jsx
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Quest.jsx
│   │   │   ├── Programs.jsx
│   │   │   └── Achievements.jsx
│   │   ├── store/           # State management
│   │   │   └── useStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── Program.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── programs.js
│   │   └── users.js
│   ├── server.js
│   └── package.json
├── docs/
└── README.md
```

## 🎨 Design Philosophy

### Visual Theme
- **Quest/RPG aesthetic** with gold accents and dark backgrounds
- **Cinzel font** for headings (medieval/fantasy feel)
- **Smooth animations** for delightful micro-interactions
- **Consistent gamification language** throughout

### UX Principles
- Clear progress indicators at every step
- Contextual hints for guidance
- Celebration of achievements
- Non-blocking, encouraging feedback

## 🔌 API Endpoints

### Programs
- `GET /api/programs` - List all programs
- `POST /api/programs` - Create new program
- `GET /api/programs/:id` - Get program by ID
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program
- `POST /api/programs/:id/complete-stage/:stageNumber` - Complete a stage
- `GET /api/programs/:id/export` - Export formatted program

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id/add-xp` - Add XP to user
- `POST /api/users/:id/unlock-achievement` - Unlock achievement
- `GET /api/users/leaderboard/top` - Get leaderboard

## 🏆 Hackathon Alignment

This project addresses **Theme 3: Gamified Program Design Framework for NGOs**

### Key Requirements Met
- ✅ Step-by-step program design guidance
- ✅ Gamification elements (XP, achievements, levels)
- ✅ Aligned with Shikshagraha's CLF
- ✅ Reduces human effort in program design
- ✅ Builds internal capability
- ✅ Scalable platform approach

## 👥 Team

- [Add team member names]

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- **ShikshaLokam** - For the hackathon opportunity
- **Shikshagraha** - For the Common Logical Framework
- **InvokED** - For championing education leadership

---

<p align="center">
  Built with 💛 for <b>Innovation for Education Equity Hackathon 2026</b>
  <br>
  Empowering NGOs to design impactful education programs
</p>