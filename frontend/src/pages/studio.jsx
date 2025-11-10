
import { useEffect, useState } from 'react';
import { get } from '../utils/api';
export default function Studio(){
  const [data,setData]=useState(null);
  useEffect(()=>{(async()=>setData(await get('/studio/analytics')))();},[]);
  return <div className="container">
    <h2>Studio Analytics</h2>
    <div className="card">{!data?'Loading...':<pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(data,null,2)}</pre>}</div>
  </div>;
}
