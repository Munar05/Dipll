import { Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Assistant from './pages/Assistant'
import AuthPage from './pages/AuthPage'
import CreateProject from './pages/CreateProject'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
export default function App() {
  return <Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} />
    <Route path="/app" element={<AppLayout />}><Route index element={<Dashboard />} /><Route path="assistant" element={<Assistant />} /><Route path="explore" element={<Explore />} /><Route path="create" element={<CreateProject />} /><Route path="profile" element={<Profile />} /></Route></Routes>
}
