
import Layout from '../components/Layout';
import KPI from '../components/KPI';
import AreaChartPanel from '../components/AreaChartPanel';
import BarChartPanel from '../components/BarChartPanel';

const days = Array.from({length:12}, (_,i)=>({x:`Hafta ${i+1}`, y: Math.round(40+Math.random()*60)}));
const bars = Array.from({length:6}, (_,i)=>({x:['Pzt','Sal','Çar','Per','Cum','Cts'][i], y: Math.round(5+Math.random()*20)}));

export default function Dashboard(){
  return <Layout>
    <div className="grid grid-3">
      <KPI label="Toplam İzlenme" value="42.488" delta="%12.4" />
      <KPI label="İzlenme Süresi" value="4.3B dk" delta="%3.2" />
      <KPI label="RPM" value="₺11.98" />
      <KPI label="Abone" value="+1.284" delta="%5.1" />
    </div>
    <div style={{height:16}}/>
    <div className="hero">
      <AreaChartPanel title="İzlenme Trendi" data={days} />
      <BarChartPanel title="Yayın Günlerine Göre Performans" data={bars} />
    </div>
  </Layout>;
}
