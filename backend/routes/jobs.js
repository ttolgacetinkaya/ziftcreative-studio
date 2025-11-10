import { Router } from 'express';
import { getDB } from '../models/db.js';
const router = Router();
router.get('/', (req,res)=>{
  const rows = getDB().prepare('SELECT * FROM jobs ORDER BY id DESC LIMIT 200').all();
  res.json({ ok:true, jobs: rows });
});
router.post('/', (req,res)=>{
  const db = getDB();
  const { channel_id, type='long', payload={} } = req.body||{};
  const info = db.prepare('INSERT INTO jobs (channel_id, type, state, payload) VALUES (?,?,?,?)')
    .run(channel_id, type, 'planned', JSON.stringify(payload||{}));
  const row = db.prepare('SELECT * FROM jobs WHERE id=?').get(info.lastInsertRowid);
  res.json({ ok:true, job: row });
});
router.put('/:id/state', (req,res)=>{
  const db = getDB();
  const { state, error='' } = req.body||{};
  db.prepare('UPDATE jobs SET state=?, error=?, updated_at=datetime('now') WHERE id=?').run(state, error, req.params.id);
  const row = db.prepare('SELECT * FROM jobs WHERE id=?').get(req.params.id);
  res.json({ ok:true, job: row });
});
export default router;
