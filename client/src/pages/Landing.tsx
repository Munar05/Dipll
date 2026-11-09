import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Bot, Users, Rocket } from 'lucide-react'
import { api, Project } from '../api'
import ProjectCard from '../components/ProjectCard'
const feats=[[Bot,'AI Assistant','Analyze ideas, audiences and competitors.'],[Users,'Find your team','Post roles and connect with specialists.'],[Rocket,'Build the MVP','Get a roadmap from idea to launch.']] as const
export default function Landing(){
  const [ps,setPs]=useState<Project[]>([])
  useEffect(()=>{api<Project[]>('/projects').then(d=>setPs(d.slice(0,3))).catch(()=>{})},[])
  return <div className="mx-auto max-w-6xl px-4">
    <section className="py-20 text-center">
      <h1 className="bg-gradient-to-r from-violet-400 to-sky-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">Turn Your Idea Into Reality</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Startly AI helps students and founders validate ideas with AI, find teammates and grow projects.</p>
      <div className="mt-8 flex justify-center gap-3"><Link to="/register" className="btn">Get Started</Link><Link to="/explore" className="btn2">Explore Projects</Link></div>
      <div className="card mx-auto mt-14 max-w-2xl text-left shadow-[0_0_60px_-15px_rgba(124,58,237,.6)]">
        <div className="mb-2 text-xs text-slate-500">AI Assistant preview (static demo)</div>
        <div className="mb-2 ml-auto w-fit rounded-xl bg-violet-600/40 px-3 py-2 text-sm">Analyze my startup idea</div>
        <div className="w-fit rounded-xl bg-white/10 px-3 py-2 text-sm">Sure! Who is your target audience, and what problem do you solve?</div></div>
    </section>
    <section className="grid gap-4 md:grid-cols-3">{feats.map(([I,t,d])=><div key={t} className="card"><I className="mb-3 text-sky-400"/><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-400">{d}</p></div>)}</section>
    <section className="py-16"><h2 className="mb-6 text-2xl font-bold">Popular projects</h2><div className="grid gap-4 md:grid-cols-3">{ps.map(p=><ProjectCard key={p.id} p={p}/>)}</div></section>
  </div>
}
