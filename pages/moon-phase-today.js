import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import BookingModal from "../components/BookingModal";
import { GRAD, GLOBAL_CSS } from "../lib/constants";

function getMoonPhase() {
  const phases = [
    { name: "New Moon", emoji: "🌑", illumination: "0%", meaning: "New beginnings. Plant seeds of intention. What do you want to call in this cycle?", energy: "Reset & Intention", advice: "Write down 3 intentions. Start something new. Rest and restore." },
    { name: "Waxing Crescent", emoji: "🌒", illumination: "25%", meaning: "Your intentions are taking root. Take small, consistent actions toward your goals.", energy: "Growth & Action", advice: "Take the first step. Make that call. Start building momentum." },
    { name: "First Quarter", emoji: "🌓", illumination: "50%", meaning: "Challenges arise to test your commitment. Push through resistance.", energy: "Determination", advice: "Face obstacles head-on. Make decisions. Don't give up now." },
    { name: "Waxing Gibbous", emoji: "🌔", illumination: "75%", meaning: "Refine and adjust your approach. You're so close — keep going.", energy: "Refinement", advice: "Edit your plans. Seek feedback. Polish what you've built." },
    { name: "Full Moon", emoji: "🌕", illumination: "100%", meaning: "Peak energy and illumination. Emotions run high. Release what no longer serves you.", energy: "Release & Clarity", advice: "Let go of what's holding you back. Celebrate your wins. Feel everything." },
    { name: "Waning Gibbous", emoji: "🌖", illumination: "75%", meaning: "Share your wisdom. Be grateful. Begin releasing.", energy: "Gratitude", advice: "Express thanks. Share with others. Begin to wind down." },
    { name: "Last Quarter", emoji: "🌗", illumination: "50%", meaning: "Release, forgive, and clear space for the new cycle ahead.", energy: "Release", advice: "Let go of grudges. Clear your space. Forgive yourself and others." },
    { name: "Waning Crescent", emoji: "🌘", illumination: "25%", meaning: "Rest, reflect, and surrender. The cycle is completing.", energy: "Rest & Surrender", advice: "Sleep more. Journal. Trust the process. A new moon is coming." },
  ];
  const lunarCycle = 29.53;
  const knownNew = new Date("2024-01-11").getTime();
  const now = Date.now();
  const daysSince = (now - knownNew) / (1000 * 60 * 60 * 24);
  const phase = ((daysSince % lunarCycle) / lunarCycle) * 8;
  return phases[Math.floor(phase) % 8];
}

export default function MoonPage() {
  const [modal, setModal] = useState(false);
  const moon = getMoonPhase();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <Head>
        <title>Moon Phase Today {today} – Current Moon Phase | AstroEra</title>
        <meta name="description" content={`The moon is in ${moon.name} phase today (${today}). Find out how today's moon phase affects your energy, emotions and decisions.`} />
        <meta name="keywords" content="moon phase today, current moon phase, what moon phase is today, moon phase calendar 2026, full moon 2026, new moon 2026, moon astrology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://astroera.live/moon-phase-today" />
      </Head>
      <style>{GLOBAL_CSS}</style>
      <Nav onBook={() => setModal(true)} />

      <section style={{ background: "linear-gradient(160deg,#0F0820,#1C0A3A,#2A1050)", padding: "60px 20px 48px", textAlign: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,132,252,.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <span style={{ fontSize: 11, color: "#C084FC", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Moon Phase</span>
        <div style={{ fontSize: 96, margin: "16px 0", animation: "float 4s ease-in-out infinite" }}>{moon.emoji}</div>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(28px,6vw,52px)", color: "#FFF5FA", margin: "0 0 8px", lineHeight: 1.1 }}>
          {moon.name}
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,245,250,0.6)", fontWeight: 300, marginBottom: 6 }}>{today}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(192,132,252,.15)", border: "1px solid rgba(192,132,252,.25)", borderRadius: 100, padding: "6px 18px", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: "#C084FC", fontWeight: 600 }}>Illumination: {moon.illumination}</span>
        </div>
      </section>

      <section style={{ background: "#FFFAF5", padding: "40px 20px", width: "100%" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 24, padding: "clamp(20px,5vw,36px)", boxShadow: "0 8px 40px rgba(192,132,252,.07)", position: "relative", overflow: "hidden", marginBottom: 24 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#C084FC,#FF6CAB)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ background: "#F5EEFF", borderRadius: 100, padding: "5px 16px", fontSize: 12, color: "#C084FC", fontWeight: 600 }}>{moon.energy}</div>
            </div>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 24, color: "#1A0530", marginBottom: 12 }}>Today's Moon Energy</h2>
            <p style={{ fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 300, marginBottom: 20 }}>{moon.meaning}</p>
            <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1px solid #E8C8F0", borderLeft: "3px solid #C084FC", borderRadius: "0 12px 12px 0", padding: "14px 18px" }}>
              <p style={{ fontSize: 13, color: "#7C3AED", fontWeight: 500 }}>✦ Today's guidance: {moon.advice}</p>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#1A0530", marginBottom: 16 }}>All Moon Phases & Their Meanings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { e: "🌑", name: "New Moon", m: "New beginnings, intentions, and fresh starts" },
                { e: "🌒", name: "Waxing Crescent", m: "Growth, taking action, building momentum" },
                { e: "🌓", name: "First Quarter", m: "Challenges, decisions, and determination" },
                { e: "🌔", name: "Waxing Gibbous", m: "Refinement, adjustment, and perseverance" },
                { e: "🌕", name: "Full Moon", m: "Peak energy, release, clarity, and emotions" },
                { e: "🌖", name: "Waning Gibbous", m: "Gratitude, sharing wisdom, and reflection" },
                { e: "🌗", name: "Last Quarter", m: "Release, forgiveness, and clearing space" },
                { e: "🌘", name: "Waning Crescent", m: "Rest, surrender, and quiet reflection" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: i < 7 ? "1px solid #F5EEF0" : "none" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{p.e}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 600, color: "#1A0530" }}>{p.name}</div><div style={{ fontSize: 12, color: "#9A7AAA", fontWeight: 300 }}>{p.m}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={() => setModal(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Get my birth chart — $29</button>
          </div>
        </div>
      </section>

      <footer style={{ background: "#1A0530", padding: "32px 20px", textAlign: "center" }}>
        <Link href="/" style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#FFF5FA", textDecoration: "none" }}>✦ AstroEra</Link>
        <p style={{ fontSize: 12, color: "#7A5A8A", marginTop: 8, fontWeight: 300 }}>© 2026 AstroEra · For entertainment purposes</p>
      </footer>
      <BookingModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
