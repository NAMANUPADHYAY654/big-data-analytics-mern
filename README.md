# Big Data Analytics MERN Dashboard

A full-stack modern web application built with the MERN stack (MongoDB, Express, React, Node.js) for visualizing large datasets. It features a stunning dark-mode aesthetic using TailwindCSS and Recharts.

## Features
- **Express Backend:** RESTful API with MongoDB Aggregation pipelines for handling large datasets.
- **Data Seeding:** Built-in script to generate 15,000+ mock records for sales and user activity to simulate big data.
- **React Frontend:** Fast, responsive, Vite-powered frontend.
- **Premium UI:** TailwindCSS-based dark mode design with Recharts data visualization.

## Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas cluster)

## Getting Started

### 1. Database Setup
Ensure you have MongoDB running locally, or create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string (if not using local default):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Seed the database with mock big data:
```bash
npm run seed
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The dashboard will run on `http://localhost:5173`.

## Deployment

### Deploying the Backend (Render)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `npm start`.
7. Add Environment Variables (`MONGO_URI`).
8. Deploy!

### Deploying the Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and add a new project.
2. Import your GitHub repository.
3. Set the Root Directory to `frontend`.
4. Framework Preset should auto-detect as **Vite**.
5. Add an Environment Variable: `VITE_API_URL` set to your live Render backend URL (e.g., `https://your-backend.onrender.com/api/analytics`).
6. Deploy!

## GitHub Publishing

To publish this to your GitHub account:
1. Create a new empty repository on GitHub.
2. Run the following commands in the root of this project:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```
