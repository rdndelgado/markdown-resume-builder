# CLAUDE.md — Resume Builder PRD

## Project Overview

A web-based resume builder where users input their details (name, experience, skills, etc.), preview a live-rendered resume, and export it as PDF or HTML. Resumes are persisted via URL/hash — no auth required. An AI-powered content improvement feature rewrites or enhances user-written bullet points and summaries.

Deployed as a **monorepo on Vercel** — React frontend served as static assets, FastAPI backend running as Vercel Serverless Functions via Mangum. Single project, single URL, single deployment.

---

## Tech Stack

| Layer              | Technology                                                |
| ------------------ | --------------------------------------------------------- |
| Frontend           | React (Vite), TailwindCSS                                 |
| Backend            | Python, FastAPI                                           |
| Serverless Adapter | Mangum (wraps FastAPI for Vercel)                         |
| AI Feature         | OpenAI API (`gpt-4o-mini`)                                |
| PDF Generation     | `window.print()` with per-theme print CSS (frontend-only) |
| State Persistence  | URL hash (base64-encoded JSON)                            |
| Deployment         | Vercel monorepo — single project, single URL              |

---

## Repository Structure

```
resume-builder/                  ← repo root (Vercel project root)
├── vercel.json                  ← monorepo routing config (root level)
├── frontend/                    ← React/Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/          # Form sections (personal, experience, skills, etc.)
│   │   │   ├── Preview/         # Live resume preview panel
│   │   │   ├── ThemeSwitcher/   # Theme selector UI
│   │   │   └── ExportBar/       # PDF/HTML export buttons
│   │   ├── themes/              # Theme CSS/style definitions
│   │   │   ├── classic.css
│   │   │   ├── modern.css
│   │   │   └── minimal.css
│   │   ├── hooks/
│   │   │   ├── useResumeState.js     # Manages form state + URL sync
│   │   │   └── useAIImprove.js       # Calls backend AI endpoint
│   │   ├── utils/
│   │   │   ├── hashEncoder.js        # base64 encode/decode resume JSON
│   │   │   └── exportHTML.js         # Generates standalone HTML string
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     ← FastAPI app (runs as Vercel serverless)
│   ├── api/
│   │   └── index.py             ← Vercel entry point (must be this exact path)
│   ├── routers/
│   │   ├── ai.py                # POST /api/improve — AI rewrite endpoint
│   │   └── export.py            # POST /api/export/pdf — PDF (print trigger)
│   ├── services/
│   │   └── ai_service.py        # OpenAI API client logic
│   ├── models/
│   │   └── resume.py            # Pydantic models for resume data
│   ├── templates/               # Jinja2 HTML templates per theme (for HTML export)
│   │   ├── classic.html
│   │   ├── modern.html
│   │   └── minimal.html
│   └── requirements.txt
│
├── CLAUDE.md                    # This file
└── README.md
```

---

## Data Model

All resume data is a single JSON object. This is the canonical schema — use it everywhere (frontend state, API payloads, URL hash, Pydantic models).

```json
{
  "meta": {
    "theme": "classic"
  },
  "personal": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "summary": ""
  },
  "experience": [
    {
      "id": "uuid",
      "company": "",
      "role": "",
      "start_date": "",
      "end_date": "",
      "current": false,
      "bullets": [""]
    }
  ],
  "education": [
    {
      "id": "uuid",
      "institution": "",
      "degree": "",
      "field": "",
      "start_date": "",
      "end_date": ""
    }
  ],
  "skills": {
    "technical": [""],
    "soft": [""]
  },
  "certifications": [
    {
      "id": "uuid",
      "name": "",
      "issuer": "",
      "year": ""
    }
  ]
}
```

---

## Features

### 1. Resume Editor (Left Panel)
- Accordion-style sections: Personal Info, Summary, Experience, Education, Skills, Certifications
- Each experience entry has dynamic bullet point inputs (add/remove rows)
- All fields update live state on change

