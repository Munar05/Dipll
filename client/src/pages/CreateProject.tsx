import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
export default function CreateProject(){
  const nav=useNavigate(); const [f,setF]=useState({title:'',description:'',category:'Education',skills:'',teamNeeds:''}); const [err,setErr]=useState('')
  const set=(k:string)=>(e:React.ChangeEvent<any>)=>setF({...f,[k]:e.target.value})
  const list=(s:string)=>s.split(',').map(x=>x.trim()).filter(Boolean)
  async function submit(e:FormEvent){e.preventDefault()
    try{await api('/projects',{method:'POST',body:{title:f.title,description:f.description,category:f.category,technologies:list(f.skills),lookingFor:list(f.skills),teamNeeds:f.teamNeeds}});nav('/explore')}catch(x){setErr((x as Error).message)}}
  return <form onSubmit={submit} className="card mx-auto my-10 max-w-xl space-y-3">
    <h1 className="text-2xl font-bold">Create Project</h1>
    <input className="input" placeholder="Title" value={f.title} onChange={set('title')} required/>
    <textarea className="input" rows={4} placeholder="Describe your idea (min 10 chars)" value={f.description} onChange={set('description')} required/>
    <select className="input" value={f.category} onChange={set('category')}>{['Education','Ecology','Health','HR','Other'].map(c=><option key={c} className="bg-slate-900">{c}</option>)}</select>
    <input className="input" placeholder="Required skills, comma separated" value={f.skills} onChange={set('skills')}/>
    <textarea className="input" rows={2} placeholder="Who do you need on the team?" value={f.teamNeeds} onChange={set('teamNeeds')}/>
    {err&&<p className="text-sm text-red-400">{err}</p>}<button className="btn">Save project</button>
  </form>
}
