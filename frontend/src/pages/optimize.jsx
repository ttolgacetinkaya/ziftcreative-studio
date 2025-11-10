
import Layout from '../components/Layout';
import { useState } from 'react';
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
async function post(p,b){const r=await fetch(`${BASE}${p}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b||{})});return r.json();}
export default function Optimize(){
  const [res,setRes]=useState(null);
  return <Layout>
    <div className="grid grid-2">
      <div className="card">
        <div className="section-title">Yayınlama Planlayıcı</div>
        <button className="btn" onClick={async()=>setRes(await post('/optimize/scheduler/best-time',{region:'TR'}))}>En İyi Saat</button>
        <div style={{height:8}}/>
        <button className="btn ghost" onClick={async()=>setRes(await post('/optimize/revenue/suggest',{channel_id:1,video_id:'abc'}))}>Başlık/Etiket Öner</button>
      </div>
      <div className="card">
        <div className="section-title">Sonuç</div>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(res,null,2)}</pre>
      </div>
    </div>
  </Layout>;
}
