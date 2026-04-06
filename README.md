# 🎓 UniEvents — College Event Registration System

A cloud-native web application for students to register for college events. Built with **Node.js + Express + MongoDB**, deployed on **Render**, and designed to mirror a serverless GCP architecture.

---

## 🚀 Live Demo

> Once deployed: `[https://your-app.onrender.com](https://dashboard.render.com/web/srv-d79uuvc50q8c73ad8jo0)`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  LOCAL PROTOTYPE                     │
│                                                      │
│  Browser (HTML/CSS/JS)                               │
│       │                                              │
│       ▼                                              │
│  Express.js Server (Node.js)                         │
│       │                                              │
│       ▼                                              │
│  MongoDB (local / Atlas)                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│             GOOGLE CLOUD EQUIVALENT                  │
│                                                      │
│  Express Server  →  Cloud Run (serverless)           │
│  MongoDB         →  Firestore / Cloud SQL            │
│  Static Files    →  Cloud Storage + CDN              │
│  Loose coupling  →  Pub/Sub messaging                │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML5, CSS3, Vanilla JS |
| Backend    | Node.js + Express.js    |
| Database   | MongoDB (Mongoose ODM)  |
| Hosting    | Render                  |
| DB Hosting | MongoDB Atlas           |

---

## 🛠️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB installed locally **or** a MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/college-event-registration.git
cd college-event-registration
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/eventregistration

# For MongoDB Atlas (recommended for Render):
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/eventregistration?retryWrites=true&w=majority

PORT=3000
```

### 4. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 5. Open in browser

```
http://localhost:3000
```

---

## ☁️ Deploy to Render

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/college-event-registration.git
git push -u origin main
```

### Step 2: Set up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. Database Access → Add user with read/write permissions
3. Network Access → Add IP `0.0.0.0/0` (allow all — for Render)
4. Clusters → Connect → "Connect your application" → Copy the connection string

### Step 3: Deploy on Render

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `college-event-registration`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variable:
   - Key: `MONGO_URI`
   - Value: *(your Atlas connection string)*
5. Click **Create Web Service**

Render will build and deploy. Your app will be live at `https://your-app.onrender.com` 🎉

---

## 📡 API Endpoints

### POST `/api/registrations`
Register a student for an event.

**Request Body:**
```json
{
  "fullName": "Arjun Sharma",
  "email": "arjun@college.edu",
  "phone": "+91 98765 43210",
  "eventName": "Tech Fest",
  "collegeName": "MIT Pune",
  "year": "2nd Year",
  "message": "Looking forward to it!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! 🎉",
  "data": {
    "registrationId": "TEC-123456-789",
    "fullName": "Arjun Sharma",
    "eventName": "Tech Fest",
    "email": "arjun@college.edu",
    "registeredAt": "2025-05-01T10:30:00.000Z"
  }
}
```

### GET `/api/registrations`
List all registrations (paginated).

| Query Param | Description         | Default |
|-------------|---------------------|---------|
| `event`     | Filter by event name | all    |
| `page`      | Page number          | 1      |
| `limit`     | Results per page     | 20     |

### GET `/api/registrations/stats`
Event-wise registration counts.

### GET `/api/health`
Server health check.

---

## 🗂️ Project Structure

```
college-event-registration/
├── public/
│   └── index.html          # Frontend (single-page app)
├── models/
│   └── Registration.js     # Mongoose schema & model
├── routes/
│   └── registration.js     # Express route handlers
├── server.js               # App entry point
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
└── README.md
```

---

## 🔄 Migration to Google Cloud

| Current (Local/Render) | GCP Equivalent          | Why                                      |
|------------------------|-------------------------|------------------------------------------|
| Express on Render      | **Cloud Run**           | Serverless containers, auto-scaling      |
| MongoDB Atlas          | **Firestore**           | Fully managed NoSQL, native GCP          |
| `public/index.html`    | **Cloud Storage + CDN** | Global static hosting                    |
| REST API events        | **Pub/Sub**             | Loosely coupled async integrations       |
| Manual deployment      | **Cloud Build + CI/CD** | Automated pipelines from GitHub          |

**Code changes needed for GCP migration:**
1. Replace `mongoose` with `@google-cloud/firestore`
2. Update data model to use Firestore documents/collections
3. Containerize app with a `Dockerfile` for Cloud Run
4. Store static assets in GCS bucket with public access
5. Add `app.yaml` or Cloud Run YAML configuration

---

## ✨ Features

- 📝 **Event registration form** with validation
- 🆔 **Auto-generated registration IDs** (e.g., `TEC-123456-789`)
- 🔁 **Duplicate prevention** (same email + event)
- 📊 **Admin dashboard** to view all registrations with filters
- 📈 **Live stats** — event-wise registration counts
- 📱 **Fully responsive** mobile-friendly design
- 🌐 **No login required** — public access

---

## 📄 License

MIT License — free for educational use.
