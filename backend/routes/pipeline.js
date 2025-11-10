import { Router } from 'express';
const router = Router();
router.post('/run',(req,res)=> res.json({ ok:true, message:'Pipeline started (stub).' }));
export default router;
