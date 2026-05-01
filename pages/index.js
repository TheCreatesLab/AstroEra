import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import BookingModal from "../components/BookingModal";
import { SIGNS, SIGN_COLORS, GRAD, GLOBAL_CSS } from "../lib/constants";

const REVIEWS = [
  { text: "I opened it at 2am when I was completely spiralling. Read my Scorpio reading and actually cried. It said exactly what I needed to hear.", name: "Sia A.", sign: "Scorpio · Mumbai", initials: "SA", color: "#FF6CAB" },
  { text: "The compatibility reading about me and my ex was uncomfortably accurate. Showed my friends and we were all shook. This is now part of my morning routine.", name: "Emma W.", sign: "Libra · London", initials: "EW", color: "#7C6AFA" },
  { text: "The birth chart reading genuinely changed how I understand myself. My therapist and I have been unpacking it for weeks. Best $29 I ever spent.", name: "Jasmine K.", sign: "Pisces · Toronto", initials: "JK", color: "#FF9F7F" },
];

const FEATURES = [
  { icon: "🗺️", t: "Full Natal Chart", d: "Every planet decoded — not just the sun sign everyone knows" },
  { icon: "💞", t: "Venus & Love Forecast", d: "Why you attract who you attract — and how to change it" },
  { icon: "💼", t: "Career & Saturn Return", d: "Whether your Saturn return is coming and how to prepare" },
  { icon: "🌙", t: "30-Day Energy Forecast", d: "When to act, when to wait — mapped to your personal chart" },
];

const SHOP = [
  { name: "Rose Quartz Crystal Set", price: "$24", tag: "Love & Harmony", icon: "💎", bg: "#FFE8F0" },
  { name: "Rider-Waite Tarot Deck", price: "$18", tag: "Bestseller", icon: "🃏", bg: "#EDE8FF" },
  { name: "The Astrology Bible", price: "$22", tag: "Top Rated", icon: "📖", bg: "#FFF3E0" },
  { name: "Co-Star Premium", price: "$2.99/mo", tag: "App of the Year", icon: "✨", bg: "#E8FFF5" },
];

