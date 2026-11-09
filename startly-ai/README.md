# Startly AI — MVP

React + TypeScript + Vite + Tailwind (client) · Node + Express + TypeScript + Prisma + PostgreSQL (server).

## Запуск
Нужны Node.js 18+ и PostgreSQL.

```bash
# 1. База данных
createdb startly            # или создайте БД любым способом

# 2. Backend
cd server
cp .env.example .env        # впишите DATABASE_URL и длинный случайный JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run seed                # демо-проекты (isDemo = true)
npm run dev                 # http://localhost:4000

# 3. Frontend (в другом терминале)
cd client
npm install
npm run dev                 # http://localhost:5173
```
Проверка сборки: `npm run build` в `server/` и `client/`.

## Что работает
Регистрация/вход (bcrypt + JWT), защищённые маршруты, дашборд, создание и поиск проектов, профиль, диалоги и история AI-чата, валидация (zod), обработка ошибок.

## Что демонстрационное
- **AI-ассистент**: языковая модель не подключена. Без `AI_API_KEY` `server/src/services/ai.service.ts` возвращает шаблонные ответы с пометкой «демо-режим». Для подключения реализуйте вызов провайдера в этом файле.
- **Демо-проекты** (EduConnect, EcoTrack, HealthMate, SkillBridge) помечены `isDemo = true`; `npm run seed` пересоздаёт только их.
- Аватар — буква имени (загрузка фото не реализована); кнопки вступления в проект пока нет.

## Следующие шаги
Страница проекта и заявки в команду, загрузка аватара, подключение реальной LLM со стримингом, тесты, деплой.
