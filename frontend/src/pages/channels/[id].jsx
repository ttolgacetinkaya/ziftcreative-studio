
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
  const makeJob=async(type)=>{ await post('/jobs',{channel_id:parseInt(id,10),type,payload:{manual:true}}); alert('Job queued: '+type); };
  return <div className="container">
    <h2>Channel Detail</h2>
    {!ch?'Loading...':<div className="card">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div><label>Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label>Lang</label><input className="input" value={lang} onChange={e=>setLang(e.target.value)} /></div>
        <div><label>Region</label><input className="input" value={region} onChange={e=>setRegion(e.target.value)} /></div>
        <div><label>Theme</label><input className="input" value={theme} onChange={e=>setTheme(e.target.value)} /></div>
        <div><label>Voice</label><input className="input" value={voice} onChange={e=>setVoice(e.target.value)} /></div>
        <div><label>Tone</label><input className="input" value={tone} onChange={e=>setTone(e.target.value)} /></div>
      </div>
      <button className="btn" style={{marginTop:10}} onClick={save}>Save</button>
      <hr/>
      <div style={{display:'flex',gap:10}}>
        <button className="btn" onClick={()=>makeJob('long')}>Queue Long Video</button>
        <button className="btn" onClick={()=>makeJob('short')}>Queue Shorts</button>
        <button className="btn" onClick={()=>makeJob('thumb')}>Queue Thumbnail</button>
      </div>
    </div>}
  </div>;
}
