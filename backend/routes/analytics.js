import { Router } from 'express';
const router = Router();
router.get('/kpis', (req,res)=>{
  const now=Date.now(); const days=[...Array(7)].map((_,i)=>{ const d=new Date(now-(6-i)*86400000); return { date:d.toISOString().slice(0,10), views:Math.round(250+Math.random()*400), revenue:+(3+Math.random()*4).toFixed(2) }; });
  res.json({ ok:true, days });
});
export default router;
