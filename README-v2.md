This version of the project was migrated from CRA to Vite to be more in line with the course material for this semester. 

## Quick Start
```bash
# 1) Install dependencies
npm install

# 2) Create a local .env file
echo "VITE_WEATHER_API_KEY=<secret_api_key_here>" > .env

# 3) Run frontend + backend together
npm run dev

## Setup Notes
- The `.gitignore` file already excludes `node_modules`, build files, and `.env`, so your API keys and dependencies won’t be uploaded to GitHub.
- If you create other sensitive files (like `.env.development` or `.env.production`), make sure they’re listed in `.gitignore` as well.
