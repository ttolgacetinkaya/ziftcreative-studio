
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function AreaChartPanel({title,data}){
  return <div className="card">
    <div className="section-title">{title}</div>
    <div style={{height:220}}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="x" tick={{fill:'#aeb8cc'}}/>
          <YAxis tick={{fill:'#aeb8cc'}}/>
          <Tooltip/>
          <Area type="monotone" dataKey="y" stroke="#a78bfa" fill="url(#grad)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>;
}
