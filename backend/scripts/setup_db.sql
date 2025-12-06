-- Run this as the postgres superuser (e.g. `psql -U postgres -f backend/scripts/setup_db.sql`)

DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'app') THEN
      CREATE ROLE app LOGIN PASSWORD 'app';
   END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'app') THEN
      CREATE DATABASE app OWNER app;
   END IF;
END
$$;

\c app

-- Enable PostGIS (if available)
CREATE EXTENSION IF NOT EXISTS postgis;
