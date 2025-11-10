import { Router } from 'express';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();
const db = new Database(process.env.DB_PATH || './zift.db');
const r = Router();
db.exec(`CREATE TABLE IF NOT EXISTS tenants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, plan TEXT DEFAULT 'starter', status TEXT DEFAULT 'active', api_quota INTEGER DEFAULT 10000, created_at TEXT DEFAULT (datetime('now')) )`);
db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, tenant_id INTEGER, email TEXT, role TEXT DEFAULT 'admin', password_hash TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now')) )`);
r.post('/create', (req,res)=>{
  const { name, email, plan='starter' } = req.body||{};
  const info = db.prepare('INSERT INTO tenants (name, email, plan) VALUES (?,?,?)').run(name,email,plan);
  res.json({ ok:true, tenant_id: info.lastInsertRowid });
});
r.get('/list', (req,res)=>{
  const rows = db.prepare('SELECT * FROM tenants ORDER BY id DESC').all();
  res.json({ ok:true, tenants: rows });
});
r.post('/user/create', (req,res)=>{
  const { tenant_id, email, role='admin' } = req.body||{};
  const info = db.prepare('INSERT INTO users (tenant_id, email, role) VALUES (?,?,?)').run(tenant_id,email,role);
  res.json({ ok:true, user_id: info.lastInsertRowid });
});
export default r;
