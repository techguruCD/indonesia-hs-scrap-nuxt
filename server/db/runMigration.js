import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'

console.log("running migrations")
const dbPath = process.env.DB_PAHT || 'db.sqlite';
const sqlite = new Database(dbPath)
const _db = drizzle(sqlite)
migrate(_db, { migrationsFolder: 'server/db/migrations' });
console.log("ending migrations")