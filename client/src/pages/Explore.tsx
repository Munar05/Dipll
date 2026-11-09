import { useEffect, useState } from 'react'
import { api, Project } from '../api'
import ProjectCard from '../components/ProjectCard'
const cats=['All','Education','Ecology','Health','HR','Other']
export default function Explore(){
  const [ps,setPs]=useState<Project[]>([]); const [q,setQ]=useState(''); const [c,setC]=useState('All'); const [err,setErr]=useState('')
  useEffect(()=>{const t=setTimeout(()=>{api<Project[]>(`/projects?q=${encodeURIComponent(q)}&category=${c==='All'?'':c}`).then(setPs).catch(e=>setErr(e.message))},250);return()=>clearTimeout(t)},[q,c])
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <h1 className="mb-6 text-3xl font-bold">Explore Projects</h1>
    <input className="input mb-4" placeholder="Search projects..." value={q} onChange={e=>setQ(e.target.value)}/>
    <div className="mb-6 flex flex-wrap gap-2">{cats.map(x=><button key={x} onClick={()=>setC(x)} className={`rounded-full px-4 py-1 text-sm ${c===x?'bg-violet-600':'bg-white/10 hover:bg-white/20'}`}>{x}</button>)}</div>
    {err&&<p className="text-red-400">{err}</p>}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{ps.map(p=><ProjectCard key={p.id} p={p}/>)}</div>
  </div>
}
