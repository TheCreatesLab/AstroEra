import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import BookingModal from "../components/BookingModal";
import { GRAD, GLOBAL_CSS, PLANETS } from "../lib/constants";

export default function PlanetsPage() {
  const [modal, setModal] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <Head>
        <title>Planets in Retrograde 2026 – Mercury Retrograde Dates | AstroEra</title>
        <meta name="description" content="Find out which planets are in retrograde right now in 2026. Mercury retrograde dates, effects on all zodiac signs, and how planetary movements affect your life." />
        <meta name="keywords" content="planets in retrograde 2026, mercury retrograde 2026, mercury retrograde dates, planets retrograde today, mercury retrograde effects, retrograde planets astrology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://astroera.live/planets-in-retrograde" />
      </Head>
      <style>{GLOBAL_CSS}</style>
      <Nav onBook={() => setModal(true)} />

      <section style={{ background: "linear-gradient(160deg,#FFF5F0,#FFF0F8,#F5EEFF)", padding: "48px 20px 40px", textAlign: "center", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#FF6CAB", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Planetary Movement</span>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(28px,6vw,52px)", color: "#1A0530", margin: "10px 0 8px", lineHeight: 1.1 }}>Planets in Retrograde 2026</h1>
        <p style={{ fontSize: 14, color: "#9A7AAA", fontWeight: 300 }}>Current planetary status as of {today}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "20px 0 0", flexWrap: "wrap" }}>
          <div style={{ background: "#FFF0F7", border: "1px solid #FFD0E8", borderRadius: 100, padding: "6px 16px", fontSize: 12 }}><span style={{ color: "#FF6CAB", fontWeight: 600 }}>● Retrograde</span> — Moving backward</div>
          <div style={{ background: "#F0FFF5", border: "1px solid #B0F0CC", borderRadius: 100, padding: "6px 16px", fontSize: 12 }}><span style={{ color: "#2E9E5A", fontWeight: 600 }}>● Direct</span> — Moving forward</div>
        </div>
      </section>

      <section style={{ background: "#FFFAF5", padding: "40px 20px", width: "100%" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PLANETS.map((planet, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 20, padding: "clamp(16px,4vw,28px)", boxShadow: "0 4px 20px rgba(192,132,252,.05)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: planet.status === "Retrograde" ? "linear-gradient(180deg,#FF6CAB,#C084FC)" : "linear-gradient(180deg,#6EE7B7,#3B82F6)" }} />
                <div style={{ paddingLeft: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 28 }}>{planet.emoji}</span>
                      <div>
                        <div style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#1A0530" }}>{planet.name}</div>
                        <div style={{ fontSize: 12, color: "#9A7AAA", fontWeight: 300 }}>Rules: {planet.rules}</div>
                      </div>
                    </div>
                    <div style={{ background: planet.status === "Retrograde" ? "#FFF0F7" : "#F0FFF5", border: `1px solid ${planet.status === "Retrograde" ? "#FFD0E8" : "#B0F0CC"}`, borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: planet.status === "Retrograde" ? "#FF6CAB" : "#2E9E5A", whiteSpace: "nowrap" }}>
                      {planet.status === "Retrograde" ? "↩ Retrograde" : "→ Direct"}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#3D1F5C", lineHeight: 1.75, fontWeight: 300 }}>{planet.effect}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1.5px solid #E8C8F0", borderRadius: 20, padding: 24, marginTop: 36 }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 22, color: "#1A0530", marginBottom: 12 }}>What does Mercury Retrograde mean for you?</h2>
            <p style={{ fontSize: 14, color: "#3D1F5C", lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>Mercury retrograde affects communication, travel, and technology. It's not a time to sign contracts or make major decisions. Instead, use this period to review, reflect, and revisit unfinished business. Back up your phone. Re-read emails before sending. Give people extra grace.</p>
            <p style={{ fontSize: 14, color: "#3D1F5C", lineHeight: 1.8, fontWeight: 300 }}>The effects vary by zodiac sign. Your personal birth chart determines how strongly retrograde planets affect you — which is why a personalised reading is so valuable during these periods.</p>
            <button onClick={() => setModal(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", marginTop: 20 }}>Get my personalised reading — $29</button>
          </div>

          <div style={{ marginTop: 36 }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 22, color: "#1A0530", marginBottom: 16 }}>Read your daily horoscope</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map(sign => (
                <Link key={sign} href={`/daily-horoscope/${sign.toLowerCase()}`}
                  style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 100, padding: "7px 16px", fontSize: 12, fontWeight: 500, color: "#5A3A7A", textDecoration: "none" }}>{sign}</Link>
              ))}
            </div>
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
