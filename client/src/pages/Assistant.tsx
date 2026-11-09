import { useEffect, useRef, useState } from 'react'
import { Plus, Send } from 'lucide-react'
import { api, Msg } from '../api'
type Conv={id:string;title:string}
const starters=['Analyze my startup idea','Create an MVP roadmap','Find the target audience','Identify required team members','Analyze competitors']
export default function Assistant(){
  const [convs,setConvs]=useState<Conv[]>([]); const [cid,setCid]=useState<string>(); const [msgs,setMsgs]=useState<Msg[]>([])
  const [text,setText]=useState(''); const [busy,setBusy]=useState(false); const end=useRef<HTMLDivElement>(null)
  const load=()=>api<Conv[]>('/conversations').then(setConvs).catch(()=>{})
  useEffect(()=>{load()},[]); useEffect(()=>{end.current?.scrollIntoView({behavior:'smooth'})},[msgs,busy])
  async function open(id:string){setCid(id);setMsgs((await api<{messages:Msg[]}>('/conversations/'+id)).messages)}
  async function send(m:string){ if(!m.trim()||busy) return
    setMsgs(x=>[...x,{role:'user',content:m}]);setText('');setBusy(true)
    try{const r=await api<{conversationId:string;reply:Msg}>('/ai/chat',{method:'POST',body:{message:m,conversationId:cid}})
      setCid(r.conversationId);setMsgs(x=>[...x,r.reply]);load()}
    catch(e){setMsgs(x=>[...x,{role:'assistant',content:'Error: '+(e as Error).message}])}
    setBusy(false)}
  return <div className="mx-auto flex h-[calc(100vh-130px)] max-w-6xl gap-4 px-4 py-4">
    <aside className="card hidden w-64 flex-col gap-2 overflow-y-auto md:flex">
      <button className="btn justify-center" onClick={()=>{setCid(undefined);setMsgs([])}}><Plus size={16}/>New chat</button>
      {convs.map(c=><button key={c.id} onClick={()=>open(c.id)} className={`truncate rounded-lg px-3 py-2 text-left text-sm ${c.id===cid?'bg-violet-600/30':'hover:bg-white/10'}`}>{c.title}</button>)}
    </aside>
    <section className="card flex flex-1 flex-col !p-4">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {!msgs.length&&<div className="grid gap-2 pt-8 sm:grid-cols-2">{starters.map(s=><button key={s} onClick={()=>send(s)} className="btn2 justify-start text-left">{s}</button>)}</div>}
        {msgs.map((m,i)=><div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${m.role==='user'?'ml-auto bg-violet-600/50':'bg-white/10'}`}>{m.content}</div>)}
        {busy&&<div className="w-fit animate-pulse rounded-2xl bg-white/10 px-4 py-2 text-sm">AI is thinking…</div>}<div ref={end}/>
      </div>
      <form onSubmit={e=>{e.preventDefault();send(text)}} className="mt-3 flex gap-2">
        <input className="input" placeholder="Describe your idea…" value={text} onChange={e=>setText(e.target.value)}/>
        <button className="btn" disabled={busy}><Send size={16}/></button></form>
    </section></div>
}
