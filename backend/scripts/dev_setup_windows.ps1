#!/usr/bin/env pwsh
Param(
    [string]$PostgresUser = "postgres",
    [string]$PostgresHost = "localhost",
    [int]$PostgresPort = 5432
)

$ErrorActionPreference = "Stop"

Write-Host "=== Backend Windows Setup ==="

# Resolve paths
$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

Write-Host "Project root: $ProjectRoot"
Write-Host "Script dir:   $ScriptDir"
Write-Host ""

# 1) Check for psql
Write-Host "=== [1/5] Checking for psql (PostgreSQL client) ==="
try {
    & psql --version | Out-Null
} catch {
    Write-Error "psql not found. Please install PostgreSQL + PostGIS and ensure 'psql' is in your PATH."
    exit 1
}
Write-Host "psql found."
Write-Host ""

# 2) Run DB + PostGIS setup script
Write-Host "=== [2/5] Setting up database and PostGIS ==="

$setupSql = Join-Path $ScriptDir "setup_db.sql"
if (-Not (Test-Path $setupSql)) {
    Write-Error "Could not find setup_db.sql at $setupSql"
    exit 1
}

Write-Host "Using SQL script: $setupSql"
Write-Host "Connecting as user '$PostgresUser' on $PostgresHost:$PostgresPort ..."
Write-Host "(You may be prompted for the Postgres password.)"
Write-Host ""

& psql -h $PostgresHost -p $PostgresPort -U $PostgresUser -f $setupSql
if ($LASTEXITCODE -ne 0) {
    Write-Error "Database setup failed (psql exit code $LASTEXITCODE)."
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Database and PostGIS extension should now be ready."
Write-Host ""

# 3) Python venv
Write-Host "=== [3/5] Creating Python virtual environment (venv) ==="

$venvPath = Join-Path $ProjectRoot "venv"
if (-Not (Test-Path $venvPath)) {
    Write-Host "Creating virtual environment at: $venvPath"
    try {
        & py -3 -m venv $venvPath
    } catch {
        Write-Warning "Could not use 'py -3', trying 'python' instead..."
        & python -m venv $venvPath
    }
} else {
    Write-Host "Virtual environment already exists at: $venvPath"
}
Write-Host ""

# 4) Activate venv + install requirements
Write-Host "=== [4/5] Installing Python requirements ==="

$activateScript = Join-Path $venvPath "Scripts\Activate.ps1"
if (-Not (Test-Path $activateScript)) {
    Write-Error "Could not find venv activation script at $activateScript"
    exit 1
}

Write-Host "Activating virtual environment..."
. $activateScript

$requirements = Join-Path $ProjectRoot "requirements.txt"
if (-Not (Test-Path $requirements)) {
    Write-Error "Could not find requirements.txt at $requirements"
    exit 1
}

pip install --upgrade pip
pip install -r $requirements

Write-Host ""
Write-Host "Python dependencies installed."
Write-Host ""

# 5) .env + migrations
Write-Host "=== [5/5] Creating .env (if needed) and running migrations ==="

$envExample = Join-Path $ProjectRoot ".env.example"
$envFile    = Join-Path $ProjectRoot ".env"

if (-Not (Test-Path $envFile) -and (Test-Path $envExample)) {
    Copy-Item $envExample $envFile
    Write-Host "Created .env from .env.example. Edit this file if needed."
} elseif (-Not (Test-Path $envFile)) {
    Write-Warning "No .env or .env.example found. You may need to create .env manually."
} else {
    Write-Host ".env already exists, leaving it as-is."
}

Write-Host ""
Write-Host "Running Django migrations..."
cd $ProjectRoot
python manage.py migrate

Write-Host ""
Write-Host "✅ Windows backend setup complete."
Write-Host ""
Write-Host "Next steps (in this same shell):"
Write-Host "  1) python manage.py createsuperuser"
Write-Host "  2) python manage.py runserver 0.0.0.0:8001"
Write-Host ""
Write-Host "If you open a new terminal later, remember to run:"
Write-Host "  . $activateScript"
Write-Host "before running Django commands."
