
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { get, put, post } from '../../utils/api';
export default function ChannelDetail(){
  const router=useRouter(); const { id }=router.query;
  const [ch,setCh]=useState(null);
  const [name,setName]=useState(''); const [lang,setLang]=useState('tr'); const [region,setRegion]=useState('TR'); const [theme,setTheme]=useState('news');
  const [voice,setVoice]=useState('male'); const [tone,setTone]=useState('informative');
  const load=async()=>{ if(!id) return; const r=await get('/channels/'+id); setCh(r.channel); setName(r.channel.name); setLang(r.channel.lang); setRegion(r.channel.region); setTheme(r.channel.theme); const ai=r.channel.ai_profile||{}; setVoice(ai.voice||'male'); setTone(ai.tone||'informative'); };
  useEffect(()=>{ load(); },[id]);
  const save=async()=>{ await put('/channels/'+id,{name,lang,region,theme,ai_profile:{voice,tone}}); await load(); };
  const makeJob=async(type)=>{ await post('/jobs',{channel_id:parseInt(id,10),type,payload:{manual:true}}); alert('İş kuyruğa alındı: '+type); };
  return <Layout>
    {!ch?'Yükleniyor...':<div className="grid grid-2">
      <div className="card">
        <div className="section-title">Kanal Ayarları</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" value={lang} onChange={e=>setLang(e.target.value)} />
          <input className="input" value={region} onChange={e=>setRegion(e.target.value)} />
          <input className="input" value={theme} onChange={e=>setTheme(e.target.value)} />
          <input className="input" value={voice} onChange={e=>setVoice(e.target.value)} />
          <input className="input" value={tone} onChange={e=>setTone(e.target.value)} />
        </div>
        <div style={{marginTop:12}}><button className="btn" onClick={save}>Kaydet</button></div>
      </div>
      <div className="card">
        <div className="section-title">İçerik Oluştur</div>
        <div className="flex">
          <button className="btn" onClick={()=>makeJob('long')}>Uzun Video</button>
          <button className="btn" onClick={()=>makeJob('short')}>Shorts</button>
          <button className="btn" onClick={()=>makeJob('thumb')}>Kapak</button>
        </div>
      </div>
    </div>}
  </Layout>;
}
