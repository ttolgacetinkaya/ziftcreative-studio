
export default function Card({title,action,children}){
  return <div className="card">
    <div className="flex" style={{justifyContent:'space-between',marginBottom:12}}>
      <div className="section-title">{title}</div>
      {action}
    </div>
    <div>{children}</div>
  </div>;
}
