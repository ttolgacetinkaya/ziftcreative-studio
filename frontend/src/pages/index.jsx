
import Link from 'next/link';
export default function Home(){
  return <div className="container">
    <h2>Ziftcreative AI Studio v6.4</h2>
    <div className="card">
      <p>Welcome. Choose a module:</p>
      <p><a className="link" href="/setup">→ Setup Wizard</a></p>
      <p><a className="link" href="/channels">→ Channels</a></p>
      <p><a className="link" href="/studio">→ Studio Analytics</a></p>
      <p><a className="link" href="/optimize">→ Optimize Suite</a></p>
      <p><a className="link" href="/agency">→ Agency Mode</a></p>
      <p><a className="link" href="/dashboard">→ Dashboard</a></p>
    </div>
  </div>;
}
