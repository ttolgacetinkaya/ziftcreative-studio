import { Router } from 'express';
const router = Router();
router.post('/generate',(req,res)=>{
  const topic=(req.body&&req.body.topic)||'AI News';
  res.json({ ok:true, content:`[TITLE]: ${topic}\n[DESCRIPTION]: Demo desc\n[TAGS]: ai,news\n[SCRIPT]: Demo script...` });
});
export default router;
