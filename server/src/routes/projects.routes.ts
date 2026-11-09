import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ah, requireAuth } from '../middleware/auth'
const r = Router()
r.get('/', ah(async (req,res)=>{
  const q = String(req.query.q||''), category = String(req.query.category||'')
  res.json(await prisma.project.findMany({
    where:{...(category&&{category}),...(q&&{OR:[{title:{contains:q,mode:'insensitive'}},{description:{contains:q,mode:'insensitive'}}]})},
    orderBy:{createdAt:'desc'}}))
}))
r.post('/', requireAuth, ah(async (req,res)=>{
  const d = z.object({title:z.string().min(2),description:z.string().min(10),category:z.string().min(1),
    technologies:z.array(z.string()).default([]),lookingFor:z.array(z.string()).default([]),teamNeeds:z.string().default('')}).parse(req.body)
  res.status(201).json(await prisma.project.create({data:{...d,ownerId:req.userId}}))
}))
r.get('/:id', ah(async (req,res)=>{
  const p = await prisma.project.findUnique({where:{id:req.params.id},include:{members:true}})
  p ? res.json(p) : res.status(404).json({error:'Project not found'})
}))
export default r
