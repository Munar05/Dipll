import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export const ah = (fn:(req:any,res:Response)=>Promise<any>) => (req:Request,res:Response,next:NextFunction) => fn(req,res).catch(next)
export const requireAuth = (req:any,res:Response,next:NextFunction) => {
  const t = req.headers.authorization?.replace('Bearer ','') || ''
  try { req.userId = (jwt.verify(t, process.env.JWT_SECRET!) as any).id; next() }
  catch { res.status(401).json({error:'Unauthorized'}) }
}
