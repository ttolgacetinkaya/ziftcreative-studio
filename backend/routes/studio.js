import { Router } from 'express';
import { getDB } from '../models/db.js';
const router = Router();
router.get('/analytics', (req,res)=>{
  const db = getDB();
  const channels = db.prepare('SELECT id,name FROM channels ORDER BY id ASC').all();
  const today = new Date(); const days = []; for(let i=6;i>=0;i--){ const d = new Date(today.getTime()-i*86400000); days.push(d.toISOString().slice(0,10)); }
  const series = channels.map(ch=>({ name: ch.name, data: days.map(()=>Math.floor(200+Math.random()*300)) }));
  res.json({ ok:true, days, series });
});
export default router;
