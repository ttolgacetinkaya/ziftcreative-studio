
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
async function post(p,b){const r=await fetch(`${BASE}${p}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b||{})});return r.json();}
async function get(p){const r=await fetch(`${BASE}${p}`);return r.json();}
import { useEffect, useState } from 'react';
export default function Agency(){
  const [tenants,setTenants]=useState([]);
  const load=async()=>{ const r=await get('/agency/tenant/list'); setTenants(r.tenants||[]); };
  useEffect(()=>{ load(); },[]);
  return <div className="container">
    <h2>Agency Mode</h2>
    <div className="card">
      <button className="btn" onClick={async()=>{await post('/agency/tenant/create',{name:'Client A', email:'client@example.com'}); load();}}>Create Tenant</button>
      <pre style={{whiteSpace:'pre-wrap',marginTop:12}}>{JSON.stringify(tenants,null,2)}</pre>
    </div>
  </div>;
}
