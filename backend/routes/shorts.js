import { Router } from 'express';
const router = Router();
router.post('/build',(req,res)=> res.json({ ok:true, message:'Short created (stub).' }));
export default router;
