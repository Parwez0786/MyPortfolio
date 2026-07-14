<h2 align="center">
  Portfolio Website - v2.0<br/>
  <a href="https://portfolio-client-w93a.onrender.com/" target="_blank">ParwezPortfolio</a>
</h2>


<br/>

<center>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) &nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/soumyajit4419/Portfolio?color=red&logo=github&style=for-the-badge) &nbsp;
![GitHub forks](https://img.shields.io/github/forks/soumyajit4419/Portfolio?color=red&logo=github&style=for-the-badge)

</center>



## TL;DR

You can fork this repo to modify and make changes of your own. Please give me proper credit by linking back to [Parwez Ansari](https://github.com/Parwez0786/MyPortfolio). Thanks!

## Built With

My personal portfolio <a href="https://portfolio-client-w93a.onrender.com/" target="_blank">ParwezPortfolio</a> which features some of my github projects as well as my resume and technical skills.<br/>

This project was built using these technologies.

- React.js
- Node.js
- Express.js
- CSS3
- VsCode
- Vercel

## Features

**📖 Multi-Page Layout**

**🎨 Styled with React-Bootstrap and Css with easy to customize colors**

**📱 Fully Responsive**

**🗄️ Dynamic projects** — stored in MongoDB Atlas, images on Cloudinary, managed via `/admin`

**🚀 Deploy** — see [RENDER.md](RENDER.md) for Render (API + static frontend)

## Getting Started

Clone down this repository. You will need `node.js` and `git` installed globally on your machine.

## 🛠 Installation and Setup Instructions

### Frontend

1. Copy env: `cp .env.example .env`
2. Set `REACT_APP_API_URL=http://localhost:5000` (or your deployed API URL)
3. Installation: `npm install`
4. Run: `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Backend (required for projects + admin)

See [server/README.md](server/README.md) for MongoDB Atlas, Cloudinary, and API setup.

```bash
cd server
cp .env.example .env   # fill in credentials
npm install
npm run dev
```

### Admin

1. Start the API and frontend
2. Open [http://localhost:3000/admin](http://localhost:3000/admin)
3. Log in with the password from `server/.env` (`ADMIN_PASSWORD`)
4. Create, edit, or delete projects (image upload goes to Cloudinary)

Public `/project` page loads projects from the API with no layout changes.

## Usage Instructions

Open the project folder and Navigate to `/src/components/`. <br/>
You will find all the components used and you can edit your information accordingly.

### Show your support


