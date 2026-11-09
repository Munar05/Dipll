// DEMO DATA ONLY: every row has isDemo=true, so it is separable from real user data.
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()
const demo = [
 {title:'EduConnect',category:'Education',status:'MVP',description:'Platform connecting students with mentors and peer study groups.',technologies:['React','Node.js'],lookingFor:['UI/UX Designer','Backend Developer']},
 {title:'EcoTrack',category:'Ecology',status:'Idea',description:'Environmental monitoring dashboard built on open sensor data.',technologies:['Python','PostgreSQL'],lookingFor:['Data Analyst','IoT Engineer']},
 {title:'HealthMate',category:'Health',status:'Prototype',description:'Digital assistant for habits, reminders and wellbeing tracking.',technologies:['React Native','AI'],lookingFor:['Mobile Developer','Marketer']},
 {title:'SkillBridge',category:'HR',status:'Growth',description:'Marketplace for finding specialists for short-term startup tasks.',technologies:['TypeScript','Prisma'],lookingFor:['Full-Stack Developer','Product Manager']},
]
async function main(){ await db.project.deleteMany({where:{isDemo:true}}); await db.project.createMany({data:demo.map(d=>({...d,isDemo:true}))}); console.log('Demo projects seeded') }
main().finally(()=>db.$disconnect())
