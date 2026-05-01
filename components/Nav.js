import Link from "next/link";
import { useState } from "react";
import { GRAD } from "../lib/constants";

export default function Nav({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,250,245,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid #F0E0EC", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 60 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff" }}>✦</div>
            <span style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#1A0530" }}>AstroEra</span>
          </Link>
          <div className="desk-links" style={{ gap: 18, alignItems: "center" }}>
            {[
              ["Daily", "/daily-horoscope/aries"],
              ["Weekly", "/weekly-horoscope/aries"],
              ["Monthly", "/monthly-horoscope/aries"],
              ["Tarot", "/tarot-card-of-the-day"],
              ["Planets", "/planets-in-retrograde"],
              ["Moon", "/moon-phase-today"],
            ].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontSize: 13, color: "#7A5A8A", textDecoration: "none", fontWeight: 400 }}>{label}</Link>
            ))}
            <button onClick={onBook} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}>Book Reading ✦</button>
          </div>
          <button className="mob-cta" onClick={onBook} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}>Book ✦</button>
        </div>
      </nav>
    </>
  );
}
