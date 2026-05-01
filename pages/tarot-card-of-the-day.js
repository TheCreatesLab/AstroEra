import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import BookingModal from "../components/BookingModal";
import { SIGNS, GRAD, GLOBAL_CSS, TAROT_CARDS } from "../lib/constants";

export default function TarotPage() {
  const [modal, setModal] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [selectedSign, setSelectedSign] = useState(null);
  const [weeklyTarot, setWeeklyTarot] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const cardIndex = new Date().getDate() % TAROT_CARDS.length;
  const dailyCard = TAROT_CARDS[cardIndex];

  const getWeeklyTarot = async (sign) => {
    setSelectedSign(sign);
    setWeeklyTarot("");
    setLoading(true);
    try {
      const r = await fetch("/api/horoscope", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sign: sign.n, type: "tarot_weekly" }) });
      const d = await r.json();
      setWeeklyTarot(d.horoscope);
    } catch { setWeeklyTarot("The cards are aligning... please try again."); }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tarot Card of the Day {today} | Free Daily Tarot Reading | AstroEra</title>
        <meta name="description" content={`Get your free tarot card of the day for ${today}. Daily and weekly tarot readings for all zodiac signs from AstroEra's professional astrologers.`} />
        <meta name="keywords" content="tarot card of the day, daily tarot reading, free tarot reading, tarot horoscope, weekly tarot reading, tarot card today" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://astroera.live/tarot-card-of-the-day" />
      </Head>
      <style>{`${GLOBAL_CSS}
        .card-container { perspective: 1000px; width: 200px; height: 320px; margin: 0 auto; cursor: pointer; }
        .card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s ease; }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; display: flex; align-items: center; justify-content: center; flex-direction: column; }
        .card-front { background: linear-gradient(135deg, #2A0845, #6B1F8A); border: 2px solid rgba(192,132,252,0.4); }
        .card-back { background: linear-gradient(135deg, #FFF0F7, #F5EEFF); border: 2px solid #E8C8F0; transform: rotateY(180deg); }
      `}</style>
      <Nav onBook={() => setModal(true)} />

      <section style={{ background: "linear-gradient(160deg,#FFF5F0,#FFF0F8,#F5EEFF)", padding: "48px 20px 40px", textAlign: "center", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#FF6CAB", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Daily Tarot</span>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(28px,6vw,52px)", color: "#1A0530", margin: "10px 0 8px", lineHeight: 1.1 }}>Tarot Card of the Day</h1>
        <p style={{ fontSize: 14, color: "#9A7AAA", fontWeight: 300 }}>{today}</p>

        <div style={{ marginTop: 36 }}>
          <p style={{ fontSize: 13, color: "#9A7AAA", marginBottom: 20, fontWeight: 300 }}>
            {flipped ? "Your card has spoken ✦" : "Tap the card to reveal your daily message"}
          </p>
          <div className="card-container" onClick={() => setFlipped(!flipped)}>
            <div className={`card-inner ${flipped ? "flipped" : ""}`}>
              <div className="card-front">
                <div style={{ fontSize: 48, opacity: 0.6 }}>🌙</div>
                <div style={{ fontSize: 36, marginTop: 8 }}>✦</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 16, letterSpacing: 2 }}>TAP TO REVEAL</p>
              </div>
              <div className="card-back">
                <div style={{ fontSize: 52 }}>{dailyCard.emoji}</div>
                <div style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#1A0530", marginTop: 12, textAlign: "center", padding: "0 16px" }}>{dailyCard.name}</div>
              </div>
            </div>
          </div>

          {flipped && (
            <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 20, padding: 24, maxWidth: 480, margin: "24px auto 0", boxShadow: "0 8px 32px rgba(192,132,252,.08)", animation: "fadeUp .4s ease" }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 14 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#C084FC)" }} />
              </div>
              <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 28, color: "#1A0530", marginBottom: 12, marginTop: 8 }}>{dailyCard.name}</h2>
              <p style={{ fontSize: 15, color: "#3D1F5C", lineHeight: 1.8, fontWeight: 300 }}>{dailyCard.meaning}</p>
              <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1px solid #E8C8F0", borderLeft: "3px solid #C084FC", borderRadius: "0 12px 12px 0", padding: "12px 16px", marginTop: 16 }}>
                <p style={{ fontSize: 13, color: "#7C3AED", fontStyle: "italic" }}>✦ This card is your cosmic message for today. Sit with it.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "#FFFAF5", padding: "48px 20px", width: "100%" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(24px,5vw,36px)", color: "#1A0530", textAlign: "center", marginBottom: 8 }}>Weekly Tarot by Sign</h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#9A7AAA", marginBottom: 28, fontWeight: 300 }}>Pick your sign for a personalised weekly tarot reading</p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
            {SIGNS.map((sg, i) => (
              <button key={sg.n} onClick={() => getWeeklyTarot(sg)}
                style={{ background: selectedSign?.n === sg.n ? "#1A0530" : "#fff", border: "1.5px solid #F0E0EC", borderRadius: 100, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "'Poppins',sans-serif", color: selectedSign?.n === sg.n ? "#fff" : "#5A3A7A", transition: "all .15s" }}>
                {sg.s} {sg.n}
              </button>
            ))}
          </div>

          {loading && <div style={{ textAlign: "center", padding: "32px 0" }}><div style={{ display: "inline-block", width: 26, height: 26, border: "2.5px solid #F0E0EC", borderTopColor: "#C084FC", borderRadius: "50%", animation: "spin .7s linear infinite" }} /><p style={{ color: "#B8A0C8", marginTop: 12, fontSize: 13 }}>Drawing your cards...</p></div>}

          {weeklyTarot && !loading && (
            <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 24, padding: "clamp(20px,5vw,36px)", animation: "fadeUp .4s ease", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(192,132,252,.07)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#C084FC,#FF9F7F)" }} />
              <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 22, color: "#1A0530", marginBottom: 16 }}>{selectedSign?.n} Weekly Tarot</h3>
              {weeklyTarot.split("\n").filter(Boolean).map((p, i) => (
                <p key={i} style={{ marginBottom: 14, fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 300 }}>{p}</p>
              ))}
              <button onClick={() => setModal(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "11px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", marginTop: 8 }}>Get my birth chart — $29</button>
            </div>
          )}
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
