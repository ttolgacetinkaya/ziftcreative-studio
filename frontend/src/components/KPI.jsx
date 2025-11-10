
export default function KPI({label,value,delta}){
  return <div className="card stat">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    {delta && <div className="badge" style={{background:'rgba(34,197,94,.15)',border:'1px solid rgba(34,197,94,.3)'}}>▲ {delta}</div>}
  </div>;
}
