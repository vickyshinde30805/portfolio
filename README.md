# Vicky Shinde Portfolio

A full-stack portfolio project built with Django REST API and a React frontend. This version is organized for scalability, clean separation of responsibilities, and easier future expansion.

## Tech stack

- Backend: Django + Django REST Framework
- Frontend: React + Vite
- Data: SQLite for local development
- API style: REST JSON endpoints

## Project structure

```text
vicky-shinde-portfolio/
├── backend/
│   ├── apps/
│   │   └── profile/
│   │       ├── admin.py
│   │       ├── apps.py
│   │       ├── migrations/
│   │       ├── models.py
│   │       ├── serializers.py
│   │       ├── urls.py
│   │       └── views.py
│   ├── portfolio_backend/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── services/
│   │       └── api.js
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .gitignore
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── activity.js
│   ├── main.js
│   └── theme.js
└── data/
    └── leetcode-activity.js
```

## Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

API endpoint:

- http://localhost:8000/api/profile/

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

React app runs at:

- http://localhost:5173

## Containerized option

```bash
docker compose up --build
```

This starts both backend and frontend together.

## Deploying to Vercel and Render

### Deploy the Django API to Render

1. Push this project to a GitHub repository.
2. In Render, choose **New + → Blueprint** and connect the repository. Render will use the root `render.yaml` to create the API service.
3. Wait for the service health check at `/api/profile/` to pass. Copy the service URL, such as `https://vicky-shinde-portfolio-api.onrender.com`.

The Render blueprint installs dependencies, collects Django admin static files, runs migrations, and starts Gunicorn. It generates a `DJANGO_SECRET_KEY` and disables debug mode.

### Deploy the React frontend to Vercel

1. In Vercel, import the same GitHub repository and set **Root Directory** to `frontend`.
2. Use `npm run build` as the build command and `dist` as the output directory (Vercel normally detects these automatically).
3. Add the environment variable `VITE_API_BASE_URL` with the Render API base URL ending in `/api`, for example `https://vicky-shinde-portfolio-api.onrender.com/api`.
4. Deploy, then add the exact production Vercel origin to the Render service's `CORS_ALLOWED_ORIGINS` environment variable (no trailing slash). Include custom domain origins as comma-separated values, then redeploy the Render service.

Vite reads `VITE_API_BASE_URL` at build time, so changing that value in Vercel requires a new deployment. For local development, the frontend defaults to `http://localhost:8000/api`.

## Notes

- The original static HTML/CSS/JS files have been preserved for reference.
- The new architecture separates API logic from UI logic and is better suited for scaling the portfolio into a CMS or admin dashboard later.
- The frontend consumes the Django REST API instead of reading local static files.