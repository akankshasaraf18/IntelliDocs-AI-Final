# IntelliDocs AI

## AI-Powered Research & Document Intelligence Platform

IntelliDocs AI is a modern AI-powered document analysis platform designed to help users quickly understand complex documents using summarization, question answering, analytics, and intelligent insights.

The platform allows users to upload documents and interact with them using Generative AI for faster research and productivity workflows.

---

# Features

* AI Document Summarization
* AI Question Answering
* Smart Report Generation
* Document Analytics
* OCR-Based Text Extraction
* Key Insights & Topic Detection
* Multi-format Document Support
* Responsive Modern Dashboard

---

# Supported File Formats

* PDF
* DOCX
* TXT
* Images (OCR)

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Google Generative AI API
* Tesseract OCR

---

# Project Structure

```bash
IntelliDocs-AI/
│
├── smartdoc-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── smartdoc-backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

# Frontend Setup

```bash
cd smartdoc-frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd smartdoc-backend

npm install

npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Environment Variables

Create `.env` file inside backend:

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

GOOGLE_API_KEY=your_google_api_key

AUTH0_DOMAIN=your_auth0_domain

AUTH0_CLIENT_ID=your_auth0_client_id

AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

---

# Deployment

## Frontend Deployment

Recommended:

* Vercel

## Backend Deployment

Recommended:

* Render

---

# Core Functionalities

## Document Summarization

Generate concise summaries from uploaded documents.

## AI Q&A

Ask questions directly from uploaded files.

## SmartWriter

Generate structured AI-assisted content and reports.

## Document Analytics

View reading time, document statistics, and insights.

---

# Future Improvements

* Multi-document comparison
* Export AI reports
* Citation extraction
* Research timeline generation
* AI flashcards

---

# Author

Akanksha Saraf

---

# License

This project is for educational and portfolio purposes.

---

Built using MERN Stack and Generative AI technologies.
