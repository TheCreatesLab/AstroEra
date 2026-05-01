import { useState } from "react";
import Head from "next/head";

const SIGNS = [
  { n: "Aries", s: "♈", d: "Mar 21–Apr 19" },
  { n: "Taurus", s: "♉", d: "Apr 20–May 20" },
  { n: "Gemini", s: "♊", d: "May 21–Jun 20" },
  { n: "Cancer", s: "♋", d: "Jun 21–Jul 22" },
  { n: "Leo", s: "♌", d: "Jul 23–Aug 22" },
  { n: "Virgo", s: "♍", d: "Aug 23–Sep 22" },
  { n: "Libra", s: "♎", d: "Sep 23–Oct 22" },
  { n: "Scorpio", s: "♏", d: "Oct 23–Nov 21" },
  { n: "Sagittarius", s: "♐", d: "Nov 22–Dec 21" },
  { n: "Capricorn", s: "♑", d: "Dec 22–Jan 19" },
  { n: "Aquarius", s: "♒", d: "Jan 20–Feb 18" },
  { n: "Pisces", s: "♓", d: "Feb 19–Mar 20" },
];

const REVIEWS = [
  { text: "I opened it at 2am when I was completely spiralling. Read my Scorpio reading and actually cried. It said exactly what I needed to hear.", name: "Sia A.", sign: "Scorpio · Mumbai, India", initials: "SA", grad: "linear-gradient(135deg,#7C3AED,#FF2D78)" },
  { text: "The compatibility reading about me and my ex was uncomfortably accurate. Showed my friends and we were all shook. This is now part of my morning routine.", name: "Emma W.", sign: "Libra · London, UK", initials: "EW", grad: "linear-gradient(135deg,#0EA5E9,#6366F1)" },
  { text: "The birth chart reading genuinely changed how I understand myself. My therapist and I have been unpacking it for weeks. Best $29 I've ever spent.", name: "Jasmine K.", sign: "Pisces · Toronto, Canada", initials: "JK", grad: "linear-gradient(135deg,#FF2D78,#FFB800)" },
];

const SHOP = [
  { name: "Rose Quartz Crystal Set", price: "$24", tag: "Love & Harmony", icon: "💎", bg: "rgba(255,45,120,.07)" },
  { name: "Rider-Waite Tarot Deck", price: "$18", tag: "Bestseller", icon: "🃏", bg: "rgba(168,85,247,.07)" },
  { name: "The Astrology Bible", price: "$22", tag: "Top Rated", icon: "📖", bg: "rgba(255,184,0,.07)" },
  { name: "Co-Star Premium", price: "$2.99/mo", tag: "App of the Year", icon: "✨", bg: "rgba(0,229,204,.06)" },
];

const FEATURES = [
  { icon: "🗺️", t: "Full Natal Chart", d: "Every planet decoded — not just the sun sign everyone knows" },
  { icon: "💞", t: "Venus & Love Forecast", d: "Why you attract who you attract — and how to change it" },
  { icon: "💼", t: "Career & Saturn Return", d: "Whether your Saturn return is coming and how to prepare" },
  { icon: "🌙", t: "30-Day Energy Forecast", d: "When to act, when to wait — mapped to your personal chart" },
];

