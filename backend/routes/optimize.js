import { Router } from 'express';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();
const db = new Database(process.env.DB_PATH || './zift.db');
const r = Router();
r.post('/ab/create', (req,res)=>{
  const { video_id, variants } = req.body||{};
  db.prepare(`CREATE TABLE IF NOT EXISTS ab_tests (id INTEGER PRIMARY KEY AUTOINCREMENT, video_id TEXT, variant JSON, status TEXT DEFAULT 'active', created_at TEXT DEFAULT (datetime('now')) )`).run();
  const stmt = db.prepare('INSERT INTO ab_tests (video_id, variant) VALUES (?,?)');
  for(const v of (variants||[])){ stmt.run(video_id, JSON.stringify(v)); }
  res.json({ ok:true });
});
r.post('/ab/choose', (req,res)=>{
  const { video_id } = req.body||{};
  res.json({ ok:true, winner:{ title:'Auto Winner Title', thumb_url:'https://example/winner.png' } });
});
r.post('/revenue/suggest', (req,res)=>{
  const { channel_id, video_id } = req.body||{};
  res.json({ ok:true, suggestion:{ title: '🔴 Breaking: AI Update You Must See', description: 'Today’s biggest AI update in 60 seconds. Sources inside.', tags: ['ai','update','shorts'] }});
});
r.post('/scheduler/best-time', (req,res)=>{
  const { region='TR', contentType='short' } = req.body||{};
  const hour = region==='US' ? '19:00-22:00' : (region==='TR' ? '19:00-21:00' : '18:00-22:00');
  res.json({ ok:true, window: hour, region, contentType });
});
r.post('/repurpose/shorts', (req,res)=>{
  const { video_id } = req.body||{};
  res.json({ ok:true, shorts: [{start:10, end:40},{start:65,end:95}] });
});
r.post('/affiliate/links', (req,res)=>{
  const { topic='tech' } = req.body||{};
  res.json({ ok:true, links: [ { label:'Amazon Bestseller', url:'https://amzn.to/xxx' }, { label:'Trendyol Popüler', url:'https://ty.gl/xxx' } ]});
});
export default r;
