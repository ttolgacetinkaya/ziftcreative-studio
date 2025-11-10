import { Router } from 'express'; import fs from 'fs'; import path from 'path';
const router = Router(); const envPath = path.join(process.cwd(),'backend','.env');
const readEnv=()=> fs.existsSync(envPath)?fs.readFileSync(envPath,'utf8'):'';
router.get('/status',(req,res)=>res.json({ok:true, envExists: fs.existsSync(envPath)}));
router.post('/keys',(req,res)=>{ let t=readEnv(); for(const [k,v] of Object.entries(req.body||{})){ const re=new RegExp('^'+k+'=.*$','m'); const line=k+'='+(v||''); t=re.test(t)?t.replace(re,line):(t?(t+'\n'+line):line); } if(!/PORT=/.test(t)) t+='\nPORT=5000'; fs.writeFileSync(envPath,t); res.json({ok:true}); });
router.post('/test',(req,res)=>{ const k=req.body||{}; const ok=!!k.OPENAI_API_KEY; res.json({ok, results:{openai:!!k.OPENAI_API_KEY}}); });
router.get('/finish',(req,res)=>res.json({ok:true,next:'/dashboard'}));
export default router;
