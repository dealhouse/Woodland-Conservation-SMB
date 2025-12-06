This version of the project was migrated from CRA to Vite to be more in line with the course material for this semester.  

## 🚀 Quick Start

### Cloning the Repository
Once added as a collaborator:

**Using SSH (recommended):**
    git clone git@github.com:dealhouse/Woodland-Conservation-SMB.git

**Using HTTPS:**
    git clone https://github.com/dealhouse/Woodland-Conservation-SMB.git

**Navigate to the project folder:**
    cd Woodland-Conservation-SMB

### Setup and Run
    # 1) Install dependencies
    npm install

    # 2) Create a local .env file
    echo "VITE_WEATHER_API_KEY=<secret_api_key_here>" > .env

    # 3) Run frontend
    npm run dev:frontend

    This will start the frontend dev server (see package.json for the default port).

---

## 🔄 Updating and Contributing

**Before editing, always pull the latest changes:**
    git pull

**To commit and push your own changes:**
    git add .
    git commit -m "describe your change here"
    git push

---

## 🧠 Setup Notes
- The `.gitignore` file already excludes `node_modules`, build files, and `.env`, so your API keys and dependencies won’t be uploaded to GitHub.  
- If you create other sensitive files (like `.env.development` or `.env.production`), make sure they’re listed in `.gitignore` as well.  

## Backend Setup (Django + Wagtail + PostGIS)

The backend requires:

- PostgreSQL with the PostGIS extension
- Python 3.10+ with virtualenv
- GDAL + GEOS (for GeoDjango)

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

