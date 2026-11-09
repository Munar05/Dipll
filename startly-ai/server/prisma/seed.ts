// Демо-данные: помечены isDemo=true и не смешиваются с пользовательскими
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const demo = [
  { title: 'EduConnect', category: 'Education', status: 'MVP', description: 'Образовательная платформа, соединяющая студентов с наставниками и учебными проектами.', technologies: ['React', 'Node.js', 'PostgreSQL'], neededRoles: 'UI/UX дизайнер, Backend-разработчик' },
  { title: 'EcoTrack', category: 'Ecology', status: 'Idea', description: 'Экологический мониторинг: датчики и карта качества воздуха и воды в городе.', technologies: ['Python', 'IoT', 'React'], neededRoles: 'Data-аналитик, Embedded-инженер' },
  { title: 'HealthMate', category: 'Health', status: 'Building', description: 'Цифровой помощник для здоровья: напоминания, привычки и анализ самочувствия.', technologies: ['React Native', 'TypeScript', 'AI'], neededRoles: 'Mobile-разработчик, ML-инженер' },
  { title: 'SkillBridge', category: 'Marketplace', status: 'Idea', description: 'Платформа поиска специалистов для стартапов и студенческих команд.', technologies: ['Next.js', 'Prisma', 'Stripe'], neededRoles: 'Product-менеджер, Frontend-разработчик' },
]
async function main() {
  await prisma.project.deleteMany({ where: { isDemo: true } })
  for (const p of demo) await prisma.project.create({ data: { ...p, isDemo: true } })
  console.log('Seeded demo projects:', demo.length)
}
main().finally(() => prisma.$disconnect())
