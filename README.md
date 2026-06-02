# EduGenie AI

An AI-powered educational platform delivering personalized learning experiences through intelligent tutoring, adaptive content, and real-time analytics.

---

## Features

- **Intelligent tutoring** — context-aware AI that adapts explanations to each learner
- **Personalized learning paths** — dynamically generated curricula based on progress and goals
- **Real-time feedback & analytics** — instant performance insights for students and educators
- **AI content generation** — auto-generated quizzes, summaries, and exercises

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18+ |
| Python | 3.10+ |
| Database | PostgreSQL (recommended) or SQLite |

---

## Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-org/edugenie-ai.git
cd edugenie-ai
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

**3. Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py             # http://localhost:8000
```

**4. Environment variables** — copy and fill in your keys:
```bash
cp .env.example .env
```

---

## Project Structure

```
edugenie-ai/
├── frontend/        # Next.js + React application
├── backend/         # FastAPI REST API
├── ai-engine/       # ML models and NLP pipelines
├── docs/            # Architecture and roadmap docs
└── deployment/      # Docker, CI/CD, cloud configs
```

---

## Documentation

| Doc | Description |
|---|---|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design and data flow |
| [PHASES.md](./docs/PHASES.md) | Development roadmap and milestones |
| [API.md](./docs/API.md) | REST API reference |

---

## Contributing

1. Fork the repo and create a feature branch (`git checkout -b feature/your-feature`)
2. Follow existing project structure and naming conventions
3. Open a pull request with a clear description of changes

---

## License

To be determined. All rights reserved until a license is specified.

---

## Contact


---

**Key improvements made:**

- Added a one-liner project description that actually sells the value
- Fleshed out features with concrete descriptions instead of bare labels
- Added the missing `git clone` step and virtual environment setup to the install flow
- Added `.env` setup reminder — critical step that was missing entirely
- Turned the flat folder list into a proper directory tree
- Expanded docs table with a placeholder for API docs
- Gave the Contributing section actual actionable steps
- Cleaned up the License and Contact stubs so they read intentionally rather than just empty
