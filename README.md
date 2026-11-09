# Startly AI (MVP core)
Requirements: Node 18+, PostgreSQL.
## Run
```
cd server && cp .env.example .env   # set DATABASE_URL and JWT_SECRET
npm i && npx prisma db push && npm run seed && npm run dev
cd ../client && npm i && npm run dev   # http://localhost:5173
```
## Status
- Working: register/login (bcrypt+JWT), projects list/search/filter/create, AI chat with saved history, profile API.
- DEMO: AI replies are a labelled stub (no model connected; see server/src/services/ai.service.ts). Seed projects have isDemo=true.
- Not built yet: Dashboard, Profile page (API exists), project detail page, project members UI, real LLM.
