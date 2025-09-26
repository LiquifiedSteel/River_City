/**
 * db/pool.js
 *
 * Purpose:
 *   Create and export a PostgreSQL connection pool with secure, flexible
 *   configuration based entirely on environment variables.
 *
 * Behavior:
 *   - If DATABASE_URL is set, it is used (typical for hosted environments).
 *   - Otherwise, discrete PG* variables are required (suitable for dev/CI).
 *   - TLS is controlled via PGSSLMODE:
 *       "verify-full": verify server cert with provided CA (PGSSL_CA[_FILE])
 *       "require":     require TLS using system CAs (good default for hosts)
 *       "no-verify":   TLS without verification (compat only; not recommended)
 *
 * Notes:
 *   - No hardcoded local defaults; this avoids “it works on my machine”
 *     surprises and makes deployments consistent.
 *   - Pool size and timeouts are tunable via env vars.
 */

const { Pool } = require("pg");
const fs = require("fs");

/** Pool tuning (sane defaults if unset) */
const POOL_MAX = Number(process.env.PGPOOL_MAX || 10);
const IDLE_TIMEOUT_MS = Number(process.env.PG_IDLE_TIMEOUT_MS || 30_000);
const CONN_TIMEOUT_MS = Number(process.env.PG_CONN_TIMEOUT_MS || 5_000);

/** Optional per-session server-side timeouts */
const STMT_TIMEOUT_MS = envInt("PG_STATEMENT_TIMEOUT_MS");
const IDLE_TX_TIMEOUT_MS = envInt("PG_IDLE_IN_TRANSACTION_SESSION_TIMEOUT_MS");

/** TLS settings (used only when DATABASE_URL is set) */
const sslMode = (process.env.PGSSLMODE || "").toLowerCase(); // verify-full|require|no-verify|""
const caFromFile = process.env.PGSSL_CA_FILE ? safeRead(process.env.PGSSL_CA_FILE) : null;
const caPem = process.env.PGSSL_CA || caFromFile || null;

/** Build SSL configuration based on PGSSLMODE */
function buildSslConfig() {
  if (!process.env.DATABASE_URL) return false; // no TLS when using discrete vars unless your env requires it

  switch (sslMode) {
    case "verify-full":
      if (!caPem) {
        console.warn("[pg] PGSSLMODE=verify-full but no CA provided; falling back to 'require'.");
        return true; // require TLS using system CAs
      }
      return { ca: caPem, rejectUnauthorized: true };

    case "require":
      return true; // use TLS; rely on system CAs

    case "no-verify":
      return { rejectUnauthorized: false }; // compatibility mode only

    default:
      // Default to 'require' in production, 'no TLS' in non-DATABASE_URL paths.
      // Most managed Postgres instances support sslmode=require.
      return true;
  }
}

/** Safely read a file path; return null on error */
function safeRead(path) {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (e) {
    console.warn(`[pg] Could not read CA file at ${path}: ${e.message}`);
    return null;
  }
}

/** Parse integer env var safely */
function envInt(name) {
  return process.env[name] ? Number(process.env[name]) : null;
}

/** Build pool config */
let poolConfig;

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: buildSslConfig(),
    max: POOL_MAX,
    idleTimeoutMillis: IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: CONN_TIMEOUT_MS,
    application_name: process.env.PG_APP_NAME || "app",
  };
} else {
  // Discrete PG* vars required; fail fast if missing essentials
  const missing = ["PGHOST", "PGPORT", "PGDATABASE", "PGUSER"].filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(
      `[pg] Missing required env vars: ${missing.join(", ")}. ` +
      `Set DATABASE_URL for hosted envs, or set discrete PG* vars for dev/CI.`
    );
  }

  poolConfig = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD, // may be blank if using peer auth in CI/dev
    ssl: false, // typically off for local/dev; enable only if your dev DB requires it
    max: POOL_MAX,
    idleTimeoutMillis: IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: CONN_TIMEOUT_MS,
    application_name: process.env.PG_APP_NAME || "app-dev",
  };
}

const pool = new Pool(poolConfig);

/** Optionally apply server-side timeouts when a client connects */
pool.on("connect", (client) => {
  const stmts = [];
  if (Number.isFinite(STMT_TIMEOUT_MS)) {
    stmts.push(`SET statement_timeout = ${STMT_TIMEOUT_MS}`);
  }
  if (Number.isFinite(IDLE_TX_TIMEOUT_MS)) {
    stmts.push(`SET idle_in_transaction_session_timeout = ${IDLE_TX_TIMEOUT_MS}`);
  }
  if (stmts.length) {
    client.query(stmts.join("; ")).catch((e) =>
      console.warn("[pg] Failed to apply session timeouts:", e.message)
    );
  }
});

/** Log unexpected idle client errors (helps diagnose network resets) */
pool.on("error", (err) => {
  console.error("[pg] Unexpected idle client error:", err.message);
});

module.exports = pool;