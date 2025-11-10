import { Router } from 'express';
const r = Router();
r.get('/health', (req,res)=>{ res.json({ ok:true, node: process.env.NODE_NAME || 'render', cpu_usage: 'stub', queue_depth: 0 }); });
export default r;