const LABELS = ["Today's Energy", "Love & Connection", "Work & Abundance"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Poppins',sans-serif;background:#0F0820;color:#FFF2FF;overflow-x:hidden}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes twinkle{0%,100%{opacity:.12;transform:scale(1)}50%{opacity:.7;transform:scale(1.3)}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-thumb{background:#3A2760;border-radius:3px}
  select option{background:#1F1040}
`;

export default function Home() {
  const [sign, setSign] = useState(null);
  const [horo, setHoro] = useState("");
  const [horoLoading, setHoroLoading] = useState(false);
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [compat, setCompat] = useState("");
  const [compatLoading, setCompatLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [modal, setModal] = useState(false);
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bSign, setBSign] = useState("");
  const [booked, setBooked] = useState(false);

  const selectSign = async (s) => {
    setSign(s);
    setHoro("");
    setHoroLoading(true);
    try {
      const r = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign: s.n, type: "daily" }),
      });
      const d = await r.json();
      setHoro(d.horoscope);
    } catch { setHoro("The stars are aligning... please try again."); }
    setHoroLoading(false);
    setTimeout(() => document.getElementById("horo-s")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const doCompat = async () => {
    if (!c1 || !c2) return;
    setCompat(""); setCompatLoading(true);
    try {
      const r = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign: `${c1} and ${c2}`, type: "compatibility" }),
      });
      const d = await r.json();
      setCompat(d.horoscope);
    } catch { setCompat("The stars are aligning... please try again."); }
    setCompatLoading(false);
  };

  const renderHoro = () => {
    if (!horo) return null;
    const paras = horo.split("\n").filter(Boolean);
    let li = 0;
    return paras.map((p, i) => {
      if (p.startsWith("Today's Mantra")) {
        return <div key={i} style={{ background: "rgba(255,184,0,.06)", border: "1px solid rgba(255,184,0,.18)", borderLeft: "2.5px solid #FFB800", borderRadius: "0 12px 12px 0", padding: "14px 18px", fontSize: 14, color: "#FFB800", fontStyle: "italic", fontWeight: 400, lineHeight: 1.6, marginTop: 4 }}>{p}</div>;
      }
      const label = LABELS[li];
      li++;
      return <div key={i}>{label && <span style={{ display: "block", fontSize: 10, color: "#C084FC", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 5, marginTop: li > 1 ? 6 : 0 }}>{label}</span>}<p style={{ marginBottom: 16, fontSize: 15, color: "#CDB8F0", lineHeight: 1.92, fontWeight: 300 }}>{p}</p></div>;
    });
  };

  const s = { color: "#7A5FA0" };
  const card = { background: "#1A0D35", border: "1px solid rgba(180,120,255,.12)", borderRadius: 24 };

  return (
    <>
      <Head>
        <title>AstroEra – Daily Horoscopes, Compatibility & Astrology Readings</title>
        <meta name="description" content="Get your free daily horoscope, birth chart reading, and compatibility check. Professional astrology for every zodiac sign." />
        <meta name="keywords" content="daily horoscope, astrology, zodiac, horoscope today, aries horoscope, taurus horoscope, scorpio horoscope, birth chart, compatibility" />
        <meta property="og:title" content="AstroEra – Your Daily Cosmic Guide" />
        <meta property="og:description" content="Professional astrology readings, daily horoscopes and compatibility — made for your generation." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✦</text></svg>" />
      </Head>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,8,32,.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(180,120,255,.12)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#FF2D78)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
          <span style={{ fontFamily: "'Rozha One',serif", fontSize: 21, color: "#FFF2FF", letterSpacing: .5 }}>AstroEra</span>
        </div>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {["Daily|horo-s", "Compatibility|compat-s", "Reviews|review-s", "Shop|shop-s"].map(item => {
            const [label, id] = item.split("|");
            return <a key={label} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: 13, color: "#7A5FA0", textDecoration: "none", cursor: "pointer", fontWeight: 400 }}>{label}</a>;
          })}
          <button onClick={() => setModal(true)} style={{ background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 100, padding: "9px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Get my reading ✦</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "96vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "88px 24px 56px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.28) 0%,transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,45,120,.22) 0%,transparent 68%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,.1)", border: "1px solid rgba(168,85,247,.25)", borderRadius: 100, padding: "7px 20px", marginBottom: 30 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A855F7", animation: "glow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>Your questions have cosmic answers</span>
        </div>

        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(48px,8vw,94px)", lineHeight: 1.02, letterSpacing: -1, margin: "0 0 6px", maxWidth: 750 }}>
          <span style={{ color: "#FFF2FF", display: "block" }}>You're not lost.</span>
          <span style={{ display: "block", background: "linear-gradient(135deg,#A855F7 0%,#FF2D78 45%,#FFB800 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200%", animation: "shimmer 5s ease infinite" }}>You're mid-chapter.</span>
        </h1>

        <p style={{ fontSize: 16, color: "#CDB8F0", lineHeight: 1.8, maxWidth: 500, margin: "22px auto 0", fontWeight: 300 }}>
          When everything feels uncertain, your chart knows what's next. <strong style={{ color: "#FFF2FF", fontWeight: 500 }}>Daily readings</strong>, compatibility, and personalised guidance — from astrologers who actually get your generation.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "36px 0 44px", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("horo-s")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 100, padding: "15px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", boxShadow: "0 6px 28px rgba(168,85,247,.35)" }}>Read my horoscope</button>
          <button onClick={() => setModal(true)} style={{ background: "rgba(255,255,255,.04)", color: "#CDB8F0", border: "1px solid rgba(180,120,255,.25)", borderRadius: 100, padding: "15px 28px", fontSize: 15, fontWeight: 400, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Book a full reading</button>
        </div>

        <p style={{ fontSize: 11, color: "#7A5FA0", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>↓ pick your sign</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9, maxWidth: 610, width: "100%" }}>
          {SIGNS.map((sg, i) => (
            <button key={sg.n} onClick={() => selectSign(sg)} style={{ background: sign?.n === sg.n ? "rgba(168,85,247,.14)" : "rgba(255,255,255,.03)", border: `1px solid ${sign?.n === sg.n ? "rgba(168,85,247,.4)" : "rgba(180,120,255,.12)"}`, borderRadius: 15, padding: "13px 6px", cursor: "pointer", transition: "all .18s", fontFamily: "'Poppins',sans-serif" }}>
              <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{sg.s}</span>
              <span style={{ fontSize: 10, color: sign?.n === sg.n ? "#C084FC" : "#7A5FA0", fontWeight: 400 }}>{sg.n}</span>
            </button>
          ))}
        </div>

        <div style={{ overflow: "hidden", width: "100%", maxWidth: 610, marginTop: 32, borderTop: "1px solid rgba(180,120,255,.12)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 32, animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
            {["Stop overthinking", "The stars know", "Your era is coming", "Trust your process", "You're not behind", "It all makes sense", "Stop overthinking", "The stars know", "Your era is coming", "Trust your process", "You're not behind", "It all makes sense"].map((m, i) => (
              <span key={i} style={{ fontSize: 11, color: "#7A5FA0", letterSpacing: 2, textTransform: "uppercase", fontWeight: 400 }}>✦ {m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: "#170C2E", borderTop: "1px solid rgba(180,120,255,.12)", borderBottom: "1px solid rgba(180,120,255,.12)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
        {[["⭐", "4.9/5", "average rating"], ["🔮", "2.4M+", "readings delivered"], ["💜", "94%", "say it felt accurate"], ["✦", "Daily", "content by professionals"]].map(([icon, strong, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#7A5FA0", fontWeight: 400 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span><strong style={{ color: "#CDB8F0", fontWeight: 600 }}>{strong}</strong> {label}</span>
          </div>
        ))}
      </div>

      {/* HOROSCOPE */}
      <section id="horo-s" style={{ background: "#0F0820", padding: "88px 24px" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500, display: "block", textAlign: "center", marginBottom: 10 }}>Today's Reading</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(34px,5.5vw,56px)", textAlign: "center", color: "#FFF2FF", lineHeight: 1.08, letterSpacing: -.3 }}>What the cosmos is telling you</h2>
        <p style={{ textAlign: "center", fontSize: 15, color: "#7A5FA0", margin: "10px 0 40px", fontWeight: 300 }}>Your planets are always talking. Here's what they said today.</p>

        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          {SIGNS.map(sg => (
            <button key={sg.n} onClick={() => selectSign(sg)} style={{ background: sign?.n === sg.n ? "rgba(168,85,247,.1)" : "rgba(255,255,255,.03)", border: `1px solid ${sign?.n === sg.n ? "rgba(168,85,247,.35)" : "rgba(180,120,255,.12)"}`, borderRadius: 100, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 400, fontFamily: "'Poppins',sans-serif", color: sign?.n === sg.n ? "#C084FC" : "#7A5FA0", transition: "all .15s" }}>{sg.s} {sg.n}</button>
          ))}
        </div>

        {!sign && <div style={{ textAlign: "center", padding: "52px 0", color: "#7A5FA0", fontSize: 14, fontWeight: 300 }}>🌙<br /><br />Pick your sign above<br />Your daily reading loads in seconds</div>}

        {sign && (
          <div style={{ ...card, padding: 42, maxWidth: 700, margin: "0 auto", animation: "fadeUp .4s ease", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#A855F7,#FF2D78,#FFB800,transparent)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 17, marginBottom: 30 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(168,85,247,.09)", border: "1px solid rgba(168,85,247,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>{sign.s}</div>
              <div>
                <div style={{ fontFamily: "'Rozha One',serif", fontSize: 30, color: "#FFF2FF", letterSpacing: -.2 }}>{sign.n}</div>
                <div style={{ fontSize: 12, color: "#7A5FA0", marginTop: 4, fontWeight: 300 }}>{sign.d} · Today's reading</div>
              </div>
            </div>
            {horoLoading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ display: "inline-block", width: 26, height: 26, border: "2px solid rgba(168,85,247,.15)", borderTopColor: "#A855F7", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                <p style={{ color: "#7A5FA0", marginTop: 14, fontSize: 13, fontWeight: 300 }}>Our astrologers are reading your chart...</p>
              </div>
            ) : <div>{renderHoro()}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
              <button onClick={() => setModal(true)} style={{ background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 100, padding: "11px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Get my full birth chart — $29</button>
              <button style={{ background: "rgba(255,255,255,.03)", color: "#7A5FA0", border: "1px solid rgba(180,120,255,.12)", borderRadius: 100, padding: "11px 18px", fontSize: 13, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Share this reading ↗</button>
            </div>
          </div>
        )}
      </section>

      {/* COMPATIBILITY */}
      <section id="compat-s" style={{ background: "#170C2E", padding: "88px 24px" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500, display: "block", textAlign: "center", marginBottom: 10 }}>Compatibility</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(34px,5.5vw,56px)", textAlign: "center", color: "#FFF2FF", lineHeight: 1.08 }}>Is it written in the stars?</h2>
        <p style={{ textAlign: "center", fontSize: 15, color: "#7A5FA0", margin: "10px 0 40px", fontWeight: 300 }}>Stop guessing. Find out what the planets actually say.</p>
        <div style={{ ...card, padding: 32, maxWidth: 600, margin: "0 auto", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#FF2D78,#FFB800,transparent)" }} />
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            {[{ val: c1, set: setC1 }, { val: c2, set: setC2 }].map((item, i) => (
              <>
                {i === 1 && <span key="div" style={{ fontSize: 22, color: "#FF2D78", flexShrink: 0 }}>♥</span>}
                <select key={i} value={item.val} onChange={e => item.set(e.target.value)} style={{ flex: 1, minWidth: 140, fontFamily: "'Poppins',sans-serif", fontSize: 14, padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(180,120,255,.12)", background: "#1F1040", color: "#FFF2FF", cursor: "pointer", outline: "none", fontWeight: 300 }}>
                  <option value="">{i === 0 ? "Your sign" : "Their sign"}</option>
                  {SIGNS.map(sg => <option key={sg.n} value={sg.n}>{sg.s} {sg.n}</option>)}
                </select>
              </>
            ))}
          </div>
          <button onClick={doCompat} disabled={!c1 || !c2 || compatLoading} style={{ width: "100%", background: c1 && c2 ? "linear-gradient(135deg,#7C3AED,#FF2D78)" : "rgba(255,255,255,.06)", color: c1 && c2 ? "#fff" : "#7A5FA0", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 600, cursor: c1 && c2 ? "pointer" : "default", fontFamily: "'Poppins',sans-serif", transition: "all .2s" }}>
            {compatLoading ? "Consulting the stars..." : "Reveal our compatibility ✦"}
          </button>
          {compatLoading && <div style={{ textAlign: "center", padding: "28px 0" }}><div style={{ display: "inline-block", width: 24, height: 24, border: "2px solid rgba(168,85,247,.15)", borderTopColor: "#A855F7", borderRadius: "50%", animation: "spin .7s linear infinite" }} /></div>}
          {compat && !compatLoading && (
            <div style={{ marginTop: 22, animation: "fadeUp .4s ease" }}>
              <div style={{ display: "inline-block", background: "rgba(255,45,120,.1)", border: "1px solid rgba(255,45,120,.2)", borderRadius: 100, padding: "4px 14px", fontSize: 11, color: "#FF2D78", fontWeight: 600, marginBottom: 14 }}>✦ {c1} × {c2}</div>
              {compat.split("\n").filter(Boolean).map((line, i) => (
                <p key={i} style={{ marginBottom: 10, fontSize: line.includes("/10") ? 40 : 14, fontFamily: line.includes("/10") ? "'Rozha One',serif" : "'Poppins',sans-serif", background: line.includes("/10") ? "linear-gradient(135deg,#A855F7,#FF2D78,#FFB800)" : "none", WebkitBackgroundClip: line.includes("/10") ? "text" : "unset", WebkitTextFillColor: line.includes("/10") ? "transparent" : "unset", color: line.includes("/10") ? "transparent" : "#CDB8F0", lineHeight: 1.85, fontWeight: line.includes("/10") ? 900 : 300 }}>{line.replace(/\*\*/g, "")}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="review-s" style={{ background: "#0F0820", padding: "88px 24px" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500, display: "block", textAlign: "center", marginBottom: 10 }}>Real Reviews</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(34px,5.5vw,56px)", textAlign: "center", color: "#FFF2FF", lineHeight: 1.08 }}>They came for the horoscope.<br />Stayed for the clarity.</h2>
        <p style={{ textAlign: "center", fontSize: 15, color: "#7A5FA0", margin: "10px 0 36px", fontWeight: 300 }}>Over 2.4 million readings. Here's what people actually said.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, maxWidth: 860, margin: "0 auto" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ ...card, padding: 24 }}>
              <div style={{ color: "#FFD60A", fontSize: 13, marginBottom: 10, letterSpacing: 1 }}>★★★★★</div>
              <p style={{ fontSize: 13, color: "#CDB8F0", lineHeight: 1.75, fontWeight: 300, marginBottom: 16, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: r.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff", flexShrink: 0 }}>{r.initials}</div>
                <div><span style={{ fontSize: 13, fontWeight: 500, color: "#FFF2FF", display: "block" }}>{r.name}</span><span style={{ fontSize: 11, color: "#7A5FA0" }}>{r.sign}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: "#170C2E", borderTop: "1px solid rgba(180,120,255,.12)", borderBottom: "1px solid rgba(180,120,255,.12)", padding: "56px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, maxWidth: 640, margin: "0 auto" }}>
          {[["2.4M", "readings delivered", "linear-gradient(135deg,#A855F7,#FF2D78,#FFB800)"], ["94%", "felt it was accurate", "linear-gradient(135deg,#C084FC,#FDA4AF)"], ["4.9★", "average rating", "linear-gradient(135deg,#FFB800,#FF2D78)"]].map(([num, label, grad], i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 20px", borderRight: i < 2 ? "1px solid rgba(180,120,255,.12)" : "none" }}>
              <span style={{ fontFamily: "'Rozha One',serif", fontSize: 52, lineHeight: 1, display: "block", background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{num}</span>
              <span style={{ fontSize: 13, color: "#7A5FA0", marginTop: 7, fontWeight: 300 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.14),rgba(255,45,120,.09),rgba(255,184,0,.06))", borderTop: "1px solid rgba(180,120,255,.12)", borderBottom: "1px solid rgba(180,120,255,.12)", padding: "92px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(168,85,247,.09)", border: "1px solid rgba(168,85,247,.2)", borderRadius: 100, padding: "5px 16px", marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: "#C084FC", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>Free weekly readings</span>
        </div>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,5.5vw,52px)", color: "#FFF2FF", margin: "14px 0 10px", letterSpacing: -.3, lineHeight: 1.1 }}>Your week, <em style={{ color: "#C084FC" }}>decoded</em><br />before it begins</h2>
        <p style={{ fontSize: 15, color: "#7A5FA0", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.7, fontWeight: 300 }}>Every Sunday morning — what energy is coming, where to push, when to rest. 47,000 people already start their week with it.</p>
        {subbed ? (
          <div style={{ background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.18)", borderRadius: 12, padding: "16px 28px", color: "#C084FC", fontSize: 14, fontWeight: 500, maxWidth: 420, margin: "0 auto" }}>✦ You're in. See you Sunday morning.</div>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, minWidth: 180, background: "rgba(255,255,255,.05)", border: "1px solid rgba(180,120,255,.25)", borderRadius: 12, padding: "13px 18px", color: "#FFF2FF", fontSize: 14, outline: "none", fontFamily: "'Poppins',sans-serif", fontWeight: 300 }} />
            <button onClick={() => email && setSubbed(true)} style={{ background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Poppins',sans-serif" }}>Get it free</button>
          </div>
        )}
        <p style={{ fontSize: 11, color: "#3A2760", marginTop: 12 }}>Unsubscribe anytime. It's actually good, we promise.</p>
      </div>

      {/* PREMIUM */}
      <section style={{ background: "#0F0820", padding: "88px 24px" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500, display: "block", textAlign: "center", marginBottom: 10 }}>Premium</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(34px,5.5vw,56px)", textAlign: "center", color: "#FFF2FF", lineHeight: 1.08, marginBottom: 40 }}>Go deeper than your daily</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 880, margin: "0 auto", alignItems: "start" }}>
          <div style={{ background: "linear-gradient(145deg,rgba(124,58,237,.18),rgba(255,45,120,.1))", border: "1px solid rgba(168,85,247,.22)", borderRadius: 24, padding: 42, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#A855F7,#FF2D78,#FFB800)" }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,184,0,.1)", border: "1px solid rgba(255,184,0,.22)", borderRadius: 100, padding: "4px 13px", marginBottom: 14, fontSize: 10, color: "#FFB800", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>✦ Most popular</div>
            <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 30, color: "#FFF2FF", marginBottom: 12, lineHeight: 1.2 }}>Full Birth Chart Reading</h3>
            <p style={{ fontSize: 13, color: "#CDB8F0", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>Your sun sign is just the beginning. We decode your rising, moon, Venus and Mars — what your chart says about who you are, why you love the way you do, and where you're going next.</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
              <span style={{ fontFamily: "'Rozha One',serif", fontSize: 44, color: "#FFF2FF" }}>$29</span>
              <span style={{ fontSize: 13, color: "#7A5FA0" }}>one-time · delivered in 24hrs</span>
            </div>
            <button onClick={() => setModal(true)} style={{ width: "100%", background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Book my reading ✦</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ ...card, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(168,85,247,.09)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{f.icon}</div>
                <div><div style={{ fontSize: 13, fontWeight: 500, color: "#FFF2FF", marginBottom: 3 }}>{f.t}</div><div style={{ fontSize: 12, color: "#7A5FA0", lineHeight: 1.45, fontWeight: 300 }}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop-s" style={{ background: "#170C2E", padding: "88px 24px" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500, display: "block", textAlign: "center", marginBottom: 10 }}>Cosmic Shop</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(34px,5.5vw,56px)", textAlign: "center", color: "#FFF2FF", lineHeight: 1.08, marginBottom: 28 }}>Tools for the intentional</h2>
        <div style={{ background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.07)", borderRadius: 12, padding: "14px 20px", margin: "0 auto 28px", maxWidth: 860, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#3A2760" }}>📢 Your Google AdSense code goes here</span>
          <span style={{ fontSize: 10, color: "#3A2760" }}>728×90</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: 14, maxWidth: 860, margin: "0 auto" }}>
          {SHOP.map((item, i) => (
            <div key={i} style={{ ...card, overflow: "hidden", cursor: "pointer", transition: "all .2s" }}>
              <div style={{ height: 118, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{item.icon}</div>
              <div style={{ padding: "14px 16px" }}>
                <span style={{ background: "rgba(168,85,247,.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, color: "#C084FC", fontWeight: 600, display: "inline-block", marginBottom: 8, letterSpacing: .5 }}>{item.tag}</span>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#FFF2FF", marginBottom: 10, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#FF2D78" }}>{item.price}</span>
                  <button style={{ background: "rgba(168,85,247,.1)", color: "#C084FC", border: "1px solid rgba(168,85,247,.2)", borderRadius: 8, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 500 }}>Shop →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#170C2E", borderTop: "1px solid rgba(180,120,255,.12)", padding: "52px 24px 28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 42 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg,#7C3AED,#FF2D78)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#FFF2FF", letterSpacing: .3 }}>AstroEra</span>
              </div>
              <p style={{ fontSize: 12, color: "#7A5FA0", maxWidth: 220, lineHeight: 1.6, marginTop: 8, fontWeight: 300 }}>For the overthinkers, the seekers, and the ones who just need to know it's going to be okay.</p>
            </div>
            {[{ title: "Explore", links: ["Daily Horoscope", "Compatibility", "Birth Chart", "Tarot"] }, { title: "Company", links: ["About", "Privacy Policy", "Terms", "Affiliate Disclosure"] }].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: "#3A2760", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{col.title}</div>
                {col.links.map(l => <span key={l} style={{ fontSize: 12, color: "#7A5FA0", display: "block", marginBottom: 8, cursor: "pointer", fontWeight: 300 }}>{l}</span>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(180,120,255,.12)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#3A2760" }}>© 2026 AstroEra · For entertainment purposes</span>
            <span style={{ fontSize: 11, color: "#3A2760" }}>Made with ✦ for the ones still figuring it out</span>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.75)", backdropFilter: "blur(14px)", padding: 20 }}>
          <div style={{ background: "#170C2E", border: "1px solid rgba(168,85,247,.22)", borderRadius: 26, padding: 40, maxWidth: 420, width: "100%", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,.5)" }}>
            <div style={{ position: "absolute", top: 0, left: 28, right: 28, height: 2, background: "linear-gradient(90deg,transparent,#A855F7,#FF2D78,transparent)" }} />
            <button onClick={() => setModal(false)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,.04)", border: "1px solid rgba(180,120,255,.12)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#7A5FA0", fontSize: 14, fontFamily: "'Poppins',sans-serif" }}>✕</button>
            {booked ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,rgba(124,58,237,.2),rgba(255,45,120,.2))", border: "1px solid rgba(168,85,247,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 18px" }}>✦</div>
                <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 26, color: "#FFF2FF", marginBottom: 10 }}>You're booked, {bName}.</h3>
                <p style={{ fontSize: 14, color: "#7A5FA0", lineHeight: 1.6, fontWeight: 300 }}>Your reading lands in your inbox within 24 hours. The stars are already working on it.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 28, color: "#FFF2FF", margin: "0 0 4px" }}>Book your reading</h3>
                <p style={{ fontSize: 13, color: "#7A5FA0", marginBottom: 24, fontWeight: 300 }}>Full birth chart · Personalised · Delivered in 24hrs · $29</p>
                {[{ label: "Your name", val: bName, set: setBName, ph: "e.g. Priya" }, { label: "Email address", val: bEmail, set: setBEmail, ph: "you@email.com" }].map((f, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: "#7A5FA0", display: "block", marginBottom: 6, letterSpacing: .5, fontWeight: 500 }}>{f.label}</label>
                    <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: "100%", background: "#1F1040", border: "1px solid rgba(180,120,255,.12)", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#FFF2FF", outline: "none", fontFamily: "'Poppins',sans-serif", fontWeight: 300 }} />
                  </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#7A5FA0", display: "block", marginBottom: 6, letterSpacing: .5, fontWeight: 500 }}>Your sun sign</label>
                  <select value={bSign} onChange={e => setBSign(e.target.value)} style={{ width: "100%", background: "#1F1040", border: "1px solid rgba(180,120,255,.12)", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: bSign ? "#FFF2FF" : "#7A5FA0", outline: "none", fontFamily: "'Poppins',sans-serif" }}>
                    <option value="">Select your sign</option>
                    {SIGNS.map(sg => <option key={sg.n} value={sg.n}>{sg.s} {sg.n}</option>)}
                  </select>
                </div>
                <button onClick={() => bName && bEmail && bSign && setBooked(true)} style={{ width: "100%", background: "linear-gradient(135deg,#7C3AED,#FF2D78)", color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", marginTop: 10 }}>Confirm & Pay $29 ✦</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
