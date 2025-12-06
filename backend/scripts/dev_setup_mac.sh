#!/usr/bin/env bash
set -e

# 1. Install system deps (safe to rerun – brew will skip installed stuff)
brew install postgresql@18 postgis gdal geos || true
brew services start postgresql@18 || true

# 2. Wait a bit for Postgres to start
sleep 3

# 3. Create DB, user, and enable PostGIS
psql postgres -f "$(dirname "$0")/setup_db.sql"

# 4. Python venv + deps
cd "$(dirname "$0")/.."

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 5. Env file
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

# 6. Run migrations
python manage.py migrate

echo
echo "✅ Backend ready."
echo "Next steps:"
echo "  1) python manage.py createsuperuser"
echo "  2) python manage.py runserver 0.0.0.0:8001"
