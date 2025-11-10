import { Router } from 'express';
import { getDB } from '../models/db.js';
const router = Router();
router.get('/', (req,res)=>{
  const rows = getDB().prepare('SELECT * FROM channels ORDER BY id DESC').all();
  res.json({ ok:true, channels: rows.map(r=>({...r, ai_profile: JSON.parse(r.ai_profile||'{}')})) });
});
router.post('/', (req,res)=>{
  const db = getDB();
  const { name, lang='tr', region='TR', theme='news', schedule='', ai_profile={}, status='active' } = req.body||{};
  const info = db.prepare('INSERT INTO channels (name, lang, region, theme, schedule, ai_profile, status) VALUES (?,?,?,?,?,?,?)')
    .run(name, lang, region, theme, schedule, JSON.stringify(ai_profile||{}), status);
  const row = db.prepare('SELECT * FROM channels WHERE id=?').get(info.lastInsertRowid);
  res.json({ ok:true, channel: { ...row, ai_profile: JSON.parse(row.ai_profile||'{}') } });
});
router.get('/:id', (req,res)=>{
  const db = getDB();
  const row = db.prepare('SELECT * FROM channels WHERE id=?').get(req.params.id);
  if(!row) return res.status(404).json({ ok:false, error:'not found'});
  res.json({ ok:true, channel: { ...row, ai_profile: JSON.parse(row.ai_profile||'{}') } });
});
router.put('/:id', (req,res)=>{
  const db = getDB();
  const old = db.prepare('SELECT * FROM channels WHERE id=?').get(req.params.id);
  if(!old) return res.status(404).json({ ok:false, error:'not found'});
  const merged = { ...old, ...req.body, ai_profile: JSON.stringify(req.body.ai_profile ?? JSON.parse(old.ai_profile||'{}')) };
  db.prepare(`UPDATE channels SET name=@name, lang=@lang, region=@region, theme=@theme, schedule=@schedule, ai_profile=@ai_profile, status=@status, updated_at=datetime('now') WHERE id=@id`)
    .run({ ...merged, id: req.params.id });
  const row = db.prepare('SELECT * FROM channels WHERE id=?').get(req.params.id);
  res.json({ ok:true, channel: { ...row, ai_profile: JSON.parse(row.ai_profile||'{}') } });
});
router.delete('/:id', (req,res)=>{
  getDB().prepare('DELETE FROM channels WHERE id=?').run(req.params.id);
  res.json({ ok:true });
});
export default router;
