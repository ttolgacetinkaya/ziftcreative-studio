import { Router } from 'express';
const r = Router();
r.post('/checkout-session', (req,res)=>{
  const { tenant_id, plan='pro' } = req.body||{};
  res.json({ ok:true, provider:'stripe', checkout_url:'https://checkout.example/' });
});
export default r;