### 2. Live Preview (Right Panel)
- Renders the resume in real-time using the selected theme
- Split-screen layout: editor left, preview right
- Preview uses an iframe or scoped div with the theme's CSS applied
- On mobile: toggle between editor and preview tabs

### 3. Theme Switcher
- Three themes at launch: **Classic**, **Modern**, **Minimal**
- Switching theme updates both the live preview and the export output
- Themes are defined as:
  - Frontend: CSS files scoped to the preview container
  - Backend: Jinja2 HTML templates used for PDF/HTML export

### 4. URL Hash Persistence
- On every state change, encode the resume JSON as base64 and write to `window.location.hash`
- On page load, read and decode the hash to restore state
- This makes every resume instantly shareable via URL — no backend required for saving

```js
// hashEncoder.js
export const encode = (data) => btoa(unescape(encodeURIComponent(JSON.stringify(data))))
export const decode = (hash) => JSON.parse(decodeURIComponent(escape(atob(hash))))
```

### 5. AI Content Improvement
- Each bullet point and the summary field has an "Improve with AI" button (sparkle icon)
- On click: sends the text + context (role, company) to `POST /api/improve`
- Returns improved text; user can accept or discard
- AI does NOT auto-apply — user must confirm

**Backend endpoint:**
```
POST /api/improve
Body: { "text": "...", "context": "role: Software Engineer at Acme Corp", "field": "bullet" }
Response: { "improved": "..." }
```

**AI model:** `gpt-4o-mini` via OpenAI API

**System prompt for AI service:**
```
You are a professional resume writer. Your job is to improve resume content to be
more impactful, quantified, and achievement-focused. Use strong action verbs. Keep
it concise. Do not invent facts — only enhance what the user provides. Return only
the improved text, no explanation.
```

### 6. Export — PDF Download
- Button: "Download PDF"
- Handled entirely on the **frontend** — no backend call needed
- Triggers `window.print()` with a print-specific CSS stylesheet active for the current theme
- Each theme has a `{theme}-print.css` that hides the editor UI, removes screen-only elements, and formats the resume for A4/Letter paper
- User's browser native print dialog handles the actual PDF save

### 7. Export — HTML Download
- Button: "Download HTML"
- Handled entirely on the frontend — no backend call needed
- Generates a self-contained HTML string (inline CSS, no external dependencies) from the current preview
- Triggers a browser download via a Blob URL

---

## API Endpoints

| Method | Path           | Description                |
| ------ | -------------- | -------------------------- |
| `POST` | `/api/improve` | AI rewrite of a text field |
| `GET`  | `/api/health`  | Health check               |

> PDF export is handled client-side via `window.print()`. There is no `/api/export/pdf` endpoint.

### POST /api/improve

Request:
```json
{
  "text": "worked on backend stuff",
  "context": "Software Engineer at Acme Corp",
  "field": "bullet"
}
```

Response:
```json
{
  "improved": "Architected and maintained RESTful backend services serving 50k+ daily active users"
}
```

---

## Themes

Three themes ship at launch. Each theme is a set of three files:
1. A screen CSS file for the frontend live preview (`{theme}.css`)
2. A print CSS file for PDF export via `window.print()` (`{theme}-print.css`)
3. A Jinja2 HTML template for HTML file export (`{theme}.html`)

| Theme     | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `classic` | Traditional serif layout. Black/white. Conservative formatting. ATS-friendly. |
| `modern`  | Clean sans-serif. Accent color sidebar. Two-column layout.                    |
| `minimal` | Ultra-clean. Maximum whitespace. Monochrome. Typography-driven.               |

Theme files live in:
- `frontend/src/themes/{theme}.css` — screen styles
- `frontend/src/themes/{theme}-print.css` — print media styles (hides UI chrome, formats for paper)
- `backend/templates/{theme}.html` — Jinja2 template for HTML export

**Important:** The screen CSS, print CSS, and Jinja2 template for each theme must produce visually consistent output. Treat them as a matched set.

