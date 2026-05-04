import Head from "next/head";
import Link from "next/link";
import { GLOBAL_CSS, GRAD } from "../lib/constants";

export default function About() {
  return (
    <>
      <Head>
        <title>About AstroEra | Professional Astrology Readings</title>
        <meta name="description" content="AstroEra is a professional astrology platform providing daily horoscopes, birth chart readings, compatibility and cosmic guidance for your generation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style>{GLOBAL_CSS}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,250,245,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid #F0E0EC", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 60 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff" }}>✦</div>
          <span style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#1A0530" }}>AstroEra</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: "#7A5A8A", textDecoration: "none" }}>← Back to home</Link>
      </nav>

      <section style={{ background: "linear-gradient(160deg,#FFF5F0,#FFF0F8,#F5EEFF)", padding: "72px 20px 56px", textAlign: "center", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#FF6CAB", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>About Us</span>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,6vw,56px)", color: "#1A0530", margin: "12px 0 16px", lineHeight: 1.1 }}>We believe your chart<br />holds the answers</h1>
        <p style={{ fontSize: 16, color: "#5A3A7A", lineHeight: 1.8, maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>AstroEra was built for the generation that actually reads their chart. Not because we think the stars control your fate — but because self-reflection, pattern recognition, and intentional living genuinely change lives.</p>
      </section>

      <section style={{ background: "#FFFAF5", padding: "64px 20px", width: "100%" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 56 }}>
            {[
              { icon: "🔮", title: "Our Mission", desc: "To make astrology accessible, meaningful and genuinely useful for modern life. We strip away the mysticism and deliver insights that actually resonate with who you are right now." },
              { icon: "✦", title: "Our Approach", desc: "Every reading on AstroEra is crafted with care by our team of professional astrologers. We combine traditional astrological wisdom with contemporary relevance — for the generation that's figuring it out." },
              { icon: "💜", title: "Our Values", desc: "Honesty, warmth, and real guidance. We don't tell you what you want to hear — we tell you what the stars are actually saying, even when that's a nudge to push harder or let go." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(192,132,252,.05)" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 22, color: "#1A0530", marginBottom: 10 }}>{item.title}</h2>
                <p style={{ fontSize: 14, color: "#5A3A7A", lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1.5px solid #E8C8F0", borderRadius: 24, padding: "clamp(24px,5vw,48px)", textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(24px,4vw,36px)", color: "#1A0530", marginBottom: 16 }}>For the overthinkers.<br />The seekers. The ones figuring it out.</h2>
            <p style={{ fontSize: 15, color: "#5A3A7A", lineHeight: 1.8, maxWidth: 500, margin: "0 auto 24px", fontWeight: 300 }}>Whether you check your horoscope every morning or you're just curious what all the fuss is about — AstroEra meets you where you are. No judgment, no pressure, just cosmic clarity.</p>
            <Link href="/" style={{ display: "inline-block", background: GRAD, color: "#fff", borderRadius: 100, padding: "13px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Read my horoscope ✦</Link>
          </div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 28, color: "#1A0530", marginBottom: 12 }}>Get in touch</h2>
            <p style={{ fontSize: 15, color: "#5A3A7A", lineHeight: 1.8, fontWeight: 300, marginBottom: 8 }}>We'd love to hear from you.</p>
            <a href="mailto:thecreateslab@gmail.com" style={{ color: "#C084FC", fontSize: 15, fontWeight: 500 }}>thecreateslab@gmail.com</a>
          </div>
        </div>
      </section>

      <footer style={{ background: "#1A0530", padding: "28px 20px", textAlign: "center" }}>
        <Link href="/" style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#FFF5FA", textDecoration: "none" }}>✦ AstroEra</Link>
        <p style={{ fontSize: 12, color: "#7A5A8A", marginTop: 8, fontWeight: 300 }}>© 2026 AstroEra · For entertainment purposes</p>
      </footer>
    </>
  );
}
