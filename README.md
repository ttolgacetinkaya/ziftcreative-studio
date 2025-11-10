# 🎬 Ziftcreative AI Studio v6.4 (Render + GitHub Ready)

Monorepo: **backend/** (Express API) + **frontend/** (Next.js).  
Render'da iki ayrı Web Service olarak deploy etmen önerilir.

## 1) GitHub'a yükle
```bash
git init
git add .
git commit -m "Initial Ziftcreative upload"
git branch -M main
git remote add origin https://github.com/<username>/ziftcreative-studio.git
git push -u origin main
```

## 2) Render kurulumu (iki servis)
### Backend
- New → Web Service → Select repo
- Root Directory: `backend`
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm run dev`
- Add Environment Variables (Backend):
  ```
  PORT=5000
  OPENAI_API_KEY=
  PEXELS_API_KEY=
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  ELEVENLABS_API_KEY=
  ```

### Frontend
- New → Web Service → Select repo (aynı repo)
- Root Directory: `frontend`
- Environment: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Add Environment Variables (Frontend):
  ```
  NEXT_PUBLIC_API_BASE=https://<backend-service-name>.onrender.com
  ```

## 3) Kullanım
- Frontend URL → `/setup`: anahtarları gir
- `/channels`: kanal yönetimi
- `/studio`: analytics
- `/optimize`: optimize araçları
- `/agency`: SaaS modülü

> Not: Bu paket **hiçbir gizli anahtarı** içermez. Tüm anahtarları sadece Render ortamında girin.

## Geliştirme (lokal)
```bash
# Terminal 1
cd backend && cp .env.example .env && npm install && npm run dev
# Terminal 2
cd frontend && npm install && npm run dev
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000
