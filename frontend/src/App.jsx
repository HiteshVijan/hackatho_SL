import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quest from './pages/Quest'
import Programs from './pages/Programs'
import Achievements from './pages/Achievements'
import Templates from './pages/Templates'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import LeaderboardPage from './pages/LeaderboardPage'
import useStore from './store/useStore'

function AppRoutes() {
  const { hasCompletedOnboarding } = useStore()

  return (
    <Routes>
      {/* Welcome page without layout - shown first time */}
      <Route 
        path="/welcome" 
        element={
          hasCompletedOnboarding ? <Navigate to="/" replace /> : <Welcome />
        } 
      />
      
      {/* Redirect to welcome if not onboarded */}
      <Route
        path="/"
        element={
          !hasCompletedOnboarding ? <Navigate to="/welcome" replace /> : (
            <Layout>
              <Home />
            </Layout>
          )
        }
      />
      
      {/* Main app with layout */}
      <Route path="/*" element={
        !hasCompletedOnboarding ? <Navigate to="/welcome" replace /> : (
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quest" element={<Quest />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </Layout>
        )
      } />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
