not-pi-visioion-3.1

Run locally

- Copy `.env.example` to `.env` and set `GEMINI_API_KEY`
- Install deps: `npm install`
- Start server: `npm run dev`
- Open `http://localhost:3000`

Deploy to Vercel

- Login: `vercel login`
- Deploy: `vercel --prod`
- In Vercel Project → Settings → Environment Variables, add `GEMINI_API_KEY`
- Vercel routes serve `/public/index.html` and `/api/server.js`