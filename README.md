# Omnichannel-Ready AI Support Automation Engine

A production-ready, highly robust full-stack AI customer engagement widget designed with strict type safety, modular decoupling, and seamless channel scalability. Built as part of the technical evaluation for the Spur Engineering Team.

- **Live Deployed Application:** [Insert Your Vercel Frontend URL Here]
- **Core Backend API Endpoints:** [Insert Your Render Backend URL Here]

---

## 🏗️ Architectural Overview & Design Choices

This application is engineered using **Layered/Clean Architecture** patterns to enforce complete separation of concerns and avoid common monolithic "foot-guns":

```text
[ Client (React UI + Custom Hooks) ]
                 │  ▲ (Axios HTTP)
                 ▼  │
[ Routing & Validation Layer (Express + Zod v4) ]
                 │
                 ▼
[ Orchestration Business Logic (ChatService) ]
         │                       │
         ▼ (Data Persistence)    ▼ (Abstracted Generative Calls)
[ ChatRepository (Prisma v7) ] [ LLMService (Gemini 2.5 Flash Wrapper) ]
         │                       │
         ▼                       ▼
   [ PostgreSQL DB ]       [ Google Gen AI API Engine ]

## 🛠️ Local Installation & Setup Steps

### 1. Prerequisites

Before running the application locally, ensure the following dependencies are installed and configured:

* Node.js (v18 or higher)
* npm or compatible package manager
* PostgreSQL (running locally or accessible remotely)

Verify your installations:

```bash
node -v
npm -v
```

---

### 2. Environment Configuration

Create a `.env` file inside the `backend/` directory and provide the required environment variables:

```env
PORT=5000

DATABASE_URL="postgresql://<db_user>:<db_password>@localhost:5432/chat_db?schema=public"

GEMINI_API_KEY="your-google-gemini-api-key"

NODE_ENV="development"
```

Replace the placeholder values with your actual PostgreSQL credentials and Gemini API key.

---

### 3. Database Initialization & Schema Synchronization

Install dependencies, initialize the database schema, and generate Prisma Client:

```bash
cd backend

npm install

npx prisma migrate dev --name init
```

This command will:

* Create the required PostgreSQL tables
* Apply the initial migration
* Generate the Prisma Client used throughout the application

---

### 4. Booting Local Development Environments

Run the backend and frontend applications in separate terminal windows.

#### Start Backend API Core

```bash
cd backend

npm run dev
```

The backend service will start and listen on:

```text
http://localhost:5000
```

---

#### Start Frontend Application Client

```bash
cd frontend

npm install

npm run dev
```

The Vite development server will start and expose the application at:

```text
http://localhost:5173
```

Open the URL in your browser to interact with the AI customer engagement widget.

---

### 5. Project Structure

```text
spur-ai-chat-agent/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

### 6. Production Notes

* PostgreSQL serves as the persistent chat storage layer.
* Prisma ORM provides type-safe database access.
* Google Gemini 2.5 Flash powers conversational intelligence.
* Express handles API orchestration and validation.
* React + Vite powers the client-side experience.
* The architecture is intentionally modular, enabling future expansion to additional communication channels such as WhatsApp, Email, Slack, and CRM integrations with minimal changes to core business logic.
