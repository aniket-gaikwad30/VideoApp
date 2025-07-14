# 🎬 VideoApp

**VideoApp** is a full-stack web application built with Next.js, designed for creating and exploring AI-generated video prompts. It includes authentication, responsive design, and smooth user experience from login to idea generation.

---

## ✨ Features

- 🔐 Google-based authentication using NextAuth.js
- 🧠 AI prompt-based video generation
- 🌐 Fully responsive UI built with Tailwind CSS
- ⚙️ Integrated backend with MongoDB & Prisma ORM
- 🚀 Deployed using Vercel with production and development-ready configurations

---

## 📁 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB Atlas via Prisma ORM
- **Authentication**: Google OAuth 2.0 with NextAuth
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

---

## 🧩 Project Structure


```plaintext
VideoApp/
├── components/             # Reusable UI components
├── lib/                    # Utility functions and database setup
│   └── mongodb.js          # MongoDB connection helper
├── pages/                  # Next.js pages and API routes
│   ├── api/
│   │   └── auth/           # NextAuth.js routes (login, callback, etc.)
│   └── index.js            # Home page
├── prisma/                 # Prisma ORM schema and DB client
│   └── schema.prisma       # Database model definitions
├── public/                 # Static assets (images, icons, etc.)
├── styles/                 # Tailwind/global CSS
├── .env.local              # Local environment variables (not committed)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation


---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aniket-gaikwad30/VideoApp.git
cd VideoApp

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aniket-gaikwad30/VideoApp.git
cd VideoApp
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment variables
Create a .env.local file and add the following:

env
Copy
Edit
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-next-auth-secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
Use openssl rand -base64 32 to generate a secure NEXTAUTH_SECRET.

4. Run locally
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to see the app running.

🌍 Environment Variables Explained
Variable Name	Description
GOOGLE_CLIENT_ID	OAuth client ID from Google Cloud Console
GOOGLE_CLIENT_SECRET	OAuth client secret
NEXTAUTH_SECRET	Secret key used by NextAuth.js
NEXTAUTH_URL	URL of your running app (local or prod)
DATABASE_URL	MongoDB connection string

🚀 Deployment
This project is designed to work seamlessly on [Vercel].

Steps:
Push your code to a GitHub repository

Import the repo into Vercel

Add environment variables in Vercel dashboard

Click "Deploy"

No extra configuration needed for SSR or routing.

🔐 Authentication Flow
Uses NextAuth.js for Google Sign-In

Secure session storage with JWT

Callback route: /api/auth/callback/google

🧠 Future Improvements
Add persistent video generation history per user

Add user-uploaded thumbnails and preview sharing

Integrate actual AI video generation model or API

Like/Save system for generated videos

Pagination and infinite scroll for prompt history

🙋‍♂️ About the Author
Created with ❤️ by Aniket Gaikwad.
A full-stack developer passionate about building cool, smart, and useful apps using modern web technologies.

📄 License
This project is licensed under the MIT License.

You are free to use, modify, and distribute it under the terms of the license.










