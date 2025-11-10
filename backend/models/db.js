import Database from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();
let db = null;
export async function initDB(){
  db = new Database(process.env.DB_PATH || './zift.db');
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lang TEXT DEFAULT 'tr',
      region TEXT DEFAULT 'TR',
      theme TEXT DEFAULT 'news',
      schedule TEXT DEFAULT '',
      ai_profile TEXT DEFAULT '{}',
      youtube_tokens TEXT DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      state TEXT NOT NULL,
      payload TEXT DEFAULT '{}',
      error TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS analytics_daily (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      revenue REAL DEFAULT 0,
      subscribers INTEGER DEFAULT 0,
      UNIQUE(channel_id,date)
    );
  `);
}
export function getDB(){ return db; }
