
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function BarChartPanel({title,data}){
  return <div className="card">
    <div className="section-title">{title}</div>
    <div style={{height:220}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="x" tick={{fill:'#aeb8cc'}}/>
          <YAxis tick={{fill:'#aeb8cc'}}/>
          <Tooltip/>
          <Bar dataKey="y" fill="#6c5ce7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>;
}
