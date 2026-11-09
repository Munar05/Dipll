import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { token } from '../api'
export default function Layout(){
  const nav=useNavigate()
  const out=()=>{localStorage.removeItem('token');nav('/')}
  return <div className="min-h-screen flex flex-col">
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0e1a]/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold"><Sparkles className="text-violet-400"/>Startly AI</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/explore" className="hover:text-white">Explore</Link>
          {token()?<><Link to="/assistant" className="hover:text-white">AI Assistant</Link><Link to="/create" className="hover:text-white">Create</Link><button onClick={out} className="btn2 !py-1.5">Logout</button></>
          :<><Link to="/login" className="hover:text-white">Login</Link><Link to="/register" className="btn !py-1.5">Sign up</Link></>}
        </div>
      </nav></header>
    <main className="flex-1"><Outlet/></main>
    <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">© Startly AI: diploma project MVP</footer>
  </div>
}
