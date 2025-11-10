
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { get, post } from '../utils/api';

export default function Setup(){
  const [keys,setKeys]=useState({OPENAI_API_KEY:'',PEXELS_API_KEY:'',GOOGLE_CLIENT_ID:'',GOOGLE_CLIENT_SECRET:'',ELEVENLABS_API_KEY:''});
  const [status,setStatus]=useState(null);
  useEffect(()=>{ (async()=>setStatus(await get('/setup/status')))(); },[]);
  const save=async()=>{ await post('/setup/keys',keys); const r=await post('/setup/test',keys); if(r.ok) window.location.href='/channels'; };
  return <Layout>
    <div className="grid grid-2">
      <div className="card">
        <div className="section-title">Kurulum Sihirbazı</div>
        {Object.keys(keys).map(k=>(
          <div key={k} style={{marginBottom:10}}>
            <label style={{display:'block',fontSize:12,opacity:.8,marginBottom:6}}>{k}</label>
            <input className="input" value={keys[k]} onChange={e=>setKeys({...keys,[k]:e.target.value})} placeholder={`Enter ${k}`}/>
          </div>
        ))}
        <button className="btn" onClick={save}>Kaydet & Test Et</button>
      </div>
      <div className="card">
        <div className="section-title">Uyumluluk Merkezi</div>
        <ul>
          <li>• COPPA, Telifsiz medya, güvenli seslendirme</li>
          <li>• Otomatik açıklama / kaynak bildirimi</li>
          <li>• Planlı yayın ve içerik denetimi</li>
        </ul>
      </div>
    </div>
  </Layout>;
}
