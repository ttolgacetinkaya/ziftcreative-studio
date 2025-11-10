
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { get } from '../utils/api';
export default function Studio(){
  const [data,setData]=useState(null);
  useEffect(()=>{(async()=>setData(await get('/studio/analytics')))();},[]);
  return <Layout>
    <div className="section-title">Senaryo Üretimi & Analitik</div>
    <div className="card">{!data?'Yükleniyor...':<pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(data,null,2)}</pre>}</div>
  </Layout>;
}
