
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get, post, del } from '../utils/api';
export default function Channels(){
  const [rows,setRows]=useState(null);
  const [name,setName]=useState('AI News TR');
  const [lang,setLang]=useState('tr'); const [region,setRegion]=useState('TR'); const [theme,setTheme]=useState('news');
  const load=async()=>{ const r=await get('/channels'); setRows(r.channels||[]); };
  useEffect(()=>{ load(); },[]);
  const create=async()=>{ await post('/channels',{name,lang,region,theme,ai_profile:{voice:'male',tone:'informative'}}); setName(''); load(); };
  const remove=async(id)=>{ await del('/channels/'+id); load(); };
  return <div className="container">
    <h2>Channels</h2>
    <div className="card grid grid-2">
      <div>
        <label>Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} />
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <input className="input" placeholder="lang" value={lang} onChange={e=>setLang(e.target.value)} />
          <input className="input" placeholder="region" value={region} onChange={e=>setRegion(e.target.value)} />
          <input className="input" placeholder="theme" value={theme} onChange={e=>setTheme(e.target.value)} />
        </div>
        <button className="btn" style={{marginTop:10}} onClick={create}>Create</button>
      </div>
      <div>
        {!rows?'Loading...':<table className="table">
          <thead><tr><th>Name</th><th>Lang</th><th>Region</th><th>Theme</th><th/></tr></thead>
          <tbody>{rows.map(ch=>(<tr key={ch.id}>
            <td><Link className="link" href={`/channels/${ch.id}`}>{ch.name}</Link></td>
            <td>{ch.lang}</td><td>{ch.region}</td><td>{ch.theme}</td>
            <td><button className="btn" onClick={()=>remove(ch.id)}>Delete</button></td>
          </tr>))}</tbody>
        </table>}
      </div>
    </div>
  </div>;
}
