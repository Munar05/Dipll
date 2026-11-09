import type { Project } from '../api'
export default function ProjectCard({p}:{p:Project}){
  return <div className="card flex flex-col gap-3">
    <div className="flex items-start justify-between"><h3 className="text-lg font-semibold">{p.title}</h3>
      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">{p.status}</span></div>
    <p className="text-sm text-slate-400">{p.description}</p>
    <div className="flex flex-wrap gap-1.5">{p.technologies.map(t=><span key={t} className="rounded-md bg-sky-500/15 px-2 py-0.5 text-xs text-sky-300">{t}</span>)}</div>
    <div className="mt-auto text-xs text-slate-500">{p.category} · Looking for: {p.lookingFor.join(', ')||'—'}{p.isDemo&&' · demo'}</div>
  </div>
}
