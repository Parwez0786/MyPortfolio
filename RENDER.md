# Deploy to Render

You need **2 services**: API (Node) + Frontend (Static).

## 1. Push code to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

Do **not** commit `server/.env` or `server/uploads/`.

## 2. Deploy the API (Web Service)

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. **New +** → **Web Service** → connect your repo
3. Settings:
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:

| Key | Value |
|-----|--------|
| `MONGODB_URI` | your Atlas connection string |
| `MONGODB_DB` | `portfolio` |
| `CLOUDINARY_CLOUD_NAME` | from Cloudinary |
| `CLOUDINARY_API_KEY` | from Cloudinary |
| `CLOUDINARY_API_SECRET` | from Cloudinary |
| `ADMIN_PASSWORD` | your admin password |
| `JWT_SECRET` | long random string |
| `CLIENT_URL` | your frontend URL (set after step 3), e.g. `https://portfolio-web.onrender.com` |
| `NODE_ENV` | `production` |

5. Deploy → copy the API URL, e.g. `https://portfolio-api.onrender.com`

## 3. Deploy the Frontend (Static Site)

1. **New +** → **Static Site** → same repo
2. Settings:
   - **Root Directory:** leave empty (repo root)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
3. Environment variable (**Build**):

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | `https://portfolio-api.onrender.com` (no trailing slash) |

4. After deploy, add a **Rewrite** rule (SPA):
   - Source: `/*`
   - Destination: `/index.html`

## 4. Final wiring

1. Set API `CLIENT_URL` to your static site URL and redeploy API if needed.
2. Open site → `/admin` → login → re-upload **resume** once (Render disk is ephemeral; Cloudinary + DB keep images/metadata).
3. Confirm projects load from MongoDB `portfolio`.

## Free-tier notes

- Free web services **sleep** after idle; first request can be slow.
- `server/uploads` is wiped on redeploy — resume still works via Cloudinary/DB after re-upload.
- Atlas Network Access must allow Render (`0.0.0.0/0` is fine for free tier).

## Optional: Blueprint

This repo includes [`render.yaml`](render.yaml). In Render: **New +** → **Blueprint** → select the repo, then fill the `sync: false` env vars when prompted.
