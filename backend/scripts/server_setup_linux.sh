#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=== [1/5] Installing system packages (requires sudo) ==="
# If you're already root, you can drop sudo here.
sudo apt-get update
sudo apt-get install -y \
  postgresql postgresql-contrib postgis \
  gdal-bin libgdal-dev libgeos-dev \
  python3-venv python3-dev build-essential

echo "=== [2/5] Setting up PostgreSQL database and PostGIS ==="
# Run the SQL script as the postgres superuser
sudo -u postgres psql -f "$PROJECT_ROOT/scripts/setup_db.sql"

echo "=== [3/5] Creating Python virtualenv and installing requirements ==="
cd "$PROJECT_ROOT"

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate venv
# shellcheck source=/dev/null
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

echo "=== [4/5] Creating .env if missing ==="
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env from .env.example. You can edit it if needed."
fi

echo "=== [5/5] Running Django migrations ==="
python manage.py migrate

echo
echo "✅ Server setup complete."
echo "Next steps (run as your app user, with venv active):"
echo "  1) source venv/bin/activate"
echo "  2) python manage.py createsuperuser"
echo "  3) python manage.py runserver 0.0.0.0:8001  # or use gunicorn/uvicorn"
