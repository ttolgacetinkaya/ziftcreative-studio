
import { useState } from 'react';
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
async function post(p,b){const r=await fetch(`${BASE}${p}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b||{})});return r.json();}
export default function Optimize(){
  const [res,setRes]=useState(null);
  return <div className="container">
    <h2>Optimize Suite</h2>
    <div className="card">
      <button className="btn" onClick={async()=>setRes(await post('/optimize/revenue/suggest',{channel_id:1,video_id:'abc'}))}>Revenue Suggest</button>
      <button className="btn" style={{marginLeft:10}} onClick={async()=>setRes(await post('/optimize/scheduler/best-time',{region:'TR'}))}>Best Time</button>
      <button className="btn" style={{marginLeft:10}} onClick={async()=>setRes(await post('/optimize/affiliate/links',{topic:'tech'}))}>Affiliate Links</button>
      <pre style={{whiteSpace:'pre-wrap',marginTop:12}}>{JSON.stringify(res,null,2)}</pre>
    </div>
  </div>;
}
