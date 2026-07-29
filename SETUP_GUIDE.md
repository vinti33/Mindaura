# 🚀 How to Run Mind Aura Locally

This guide provides step-by-step instructions to configure, install, and launch the **Mind Aura** full-stack application (Node.js/Express Backend & React Frontend) on your local machine.

---

## 📋 Prerequisites

Before starting, make sure you have the following installed on your computer:
* **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
* **npm** (comes bundled with Node.js)
* **MongoDB Instance**:
  * Free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud cluster **OR**
  * Local MongoDB database service running on `mongodb://localhost:27017`

---

## 🛠️ Step 1: Backend Setup & Execution

1. **Open your terminal** and navigate to the project directory:
   ```bash
   cd mind-aura/backend
   ```

2. **Configure Environment Variables**:
   Create a file named `.env` in the `backend/` directory (you can copy `backend/.env.example`):
   ```bash
   cp .env.example .env
   ```
   Open `backend/.env` and update the values:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mindaura?retryWrites=true&w=majority
   JWT_SECRET=your_secret_jwt_key
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

3. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Express Server**:
   ```bash
   node server.js
   ```
   *Expected Server Console Output:*
   ```text
   Server running on port 5000
   MongoDB Connected
   ```

---

## 🎨 Step 2: Frontend Setup & Execution

1. **Open a new terminal window/tab** and navigate to the `frontend/` directory:
   ```bash
   cd mind-aura/frontend
   ```

2. **Configure Environment Variables**:
   Create a file named `.env` in the `frontend/` directory (you can copy `frontend/.env.example`):
   ```bash
   cp .env.example .env
   ```
   Open `frontend/.env` and ensure the backend API URL is set:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

4. **Start the React Development Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Your browser will automatically open [http://localhost:3000](http://localhost:3000).

---

## 🔍 Verification & Testing

* **Sign Up / Login:** Navigate to `http://localhost:3000/signup` to create a test user.
* **Dashboard & Trends:** Log a mood with journal notes at `/log-mood` and inspect your history at `/trends` (entries sorted latest-first).
* **AI Assistant:** Click "Chat with Aura AI" to interact with the protected Gemini AI assistant.

---

## 🛠️ Common Troubleshooting

* **MongoDB Connection Error:** Ensure your `MONGO_URI` username and password are correct and that IP access (0.0.0.0/0) is allowed in your MongoDB Atlas Network Access settings.
* **CORS Errors:** Verify `FRONTEND_URL=http://localhost:3000` is set in `backend/.env` and `REACT_APP_API_URL=http://localhost:5000` is set in `frontend/.env`.
* **Port Conflict:** If port 5000 is in use, change `PORT=5001` in `backend/.env` and update `REACT_APP_API_URL` accordingly.
