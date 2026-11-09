import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import auth from './routes/auth.routes'
import projects from './routes/projects.routes'
import api from './routes/ai.routes'
const app = express()
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}))
app.use(express.json())
app.use('/api/auth', auth)
app.use('/api/projects', projects)
app.use('/api', api)
app.use((err:any,_q:Request,res:Response,_n:NextFunction)=>{
  if (err?.name==='ZodError') return res.status(400).json({error:err.issues[0].message})
  console.error(err); res.status(500).json({error:'Server error'})
})
app.listen(Number(process.env.PORT)||4000, ()=>console.log('API on :'+(process.env.PORT||4000)))
