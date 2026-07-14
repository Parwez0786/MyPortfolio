<h2 align="center">
  Portfolio Website - v2.0<br/>
  <a href="https://portfolio-client-w93a.onrender.com/" target="_blank">ParwezPortfolio</a>
</h2>

<br/>

## TL;DR

Fork this repo and customize it. Please give credit by linking back to [Parwez Ansari](https://github.com/Parwez0786/MyPortfolio).

**Live site:** [https://portfolio-client-w93a.onrender.com](https://portfolio-client-w93a.onrender.com)  
**Live API:** [https://portfolio-api-oh9x.onrender.com](https://portfolio-api-oh9x.onrender.com)

## Built With

My personal portfolio <a href="https://portfolio-client-w93a.onrender.com/" target="_blank">ParwezPortfolio</a> which features some of my github projects as well as my resume and technical skills.<br/>

This project was built using these technologies.

- React.js + React Bootstrap
- Node.js + Express.js
- MongoDB Atlas
- Cloudinary
- Render (API Web Service + Static Site)

## Features

- Multi-page layout (Home, About, Experience, Projects, Resume, Admin)
- Fully responsive UI
- Dynamic projects (MongoDB + Cloudinary) managed at `/admin`
- Resume upload from admin and preview on `/resume`
- Deploy guide for Render below

## Getting Started (Local)

You need Node.js and git installed.

### Frontend

```bash
cp .env.example .env
# set REACT_APP_API_URL=http://localhost:5000
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd server
cp .env.example .env   # fill MongoDB, Cloudinary, ADMIN_PASSWORD, JWT_SECRET
npm install
npm run dev
```

Or run both together from repo root:

```bash
npm run dev
```

### Admin

1. Start API + frontend
2. Open [http://localhost:3000/admin](http://localhost:3000/admin)
3. Login with `ADMIN_PASSWORD` from `server/.env`
4. Manage projects and upload resume PDF

---

## Deploy on Render (Frontend + Backend)

Deploy **two services** from the same GitHub repo.

### 1) API — Web Service

1. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect `Parwez0786/MyPortfolio`
3. Configure:

| Setting | Value |
|--------|--------|
| Root Directory | `server` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

4. Environment variables:

| Key | Value |
|-----|--------|
| `MONGODB_URI` | Atlas connection string |
| `MONGODB_DB` | `portfolio` |
| `CLOUDINARY_CLOUD_NAME` | from Cloudinary |
| `CLOUDINARY_API_KEY` | from Cloudinary |
| `CLOUDINARY_API_SECRET` | from Cloudinary |
| `ADMIN_PASSWORD` | your admin password |
| `JWT_SECRET` | long random string |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | set after frontend is live |

5. Deploy and copy API URL (example: `https://portfolio-api-oh9x.onrender.com`)

### 2) Frontend — Static Site

1. **New +** → **Static Site** → same repo
2. Configure:

| Setting | Value |
|--------|--------|
| Root Directory | *(leave empty)* |
| Build Command | `npm install && npm run build` |
| Publish Directory | `build` |

3. Build-time env var:

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | your API URL, e.g. `https://portfolio-api-oh9x.onrender.com` (no trailing slash) |

### 3) Add SPA Rewrite (important)

Without this, routes like `/about` or `/admin` may 404 on refresh.

1. Open the **Static Site** (frontend) on Render
2. Go to **Redirects/Rewrites**
3. **Add Rule**:

| Field | Value |
|--------|--------|
| Source | `/*` |
| Destination | `/index.html` |
| Action | **Rewrite** (not Redirect) |

4. Save

### 4) Final wiring

1. On API service, set `CLIENT_URL` to your Static Site URL
2. Manual redeploy API once
3. Open site → `/admin` → re-upload resume once (Render disk is temporary)

### Free tier notes

- API may sleep when idle; first request can be slow
- MongoDB Atlas Network Access: allow `0.0.0.0/0`
- Do not commit `server/.env` or `server/uploads/`

More detail: [RENDER.md](RENDER.md) · Blueprint: [render.yaml](render.yaml)

## Project structure

```text
/
  src/                 # React frontend
  server/              # Express API
  RENDER.md            # Deploy notes
  render.yaml          # Optional Render Blueprint
```

## Usage

Edit content under `src/components/` (Home, About, Experience, etc.).  
Projects/resume content is managed from `/admin` after backend is running.

### Show your support
