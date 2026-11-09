import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
export default function Auth({mode}:{mode:'login'|'register'}){
  const nav=useNavigate(); const reg=mode==='register'
  const [f,setF]=useState({name:'',email:'',password:'',confirm:''}); const [err,setErr]=useState('')
  const set=(k:string)=>(e:React.ChangeEvent<HTMLInputElement>)=>setF({...f,[k]:e.target.value})
  async function submit(e:FormEvent){e.preventDefault();setErr('')
    if(reg&&f.password!==f.confirm) return setErr('Passwords do not match')
    try{const r=await api<{token:string}>('/auth/'+mode,{method:'POST',body:reg?{name:f.name,email:f.email,password:f.password}:{email:f.email,password:f.password}})
      localStorage.setItem('token',r.token);nav('/assistant')}catch(x){setErr((x as Error).message)}}
  return <form onSubmit={submit} className="card mx-auto mt-16 max-w-md space-y-3">
    <h1 className="text-2xl font-bold">{reg?'Create account':'Welcome back'}</h1>
    {reg&&<input className="input" placeholder="Name" value={f.name} onChange={set('name')} required/>}
    <input className="input" type="email" placeholder="Email" value={f.email} onChange={set('email')} required/>
    <input className="input" type="password" placeholder="Password (min 8)" value={f.password} onChange={set('password')} required/>
    {reg&&<input className="input" type="password" placeholder="Confirm password" value={f.confirm} onChange={set('confirm')} required/>}
    {err&&<p className="text-sm text-red-400">{err}</p>}
    <button className="btn w-full justify-center">{reg?'Sign up':'Log in'}</button>
    <p className="text-center text-sm text-slate-400">{reg?<Link to="/login">Already have an account?</Link>:<Link to="/register">Create an account</Link>}</p>
  </form>
}
