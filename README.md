This version of the project was migrated from CRA to Vite to be more in line with the course material for this semester.  

## 🚀 Quick Start

**Navigate to the project folder:**
    cd Woodland-Conservation-SMB

### Setup and Run
    # 1) Install dependencies
    npm install

    # 2) Run frontend
    npm run dev:frontend

    This will start the frontend dev server (see package.json for the default port).

---


## 🧠 Setup Notes
- The `.gitignore` file already excludes `node_modules`, build files, and `.env`, so your API keys and dependencies won’t be uploaded to GitHub.  
- If you create other sensitive files (like `.env.development` or `.env.production`), make sure they’re listed in `.gitignore` as well.  

## Backend Setup (Django + Wagtail + PostGIS)

The backend requires:

- PostgreSQL with the PostGIS extension
- Python 3.10+ with virtualenv
- GDAL + GEOS (for GeoDjango)

Scripts: 

- If you have installation rights, and are on macOs or Linux, the scripts will install these automatically.
- If the scripts are run, edit the .env file as needed. 
- You will be prompted to create an admin for Wagtail, and to enter a username, email and password. These will be used to log into the admin portal later. This will be hosted on http://localhost:8001/cms, and you will enter the details on http://localhost:8001/cms/login 

We provide OS-specific setup scripts that:

- Create the `app` database and `app` user
- Enable the `postgis` extension
- Create a Python virtual environment
- Install `requirements.txt`
- Create `.env` (from `.env.example`) if needed
- Run Django migrations

### macOS (Apple Silicon + Homebrew)

```bash
cd backend
./scripts/setup_backend_mac.sh
source venv/bin/activate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8001
```

### Linux (Ubuntu/Debian)

```bash
cd backend
./scripts/setup_backend_linux.sh
source venv/bin/activate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8001
```

### Windows (Powershell)

Prerequisites: 
* PostgreSQL + PostGIS installed
* psql on PATH
* Python 3 installed

```powershell
cd backend
# Only once per machine if needed:
# Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

.\scripts\setup_backend_windows.ps1
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8001
```

