import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import { errorHandler } from './middleware/error'
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET не задан в .env')
const app = express()
app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)
app.listen(Number(process.env.PORT ?? 4000), () => console.log(`API: http://localhost:${process.env.PORT ?? 4000}`))
