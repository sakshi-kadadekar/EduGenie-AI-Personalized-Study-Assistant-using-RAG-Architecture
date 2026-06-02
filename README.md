EduGenie AI
An AI-powered educational platform delivering personalized learning experiences through intelligent tutoring, adaptive content, and real-time analytics.

Features

Intelligent tutoring — context-aware AI that adapts explanations to each learner
Personalized learning paths — dynamically generated curricula based on progress and goals
Real-time feedback & analytics — instant performance insights for students and educators
AI content generation — auto-generated quizzes, summaries, and exercises


Prerequisites
RequirementVersionNode.js18+Python3.10+DatabasePostgreSQL (recommended) or SQLite

Installation
1. Clone the repository
bashgit clone https://github.com/sakshi-kadadekar/edugenie-ai.git
cd edugenie-ai
2. Frontend
bashcd frontend
npm install
npm run dev        # http://localhost:3000
3. Backend
bashcd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py             # http://localhost:8000
4. Environment variables
bashcp .env.example .env           # Fill in your API keys and DB config

Project Structure
edugenie-ai/
├── frontend/        # Next.js + React application
├── backend/         # FastAPI REST API
├── ai-engine/       # ML models and NLP pipelines
├── docs/            # Architecture and roadmap docs
└── deployment/      # Docker, CI/CD, cloud configs

Documentation
DocDescriptionARCHITECTURE.mdSystem design and data flowPHASES.mdDevelopment roadmap and milestonesAPI.mdREST API reference

Contributing

Fork the repo and create a feature branch — git checkout -b feature/your-feature
Follow existing project structure and naming conventions
Open a pull request with a clear description of changes


License
To be determined. All rights reserved until a license is specified.

Author
Sakshi Kadadekar
📧 sakshisantosh0305@gmail.com
💼 LinkedIn
💻 GitHub
