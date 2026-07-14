# Portfolio API Server

Express backend for dynamic portfolio projects (MongoDB Atlas + Cloudinary).

## Setup

### 1. MongoDB Atlas (free)

1. Create an account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Database Access → create a user with password
4. Network Access → allow your IP (or `0.0.0.0/0` for free hosting)
5. Connect → Drivers → copy the connection string

### 2. Cloudinary (free)

1. Sign up at [https://cloudinary.com](https://cloudinary.com)
2. From the dashboard, copy **Cloud name**, **API Key**, and **API Secret**

### 3. Environment

```bash
cp .env.example .env
```

Edit `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://USER:PASS@CLUSTER.mongodb.net/portfolio?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=long_random_secret
```

### 4. Run

```bash
cd server
npm install
npm run dev
```

API runs at `http://localhost:5000`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Body: `{ "password": "..." }` → `{ token }` |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Bearer JWT | Create (multipart: title, description, ghLink, demoLink, isBlog, image) |
| PUT | `/api/projects/:id` | Bearer JWT | Update (optional new image) |
| DELETE | `/api/projects/:id` | Bearer JWT | Delete |
