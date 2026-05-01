import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import BookingModal from "../../components/BookingModal";
import { SIGNS, SIGN_COLORS, GRAD, GLOBAL_CSS } from "../../lib/constants";

export default function RisingSign() {
  const router = useRouter();
  const { sign: signParam } = router.query;
  const [sign, setSign] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (signParam) {
      const found = SIGNS.find(s => s.n.toLowerCase() === signParam.toLowerCase());
      if (found) fetchReading(found);
    }
  }, [signParam]);

  const fetchReading = async (s) => {
    setSign(s); setReading(""); setLoading(true);
    try {
      const r = await fetch("/api/horoscope", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sign: s.n, type: "rising" }) });
      const d = await r.json();
      setReading(d.horoscope);
    } catch { setReading("The stars are aligning... please try again."); }
    setLoading(false);
  };

  const signName = sign?.n || (signParam ? signParam.charAt(0).toUpperCase() + signParam.slice(1) : "");

  return (
    <>
      <Head>
        <title>{signName} Rising Sign Meaning – {signName} Ascendant | AstroEra</title>
        <meta name="description" content={`What does ${signName} rising mean? Learn about the ${signName} ascendant — how it shapes your appearance, personality and life approach.`} />
        <meta name="keywords" content={`${signName} rising, ${signName} ascendant, what is ${signName} rising, ${signName} rising meaning, rising sign ${signName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://astroera.live/rising-sign/${signParam}`} />
      </Head>
      <style>{GLOBAL_CSS}</style>
      <Nav onBook={() => setModal(true)} />

      <section style={{ background: "linear-gradient(160deg,#FFF5F0,#FFF0F8,#F5EEFF)", padding: "48px 20px 32px", textAlign: "center", width: "100%" }}>
        <span style={{ fontSize: 11, color: "#FF6CAB", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Rising Sign</span>
        <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(28px,6vw,52px)", color: "#1A0530", margin: "10px 0 8px", lineHeight: 1.1 }}>
          {signName} Rising
        </h1>
        <p style={{ fontSize: 14, color: "#9A7AAA", fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>Your rising sign (ascendant) is how the world sees you — often more powerful than your sun sign</p>
      </section>

      <div style={{ background: "#fff", borderBottom: "1px solid #F0E8F4", padding: "12px 20px", width: "100%" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", maxWidth: 700, margin: "0 auto" }}>
          {SIGNS.map((sg, i) => (
            <Link key={sg.n} href={`/rising-sign/${sg.n.toLowerCase()}`}
              style={{ background: sign?.n === sg.n ? "#1A0530" : SIGN_COLORS[i], borderRadius: 100, padding: "6px 12px", fontSize: 11, fontWeight: 500, color: sign?.n === sg.n ? "#fff" : "#5A3A7A", textDecoration: "none", whiteSpace: "nowrap" }}>
              {sg.s} {sg.n}
            </Link>
          ))}
        </div>
      </div>

      <section style={{ background: "#FFFAF5", padding: "40px 20px", width: "100%" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {sign && (
            <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 24, padding: "clamp(20px,5vw,40px)", animation: "fadeUp .4s ease", position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(192,132,252,.07)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6CAB,#C084FC,#FF9F7F)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: SIGN_COLORS[SIGNS.findIndex(s => s.n === sign.n)], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{sign.s}</div>
                <div>
                  <div style={{ fontFamily: "'Rozha One',serif", fontSize: 24, color: "#1A0530" }}>{sign.n} Rising</div>
                  <div style={{ fontSize: 12, color: "#9A7AAA", marginTop: 3, fontWeight: 300 }}>The {sign.n} Ascendant</div>
                </div>
              </div>
              {loading ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ display: "inline-block", width: 26, height: 26, border: "2.5px solid #F0E0EC", borderTopColor: "#C084FC", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                  <p style={{ color: "#B8A0C8", marginTop: 12, fontSize: 13, fontWeight: 300 }}>Decoding your ascendant...</p>
                </div>
              ) : (
                <div>
                  {reading.split("\n").filter(Boolean).map((p, i) => {
  const isLabel = ["First Impressions","How Others See You","Your Life Approach","What Your Soul"].some(l => p.startsWith(l));
  return isLabel
    ? <p key={i} style={{ marginBottom: 6, marginTop: 20, fontSize: 12, color: "#C084FC", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>{p}</p>
    : <p key={i} style={{ marginBottom: 14, fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 300 }}>{p}</p>;
})}
                </div>
              )}
              <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1px solid #E8C8F0", borderRadius: 16, padding: 16, marginTop: 20 }}>
                <p style={{ fontSize: 13, color: "#7C3AED", fontWeight: 500, marginBottom: 8 }}>✦ Don't know your rising sign?</p>
                <p style={{ fontSize: 13, color: "#5A3A7A", fontWeight: 300, marginBottom: 12 }}>Your rising sign is determined by your exact birth time and location. Book a personalised birth chart reading to discover your ascendant and all your planetary placements.</p>
                <button onClick={() => setModal(true)} style={{ background: GRAD, color: "#fff", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>Find my rising sign — $29</button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 22, color: "#1A0530", marginBottom: 16 }}>All Rising Signs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
              {SIGNS.map((sg, i) => (
                <Link key={sg.n} href={`/rising-sign/${sg.n.toLowerCase()}`}
                  style={{ background: "#fff", border: "1.5px solid #F0E8F4", borderRadius: 14, padding: "14px 12px", textAlign: "center", textDecoration: "none", display: "block" }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{sg.s}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1A0530" }}>{sg.n} Rising</div>
                </Link>
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
