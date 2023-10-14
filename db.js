import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

let _db = null;

export default () => {
    if (!_db) {
        // if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
        //     // Turso in production
        //     _db = drizzleLibSQL(createLibSQLClient({
        //         url: process.env.TURSO_DB_URL,
        //         authToken: process.env.TURSO_DB_TOKEN
        //     }))
        // } else if (process.env.DB) {
        //     // d1 in production
        //     _db = drizzleD1(process.env.DB)
        // } else if (process.dev) {
        //     // local sqlite in development
        const dbPath = process.env.DB_PAHT || 'db.sqlite';
        const sqlite = new Database(dbPath)
        _db = drizzle(sqlite)
        // } else {
        //     throw new Error('No database configured for production')
        // }
    }
    return _db
}