---

## Environment Variables

### Local development — Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:8000
```

### Local development — Backend (`backend/.env`)
```
OPENAI_API_KEY=sk-...
ALLOWED_ORIGINS=http://localhost:5173
```

### Vercel (single env var panel for the whole monorepo)
```
OPENAI_API_KEY=sk-...
VITE_API_BASE_URL=
```

Leave `VITE_API_BASE_URL` empty on Vercel — since frontend and backend share the same domain, API calls use relative paths (`/api/improve`) with no base URL prefix.

---

## Vercel Deployment (Monorepo)

### Root-level `vercel.json`

This file lives at the **repo root** and is the single config that wires everything together:

```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "backend/api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/api/index.py" },
    { "src": "/(.*)", "dest": "frontend/dist/$1" }
  ]
}
```

### `backend/api/index.py` — Vercel entry point

Vercel requires the Python entry point at exactly this path. Use Mangum to wrap FastAPI:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from routers import ai

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(ai.router, prefix="/api")

handler = Mangum(app)
```

### `frontend/package.json` build script

Vercel triggers the `build` script automatically:

```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  }
}
```

### Deployment Steps

1. Push monorepo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import repo
3. **Leave Root Directory blank** — Vercel must see the root `vercel.json`
4. Add environment variable: `OPENAI_API_KEY=sk-...`
5. Deploy — frontend and backend live at the same URL

---

## Development Setup

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

During local dev, the frontend hits `http://localhost:8000/api/*` via `VITE_API_BASE_URL`. On Vercel, it uses relative paths automatically.

---

## requirements.txt (backend)

```
fastapi
mangum
openai
jinja2
pydantic
python-dotenv
python-multipart
```

---

## Implementation Order

Build in this sequence — the app is functional and testable at every step:

1. **Scaffold** — Vite React app + FastAPI app, root `vercel.json`, `/api/health` endpoint, CORS configured
2. **Data model + state** — Resume JSON schema, `useResumeState` hook, URL hash encode/decode
3. **Editor UI** — All form sections, dynamic bullet inputs, accordion layout
4. **Live preview** — Preview panel renders from state, Classic theme CSS applied
5. **Theme switcher** — Add Modern and Minimal themes, switcher UI component
6. **PDF export** — Per-theme print CSS, `window.print()` triggered from Export button
7. **HTML export** — Frontend-only, generate and download self-contained HTML file
8. **AI improvement** — `/api/improve` endpoint with OpenAI `gpt-4o-mini`, per-field improve button, accept/discard UI
9. **Polish** — Mobile responsiveness, loading states, error handling, empty state screens

---

## Key Constraints & Decisions

- **No database, no auth.** All persistence is URL hash only. Keep everything stateless.
- **PDF is frontend-only via `window.print()`.** No server-side PDF generation. Each theme has a dedicated print CSS that hides the editor UI and formats the resume for paper. Do not introduce WeasyPrint or Puppeteer.
- **AI model is `gpt-4o-mini` via OpenAI API.** Do not use Anthropic or any other provider.
- **AI never auto-applies changes.** Always show the improved text alongside the original and require explicit user acceptance before replacing content.
- **One canonical data model.** The JSON schema above is the single source of truth — do not invent new field names outside of it.
- **Themes are always a matched set of three files.** Every theme requires a screen CSS, a print CSS, and a Jinja2 HTML template. All three must be visually consistent.
- **URL hash wins on load.** If a hash is present in the URL on page load, it overrides all default state. Do not merge — replace.
- **Monorepo, single Vercel project.** The root `vercel.json` routes `/api/*` to FastAPI and everything else to the React build. Do not split into two separate Vercel projects.
- **API calls use relative paths in production.** `VITE_API_BASE_URL` is empty on Vercel — calls go to `/api/improve`, not an absolute URL. Only set it to `http://localhost:8000` for local dev.
- **Backend entry point is `backend/api/index.py`.** Vercel requires this exact path. Do not rename or move it.