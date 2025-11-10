import { Router } from 'express';
const router = Router();
router.post('/ideas',(req,res)=>{
  const { region='TR', seeds=['ai','technology'] } = req.body||{};
  const ideas = seeds.slice(0,5).map((s,i)=>({ title:`${s} Trend ${i+1}`, description:`Auto idea for ${s}`, tags:[s,region], score: Math.round(60+Math.random()*40)}));
  res.json({ ok:true, ideas });
});
export default router;
