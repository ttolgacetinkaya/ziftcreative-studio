
import { useEffect, useState } from 'react';
import { get, post } from '../utils/api';
const Step=({n,label,active})=>(<div style={{display:'flex',gap:8,marginBottom:8,opacity:active?1:.6}}><div style={{width:22,height:22,borderRadius:999,background:'#6b46c1',display:'grid',placeItems:'center'}}>{n}</div><div>{label}</div></div>);
export default function Setup(){
  const [step,setStep]=useState(1); const [keys,setKeys]=useState({OPENAI_API_KEY:'',PEXELS_API_KEY:'',GOOGLE_CLIENT_ID:'',GOOGLE_CLIENT_SECRET:'',ELEVENLABS_API_KEY:''}); const [res,setRes]=useState(null);
  useEffect(()=>{(async()=>{await get('/setup/status');})()},[]);
  const save=async()=>{ const r=await post('/setup/keys',keys); if(r.ok) setStep(3); };
  const test=async()=>{ const r=await post('/setup/test',keys); setRes(r); setStep(r.ok?4:2); };
  return <div className="container"><h2>Setup Wizard</h2><div className="card">
    <Step n={1} label="Welcome" active={step>=1}/><Step n={2} label="API Keys" active={step>=2}/><Step n={3} label="Test" active={step>=3}/><Step n={4} label="Finish" active={step>=4}/>
  </div>
  {step===1&&<div className="card"><p>Welcome to Ziftcreative Full Suite installer.</p><button className="btn" onClick={()=>setStep(2)}>Start</button></div>}
  {step===2&&<div className="card"><h3>Enter Keys</h3>{Object.keys(keys).map(k=>(<div key={k} style={{marginBottom:8}}><label>{k}</label><input className="input" value={keys[k]} onChange={e=>setKeys({...keys,[k]:e.target.value})}/></div>))}
    <div style={{display:'flex',gap:10}}><button className="btn" onClick={save}>Save</button><button className="btn" onClick={test}>Save & Test</button></div></div>}
  {step===3&&<div className="card"><h3>Test Result</h3><pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(res,null,2)}</pre><button className="btn" onClick={()=>setStep(4)}>Continue</button></div>}
  {step===4&&<div className="card"><h3>Finish</h3><a className="btn" href="/channels">Go to Channels</a></div>}
  </div>;
}
