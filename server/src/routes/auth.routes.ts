import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ah, requireAuth } from '../middleware/auth'
const r = Router()
const sign = (id:string) => jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn:'7d'})
const pub = (u:any) => ({id:u.id,name:u.name,email:u.email})
r.post('/register', ah(async (req,res)=>{
  const d = z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8)}).parse(req.body)
  if (await prisma.user.findUnique({where:{email:d.email}})) return res.status(409).json({error:'Email already registered'})
  const u = await prisma.user.create({data:{name:d.name,email:d.email,password:await bcrypt.hash(d.password,10),profile:{create:{}}}})
  res.status(201).json({token:sign(u.id),user:pub(u)})
}))
r.post('/login', ah(async (req,res)=>{
  const d = z.object({email:z.string().email(),password:z.string()}).parse(req.body)
  const u = await prisma.user.findUnique({where:{email:d.email}})
  if (!u || !(await bcrypt.compare(d.password,u.password))) return res.status(401).json({error:'Invalid email or password'})
  res.json({token:sign(u.id),user:pub(u)})
}))
r.get('/me', requireAuth, ah(async (req,res)=>{
  const u = await prisma.user.findUnique({where:{id:req.userId}})
  u ? res.json(pub(u)) : res.status(404).json({error:'Not found'})
}))
export default r
