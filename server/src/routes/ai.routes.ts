import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ah, requireAuth } from '../middleware/auth'
import { generateReply } from '../services/ai.service'
const r = Router()
r.use(requireAuth)
r.get('/conversations', ah(async (req,res)=> res.json(await prisma.conversation.findMany({where:{userId:req.userId},orderBy:{createdAt:'desc'}}))))
r.post('/conversations', ah(async (req,res)=> res.status(201).json(await prisma.conversation.create({data:{title:'New chat',userId:req.userId}}))))
r.get('/conversations/:id', ah(async (req,res)=>{
  const c = await prisma.conversation.findFirst({where:{id:req.params.id,userId:req.userId},include:{messages:{orderBy:{createdAt:'asc'}}}})
  c ? res.json(c) : res.status(404).json({error:'Not found'})
}))
r.post('/ai/chat', ah(async (req,res)=>{
  const d = z.object({message:z.string().min(1).max(4000),conversationId:z.string().optional()}).parse(req.body)
  let conv = d.conversationId ? await prisma.conversation.findFirst({where:{id:d.conversationId,userId:req.userId}}) : null
  if (!conv) conv = await prisma.conversation.create({data:{title:d.message.slice(0,40),userId:req.userId}})
  await prisma.message.create({data:{role:'user',content:d.message,conversationId:conv.id}})
  const history = await prisma.message.findMany({where:{conversationId:conv.id},orderBy:{createdAt:'asc'}})
  const out = await generateReply(history)
  const reply = await prisma.message.create({data:{role:'assistant',content:out.text,conversationId:conv.id}})
  res.json({conversationId:conv.id,reply,demo:out.demo})
}))
r.get('/profile', ah(async (req,res)=> res.json(await prisma.profile.findUnique({where:{userId:req.userId},include:{skills:true}}))))
r.put('/profile', ah(async (req,res)=>{
  const d = z.object({bio:z.string().max(500).optional(),avatar:z.string().optional(),interests:z.array(z.string()).optional()}).parse(req.body)
  res.json(await prisma.profile.update({where:{userId:req.userId},data:d}))
}))
export default r