const LABELS = ["Today's Energy", "Love & Connection", "Work & Abundance"];

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

  const selectSign = async (s) => {
    setSign(s); setHoro(""); setHoroLoading(true);
    try {
      const r = await fetch("/api/horoscope", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sign: s.n, type: "daily" }) });
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
      const r = await fetch("/api/horoscope", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sign: `${c1} and ${c2}`, type: "compatibility" }) });
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
        return <div key={i} style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1px solid #E8C8F0", borderLeft: "3px solid #C084FC", borderRadius: "0 12px 12px 0", padding: "14px 18px", fontSize: 14, color: "#7C3AED", fontStyle: "italic", fontWeight: 500, lineHeight: 1.6, marginTop: 8 }}>{p}</div>;
      }
      const label = LABELS[li]; li++;
      return <div key={i}>{label && <span style={{ display: "block", fontSize: 10, color: "#C084FC", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 5, marginTop: li > 1 ? 10 : 0 }}>{label}</span>}<p style={{ marginBottom: 14, fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 300 }}>{p}</p></div>;
    });
  };

  const card = { background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 24, boxShadow: "0 8px 40px rgba(192,132,252,.07)" };

  return (
    <>
      <Head>
        <title>AstroEra – Free Daily Horoscopes, Compatibility & Astrology Readings</title>
        <meta name="description" content="Get your free daily horoscope, weekly horoscope, compatibility and birth chart. Professional astrology for every zodiac sign." />
        <meta name="keywords" content="daily horoscope, free horoscope, astrology, zodiac, horoscope today, weekly horoscope, birth chart, compatibility, tarot, mercury retrograde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://astroera.live/" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✦</text></svg>" />
      </Head>
      <style>{GLOBAL_CSS}</style>
      <Nav onBook={() => setModal(true)} />

      <section style={{ background: "linear-gradient(160deg,#FFF5F0 0%,#FFF0F8 40%,#F5EEFF 70%,#EEFFF8 100%)", padding: "72px 20px 56px", textAlign: "center", position: "relative", overflow: "hidden", width: "100%" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,108,171,.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,108,171,.08)", border: "1px solid rgba(255,108,171,.2)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6CAB" }} />
          <span style={{ fontSize: 11, color: "#FF6CAB", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Your questions have cosmic answers</span>
        </div>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(38px,8vw,80px)", lineHeight: 1.05, letterSpacing: -1, margin: "0 0 8px", color: "#1A0530" }}>
          You're not lost.<br />
          <span style={{ background: "linear-gradient(135deg,#FF6CAB,#C084FC,#FF9F7F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>You're mid-chapter.</span>
        </h1>
        <p style={{ fontSize: "clamp(14px,3.5vw,16px)", color: "#5A3A7A", lineHeight: 1.8, maxWidth: 480, margin: "18px auto 0", fontWeight: 300 }}>
          When everything feels uncertain, your chart knows what's next. <strong style={{ color: "#1A0530", fontWeight: 600 }}>Daily readings</strong>, compatibility, and guidance from astrologers who get your generation.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "28px auto 24px", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("horo-s")?.scrollIntoView({ behavior: "smooth" })} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", boxShadow: "0 6px 24px rgba(255,108,171,.3)" }}>Read my horoscope</button>
          <button onClick={() => setModal(true)} style={{ background: "#fff", color: "#5A3A7A", border: "1.5px solid #E8C8F0", borderRadius: 100, padding: "13px 24px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Book a full reading</button>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {[["🌙 Moon Phase","/moon-phase-today"],["☿ Planets","/planets-in-retrograde"],["🃏 Tarot","/tarot-card-of-the-day"],["📅 Weekly","/weekly-horoscope/aries"],["📆 Monthly","/monthly-horoscope/aries"],["⬆️ Rising Sign","/rising-sign/aries"]].map(([label,href]) => (
            <Link key={label} href={href} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #E8C8F0", borderRadius: 100, padding: "6px 14px", fontSize: 12, color: "#5A3A7A", textDecoration: "none", fontWeight: 500 }}>{label}</Link>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#C8A8D8", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>↓ pick your sign</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, maxWidth: 520, margin: "0 auto", width: "100%" }}>
          {SIGNS.map((sg, i) => (
            <button key={sg.n} onClick={() => selectSign(sg)} style={{ background: sign?.n === sg.n ? "#1A0530" : SIGN_COLORS[i], border: "none", borderRadius: 14, padding: "11px 4px", cursor: "pointer", transition: "all .18s", fontFamily: "'Poppins',sans-serif" }}>
              <span style={{ fontSize: 17, display: "block", marginBottom: 3 }}>{sg.s}</span>
              <span style={{ fontSize: 10, color: sign?.n === sg.n ? "#fff" : "#5A3A7A", fontWeight: 500 }}>{sg.n}</span>
            </button>
          ))}
        </div>
        <div style={{ overflow: "hidden", width: "100%", maxWidth: 520, margin: "24px auto 0", borderTop: "1px solid #F0E0EC", paddingTop: 14 }}>
          <div style={{ display: "flex", gap: 28, animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
            {["Your era is coming","Trust the process","You're not behind","It all makes sense","Your era is coming","Trust the process","You're not behind","It all makes sense"].map((m, i) => (
              <span key={i} style={{ fontSize: 11, color: "#C8A8D8", letterSpacing: 2, textTransform: "uppercase", fontWeight: 400 }}>✦ {m}</span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "#fff", borderTop: "1px solid #F0E8F4", borderBottom: "1px solid #F0E8F4", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px,4vw,36px)", flexWrap: "wrap", width: "100%" }}>
        {[["⭐","4.9/5","rating"],["🔮","2.4M+","readings"],["💜","94%","accuracy"],["✦","Daily","by professionals"]].map(([icon,strong,label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A7AAA" }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span><strong style={{ color: "#3D1F5C", fontWeight: 600 }}>{strong}</strong> {label}</span>
          </div>
        ))}
      </div>

      <section id="horo-s" style={{ background: "#FFFAF5", padding: "64px 20px", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, display: "block", textAlign: "center", marginBottom: 8 }}>Today's Reading</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", textAlign: "center", color: "#1A0530", lineHeight: 1.1, marginBottom: 8 }}>What the cosmos is telling you</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "#9A7AAA", marginBottom: 28, fontWeight: 300 }}>Your planets are always talking. Here's what they said today.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
          {SIGNS.map((sg, i) => (
            <button key={sg.n} onClick={() => selectSign(sg)} style={{ background: sign?.n === sg.n ? "#1A0530" : SIGN_COLORS[i], border: "none", borderRadius: 100, padding: "7px 13px", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "'Poppins',sans-serif", color: sign?.n === sg.n ? "#fff" : "#5A3A7A", transition: "all .15s" }}>{sg.s} {sg.n}</button>
          ))}
        </div>
        {!sign && <div style={{ textAlign: "center", padding: "44px 0", color: "#C8A8D8", fontSize: 14, fontWeight: 300 }}>🌙<br /><br />Pick your sign — your reading loads in seconds</div>}
        {sign && (
          <div style={{ ...card, padding: "clamp(20px,5vw,40px)", maxWidth: 680, margin: "0 auto", animation: "fadeUp .4s ease", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#C084FC,#FF9F7F)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: SIGN_COLORS[SIGNS.findIndex(s=>s.n===sign.n)], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{sign.s}</div>
              <div>
                <div style={{ fontFamily: "'Rozha One',serif", fontSize: 24, color: "#1A0530" }}>{sign.n} Daily Horoscope</div>
                <div style={{ fontSize: 12, color: "#9A7AAA", marginTop: 3, fontWeight: 300 }}>{sign.d} · Today</div>
              </div>
            </div>
            {horoLoading ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ display: "inline-block", width: 26, height: 26, border: "2.5px solid #F0E0EC", borderTopColor: "#C084FC", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                <p style={{ color: "#B8A0C8", marginTop: 12, fontSize: 13, fontWeight: 300 }}>Our astrologers are reading your chart...</p>
              </div>
            ) : <div>{renderHoro()}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
              <button onClick={() => setModal(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "11px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Get my birth chart — $29</button>
              {sign && <Link href={`/weekly-horoscope/${sign.n.toLowerCase()}`} style={{ background: "#FFFAF5", color: "#9A7AAA", border: "1.5px solid #F0E0EC", borderRadius: 100, padding: "11px 16px", fontSize: 13, textDecoration: "none", fontFamily: "'Poppins',sans-serif" }}>Weekly reading →</Link>}
            </div>
          </div>
        )}
      </section>

      <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", borderTop: "1px solid #F0E0EC", borderBottom: "1px solid #F0E0EC", padding: "32px 20px", width: "100%" }}>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(22px,4vw,32px)", color: "#1A0530", textAlign: "center", marginBottom: 20 }}>Explore AstroEra</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, maxWidth: 860, margin: "0 auto" }}>
          {[{icon:"🌙",label:"Moon Phase Today",href:"/moon-phase-today",desc:"Current lunar energy"},{icon:"☿",label:"Planets Retrograde",href:"/planets-in-retrograde",desc:"What's moving & how"},{icon:"🃏",label:"Daily Tarot",href:"/tarot-card-of-the-day",desc:"Your card of the day"},{icon:"📅",label:"Weekly Horoscope",href:"/weekly-horoscope/aries",desc:"This week's forecast"},{icon:"📆",label:"Monthly Horoscope",href:"/monthly-horoscope/aries",desc:"Full month ahead"},{icon:"⬆️",label:"Rising Sign",href:"/rising-sign/aries",desc:"Your ascendant"}].map((item,i) => (
            <Link key={i} href={item.href} style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 16, padding: "16px 14px", textAlign: "center", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A0530", marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "#9A7AAA", fontWeight: 300 }}>{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <section id="compat-s" style={{ background: "#FFFAF5", padding: "64px 20px", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, display: "block", textAlign: "center", marginBottom: 8 }}>Compatibility</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", textAlign: "center", color: "#1A0530", lineHeight: 1.1, marginBottom: 8 }}>Is it written in the stars?</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "#9A7AAA", marginBottom: 32, fontWeight: 300 }}>Stop guessing. Find out what the planets actually say.</p>
        <div style={{ ...card, padding: "clamp(20px,5vw,32px)", maxWidth: 560, margin: "0 auto", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#FF9F7F)" }} />
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <select value={c1} onChange={e => setC1(e.target.value)} style={{ flex: 1, minWidth: 120, fontFamily: "'Poppins',sans-serif", fontSize: 14, padding: "12px 12px", borderRadius: 12, border: "1.5px solid #F0E0EC", background: "#FFFAF5", color: "#1A0530", cursor: "pointer", outline: "none" }}>
              <option value="">Your sign</option>
              {SIGNS.map(sg => <option key={sg.n} value={sg.n}>{sg.s} {sg.n}</option>)}
            </select>
            <span style={{ fontSize: 18, color: "#FF6CAB", flexShrink: 0 }}>♥</span>
            <select value={c2} onChange={e => setC2(e.target.value)} style={{ flex: 1, minWidth: 120, fontFamily: "'Poppins',sans-serif", fontSize: 14, padding: "12px 12px", borderRadius: 12, border: "1.5px solid #F0E0EC", background: "#FFFAF5", color: "#1A0530", cursor: "pointer", outline: "none" }}>
              <option value="">Their sign</option>
              {SIGNS.map(sg => <option key={sg.n} value={sg.n}>{sg.s} {sg.n}</option>)}
            </select>
          </div>
          <button onClick={doCompat} disabled={!c1||!c2||compatLoading} style={{ width: "100%", background: c1&&c2 ? GRAD : "#F0E8F4", color: c1&&c2 ? "#fff" : "#B8A0C8", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 600, cursor: c1&&c2 ? "pointer" : "default", fontFamily: "'Poppins',sans-serif" }}>
            {compatLoading ? "Consulting the stars..." : "Reveal our compatibility ✦"}
          </button>
          {compatLoading && <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ display: "inline-block", width: 24, height: 24, border: "2.5px solid #F0E0EC", borderTopColor: "#C084FC", borderRadius: "50%", animation: "spin .7s linear infinite" }} /></div>}
          {compat && !compatLoading && (
            <div style={{ marginTop: 18, animation: "fadeUp .4s ease" }}>
              <div style={{ display: "inline-block", background: "#FFF0F7", border: "1px solid #FFD0E8", borderRadius: 100, padding: "4px 14px", fontSize: 11, color: "#FF6CAB", fontWeight: 600, marginBottom: 12 }}>✦ {c1} × {c2}</div>
              {compat.split("\n").filter(Boolean).map((line, i) => (
                <p key={i} style={{ marginBottom: 10, fontSize: line.includes("/10") ? 34 : 14, fontFamily: line.includes("/10") ? "'Rozha One',serif" : "'Poppins',sans-serif", color: line.includes("/10") ? "#FF6CAB" : "#3D1F5C", lineHeight: 1.8, fontWeight: line.includes("/10") ? 900 : 300 }}>{line.replace(/\*\*/g,"")}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="review-s" style={{ background: "linear-gradient(160deg,#FFF5FA,#F5EEFF)", padding: "64px 20px", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, display: "block", textAlign: "center", marginBottom: 8 }}>Real Reviews</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", textAlign: "center", color: "#1A0530", lineHeight: 1.1, marginBottom: 8 }}>They came for the horoscope.<br />Stayed for the clarity.</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "#9A7AAA", marginBottom: 32, fontWeight: 300 }}>Over 2.4 million readings. Here's what people said.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, maxWidth: 860, margin: "0 auto" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 20, padding: 22, boxShadow: "0 4px 20px rgba(192,132,252,.05)" }}>
              <div style={{ color: "#FFB347", fontSize: 13, marginBottom: 10, letterSpacing: 1 }}>★★★★★</div>
              <p style={{ fontSize: 13, color: "#5A3A7A", lineHeight: 1.75, fontWeight: 300, marginBottom: 16, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0 }}>{r.initials}</div>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#1A0530", display: "block" }}>{r.name}</span><span style={{ fontSize: 11, color: "#B8A0C8" }}>{r.sign}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#fff", borderTop: "1px solid #F0E0EC", borderBottom: "1px solid #F0E0EC", padding: "48px 20px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, maxWidth: 560, margin: "0 auto" }}>
          {[["2.4M","readings","#FF6CAB"],["94%","accurate","#C084FC"],["4.9★","rating","#FF9F7F"]].map(([num,label,color],i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px 4px", borderRight: i < 2 ? "1px solid #F0E0EC" : "none" }}>
              <span style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,6vw,48px)", lineHeight: 1, display: "block", color: color }}>{num}</span>
              <span style={{ fontSize: 12, color: "#9A7AAA", marginTop: 5, fontWeight: 300, display: "block" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(160deg,#FFF5FA,#EEEAFF)", borderBottom: "1px solid #F0E0EC", padding: "64px 20px", textAlign: "center", width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,108,171,.08)", border: "1px solid rgba(255,108,171,.2)", borderRadius: 100, padding: "5px 16px", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: "#FF6CAB", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>Free weekly readings</span>
        </div>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", color: "#1A0530", margin: "10px 0 10px", lineHeight: 1.1 }}>Your week, <em style={{ fontStyle: "italic", color: "#C084FC" }}>decoded</em><br />before it begins</h2>
        <p style={{ fontSize: 14, color: "#9A7AAA", maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.7, fontWeight: 300 }}>Every Sunday morning — what's coming, where to push, when to rest. 47,000 people already start their week with it.</p>
        {subbed ? (
          <div style={{ background: "rgba(255,108,171,.08)", border: "1px solid rgba(255,108,171,.2)", borderRadius: 12, padding: "14px 24px", color: "#FF6CAB", fontSize: 14, fontWeight: 600, maxWidth: 360, margin: "0 auto" }}>✦ You're in. See you Sunday morning!</div>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, minWidth: 160, background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 12, padding: "12px 16px", color: "#1A0530", fontSize: 14, outline: "none", fontFamily: "'Poppins',sans-serif", fontWeight: 300 }} />
            <button onClick={() => email && setSubbed(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Poppins',sans-serif" }}>Get it free</button>
          </div>
        )}
        <p style={{ fontSize: 11, color: "#C8A8D8", marginTop: 10 }}>Unsubscribe anytime. It's actually good, we promise.</p>
      </div>

      <section style={{ background: "#FFFAF5", padding: "64px 20px", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, display: "block", textAlign: "center", marginBottom: 8 }}>Premium</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", textAlign: "center", color: "#1A0530", lineHeight: 1.1, marginBottom: 36 }}>Go deeper than your daily</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(145deg,#FFF0F7,#F5EEFF)", border: "1.5px solid #F0D0EC", borderRadius: 24, padding: "clamp(22px,5vw,38px)", position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(255,108,171,.08)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#C084FC,#FF9F7F)" }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,179,71,.12)", border: "1px solid rgba(255,179,71,.25)", borderRadius: 100, padding: "4px 12px", marginBottom: 12, fontSize: 10, color: "#D4821A", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>✦ Most popular</div>
            <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(22px,4vw,28px)", color: "#1A0530", marginBottom: 12, lineHeight: 1.2 }}>Full Birth Chart Reading</h3>
            <p style={{ fontSize: 13, color: "#5A3A7A", lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>Your sun sign is just the beginning. We decode your rising, moon, Venus and Mars — what your chart says about who you are, why you love the way you do, and where you're going.</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Rozha One',serif", fontSize: 40, color: "#1A0530" }}>$29</span>
              <span style={{ fontSize: 13, color: "#9A7AAA" }}>one-time · 24hrs</span>
            </div>
            <button onClick={() => setModal(true)} style={{ width: "100%", background: GRAD, color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Book my reading ✦</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: SIGN_COLORS[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{f.icon}</div>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: "#1A0530", marginBottom: 3 }}>{f.t}</div><div style={{ fontSize: 12, color: "#9A7AAA", lineHeight: 1.45, fontWeight: 300 }}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shop-s" style={{ background: "linear-gradient(160deg,#FFFAF5,#FFF5FA)", padding: "64px 20px", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, display: "block", textAlign: "center", marginBottom: 8 }}>Cosmic Shop</span>
        <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(26px,5vw,44px)", textAlign: "center", color: "#1A0530", lineHeight: 1.1, marginBottom: 24 }}>Tools for the intentional</h2>
        <div style={{ background: "rgba(192,132,252,.05)", border: "1px dashed #E0C8F0", borderRadius: 12, padding: "12px 16px", margin: "0 auto 24px", maxWidth: 860, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#C8A8D8" }}>📢 Your Google AdSense code goes here</span>
          <span style={{ fontSize: 10, color: "#D8C0E8" }}>728×90</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, maxWidth: 860, margin: "0 auto" }}>
          {SHOP.map((item, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 18, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 100, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{item.icon}</div>
              <div style={{ padding: "12px 14px" }}>
                <span style={{ background: "#F5EEFF", borderRadius: 100, padding: "3px 9px", fontSize: 10, color: "#C084FC", fontWeight: 600, display: "inline-block", marginBottom: 7 }}>{item.tag}</span>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1A0530", marginBottom: 8, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Rozha One',serif", fontSize: 16, color: "#FF6CAB" }}>{item.price}</span>
                  <button style={{ background: "#F5EEFF", color: "#C084FC", border: "none", borderRadius: 7, padding: "4px 10px", fontSize: 10, cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600 }}>Shop →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#1A0530", padding: "44px 20px 24px", width: "100%" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 36 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>✦</div>
                <span style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#FFF5FA" }}>AstroEra</span>
              </div>
              <p style={{ fontSize: 12, color: "#7A5A8A", maxWidth: 200, lineHeight: 1.6, marginTop: 8, fontWeight: 300 }}>For the overthinkers, the seekers, and the ones who just need to know it's going to be okay.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#3D1F5C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>Explore</div>
              {[["Daily Horoscope","/daily-horoscope/aries"],["Weekly Horoscope","/weekly-horoscope/aries"],["Monthly Horoscope","/monthly-horoscope/aries"],["Tarot Card of the Day","/tarot-card-of-the-day"],["Moon Phase Today","/moon-phase-today"],["Planets in Retrograde","/planets-in-retrograde"]].map(([label,href]) => (
                <Link key={label} href={href} style={{ fontSize: 12, color: "#7A5A8A", display: "block", marginBottom: 7, textDecoration: "none", fontWeight: 300 }}>{label}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#3D1F5C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>Company</div>
              {["About","Privacy Policy","Terms","Affiliate Disclosure"].map(l => <span key={l} style={{ fontSize: 12, color: "#7A5A8A", display: "block", marginBottom: 7, cursor: "pointer", fontWeight: 300 }}>{l}</span>)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #2A1040", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#3D2060" }}>© 2026 AstroEra · For entertainment purposes</span>
            <span style={{ fontSize: 11, color: "#3D2060" }}>Made with ✦ for the ones still figuring it out</span>
          </div>
        </div>
      </footer>

      <BookingModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}