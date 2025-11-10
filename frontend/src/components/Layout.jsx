
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Layout({children}){
  const { pathname } = useRouter();
  const NavLink = ({href,label}) => <Link href={href} className={pathname===href?'active':''}><span>{label}</span></Link>
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand"><span className="brand-dot"/>Ziftcreative <span style={{opacity:.6}}>Studio</span></div>
        <nav className="nav">
          <NavLink href="/dashboard" label="Gösterge Tablosu" />
          <NavLink href="/channels" label="Kanal Bağlantısı" />
          <NavLink href="/setup" label="Kurulum Sihirbazı" />
          <NavLink href="/studio" label="Senaryo & Üretim" />
          <NavLink href="/optimize" label="Yayınlama Planlayıcı" />
          <NavLink href="/agency" label="Uyumluluk Merkezi" />
        </nav>
        <div style={{position:'absolute',bottom:16,left:16,right:16,opacity:.7,fontSize:12}}>v7.0 Pro UI</div>
      </aside>
      <main>
        <div className="topbar">
          <div className="search"><span>⌘K</span><input className="input" placeholder="Komut Paleti"/></div>
          <div className="flex right"><span className="badge">Prod</span></div>
        </div>
        <div style={{padding:'18px 20px'}}>{children}</div>
      </main>
    </div>
  );
}
