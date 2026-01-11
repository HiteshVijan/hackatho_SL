import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quest from './pages/Quest'
import Programs from './pages/Programs'
import Achievements from './pages/Achievements'
import Templates from './pages/Templates'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page without layout */}
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Main app with layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quest" element={<Quest />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
