# 📖 How to Run Mind Aura — Complete Setup Guide

This document explains everything you need to run **Mind Aura** on your local machine from scratch.

---

## ⚡ Quick Start Summary

If you already have Node.js and MongoDB ready:

```bash
# 1. Backend (Terminal 1)
cd backend
npm install
node server.js

# 2. Frontend (Terminal 2)
cd frontend
npm install
npm start
```

---

## 📋 Full Step-by-Step Instructions

### Step 1: System Requirements
Ensure you have installed:
* **Node.js** (v18 or higher) — Check using `node -v`
* **npm** (v9 or higher) — Check using `npm -v`
* **MongoDB**: A running local MongoDB instance or a free MongoDB Atlas connection string.

---

### Step 2: Configure Environment Variables

#### A. Backend Environment (`backend/.env`)
Create a file named `.env` inside the `backend` folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_jwt_key_here
FRONTEND_URL=http://localhost:3000
PORT=5000
```
*(You can use `backend/.env.example` as a template)*

#### B. Frontend Environment (`frontend/.env`)
Create a file named `.env` inside the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5000
```
*(You can use `frontend/.env.example` as a template)*

---

### Step 3: Run the Backend Server

1. Open your terminal:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Verify output in terminal:
   ```text
   Server running on port 5000
   MongoDB Connected
   ```

---

### Step 4: Run the Frontend App

1. Open a **second terminal window**:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch React app:
   ```bash
   npm start
   ```
4. Your default web browser will automatically open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Application URLs

| Service | Local Address |
| :--- | :--- |
| **Frontend Web App** | [http://localhost:3000](http://localhost:3000) |
| **Backend REST API** | [http://localhost:5000](http://localhost:5000) |
| **AI Chat Endpoint** | `POST http://localhost:5000/api/ai/ask` |
| **Mood Trends Endpoint** | `GET http://localhost:5000/api/moods/trends` |

---

## ❓ Frequently Asked Questions & Troubleshooting

* **Q: MongoDB Connection Failed?**
  * Make sure your connection string in `backend/.env` contains your correct database username and password. If using MongoDB Atlas, ensure your IP address is whitelisted in Network Access.

* **Q: AI Chat Returns 401 Unauthorized?**
  * You must be logged in to chat with the AI companion. The frontend automatically attaches your JWT token once you log in.

* **Q: Port 5000 is already in use?**
  * Change `PORT=5001` in `backend/.env` and update `REACT_APP_API_URL=http://localhost:5001` in `frontend/.env`.
