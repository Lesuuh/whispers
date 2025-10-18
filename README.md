# 🗣️ Whispers

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Express.js](https://img.shields.io/badge/Express.js-Server-green?logo=express)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-blue?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Made with ❤️ by Lesuuh](https://img.shields.io/badge/Made_with_%E2%9D%A4_by-Lesuuh-purple)

---

**Whispers** is a platform where users can **share their thoughts anonymously** — no accounts, no pressure, just pure expression.

Built with **Next.js 15** (frontend), **Express.js** (backend), and **Supabase PostgreSQL** (database), Whispers delivers a sleek, secure, and modern anonymous blogging experience.

---

## 🚀 Features

- ✍️ Post thoughts anonymously
- 🧭 Browse posts by categories
- 💬 Comment without revealing your identity
- 📱 Fully responsive for mobile and desktop
- ⚡ Smooth UI transitions & gradients
- 📦 PWA-ready (installable on devices)

---

## 🏗️ Tech Stack

**Frontend:**

- Next.js 15
- React
- Tailwind CSS
- React Markdown
- Axios
- Lucide React

**Backend:**

- Express.js
- Node.js

**Database:**

- Supabase (PostgreSQL)

---

## 💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/lesuuh/whispers.git
cd whispers
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

App runs at:
👉 `http://localhost:3000`

---

### 3️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Server runs at:
👉 `http://localhost:5000`

---

<!-- ## ⚙️ Environment Variables -->

<!-- Create `.env` files in both the **client** and **server** directories. -->

<!-- **Server (`server/.env`):**

```env
PORT=5000
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
JWT_SECRET=<your-jwt-secret>
```

**Client (`client/.env.local`):**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key> -->

```

---

## 🧩 Folder Structure

```

whispers/
├── client/ # Next.js frontend
│ ├── app/ # Routes & components
│ ├── public/ # Assets & icons
│ └── styles/ # Tailwind & global styles
│
└── server/ # Express backend
├── routes/ # API routes
├── controllers/ # Logic & handling
├── services/ # Supabase queries
└── models/ # (optional for structure)

```

---

## 📦 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Supabase

Make sure to add your environment variables to your deployment platform settings.

---

## 🧠 Future Improvements

- 🔐 User profiles (optional anonymity)
- ❤️ Like / react to posts
- 🔔 Notifications for new comments
- 📊 Analytics for admins

---

## 👨‍💻 Author

**Lesuuh** — Frontend Developer
_"Air it out. Freely. Anonymously."_

---

## 🔗 Links

- 🌐 **Live Demo:** [https://whispers-gold.vercel.app](https://whispers-gold.vercel.app)
- 🧰 **GitHub Repo:** [https://github.com/lesuuh/whispers](https://github.com/lesuuh/whispers)

---

## 🪪 License

This project is open-source under the **MIT License**.

```

```

```
