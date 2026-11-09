export type Project={id:string;title:string;description:string;category:string;status:string;technologies:string[];lookingFor:string[];isDemo:boolean}
export type Msg={id?:string;role:string;content:string}
export const token=()=>localStorage.getItem('token')
export async function api<T>(path:string,opts:{method?:string;body?:unknown}={}):Promise<T>{
  const r=await fetch('/api'+path,{method:opts.method||'GET',headers:{'Content-Type':'application/json',...(token()?{Authorization:'Bearer '+token()}:{})},body:opts.body?JSON.stringify(opts.body):undefined})
  const j=await r.json().catch(()=>({}))
  if(!r.ok) throw new Error(j.error||'Request failed')
  return j as T
}
