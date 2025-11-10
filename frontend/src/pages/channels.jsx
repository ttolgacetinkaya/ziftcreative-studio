
import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get, post, del } from '../utils/api';
export default function Channels(){
  const [rows,setRows]=useState(null);
  const [name,setName]=useState('AI Haber TR');
  const [lang,setLang]=useState('tr'); const [region,setRegion]=useState('TR'); const [theme,setTheme]=useState('news');
  const load=async()=>{ const r=await get('/channels'); setRows(r.channels||[]); };
  useEffect(()=>{ load(); },[]);
  const create=async()=>{ await post('/channels',{name,lang,region,theme,ai_profile:{voice:'male',tone:'informative'}}); setName(''); load(); };
  const remove=async(id)=>{ await del('/channels/'+id); load(); };
  return <Layout>
    <div className="grid grid-2">
      <div className="card">
        <div className="section-title">Kanal Bağlantısı</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <input className="input" placeholder="Kanal adı" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Dil" value={lang} onChange={e=>setLang(e.target.value)} />
          <input className="input" placeholder="Bölge" value={region} onChange={e=>setRegion(e.target.value)} />
          <input className="input" placeholder="Tema" value={theme} onChange={e=>setTheme(e.target.value)} />
        </div>
        <div style={{marginTop:12}}><button className="btn" onClick={create}>Kanalı Ekle</button></div>
      </div>
      <div className="card">
        <div className="section-title">Bağlı Kanallar</div>
        {!rows?'Yükleniyor...':<table className="table">
          <thead><tr><th>Ad</th><th>Dil</th><th>Bölge</th><th>Tema</th><th/></tr></thead>
          <tbody>{rows.map(ch=>(<tr key={ch.id}>
            <td><Link className="link" href={`/channels/${ch.id}`}>{ch.name}</Link></td>
            <td>{ch.lang}</td><td>{ch.region}</td><td>{ch.theme}</td>
            <td><button className="btn ghost" onClick={()=>remove(ch.id)}>Sil</button></td>
          </tr>))}</tbody>
        </table>}
      </div>
    </div>
  </Layout>;
}
