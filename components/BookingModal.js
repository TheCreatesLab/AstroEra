import { useState } from "react";
import { SIGNS, GRAD } from "../lib/constants";

export default function BookingModal({ open, onClose }) {
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bSign, setBSign] = useState("");
  const [booked, setBooked] = useState(false);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,5,48,.55)", backdropFilter: "blur(12px)", padding: 20 }}>
      <div style={{ background: "#fff", border: "1.5px solid #F0E0EC", borderRadius: 24, padding: "clamp(22px,5vw,38px)", maxWidth: 420, width: "100%", position: "relative", boxShadow: "0 24px 80px rgba(255,108,171,.12)" }}>
        <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 3, background: "linear-gradient(90deg,transparent,#FF6CAB,#C084FC,transparent)" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "#F5EEFF", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9A7AAA", fontSize: 13 }}>✕</button>
        {booked ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>✨</div>
            <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 24, color: "#1A0530", marginBottom: 10 }}>You're booked, {bName}!</h3>
            <p style={{ fontSize: 14, color: "#9A7AAA", lineHeight: 1.6, fontWeight: 300 }}>Your reading lands in your inbox within 24 hours.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Rozha One',serif", fontSize: 24, color: "#1A0530", margin: "0 0 4px" }}>Book your reading</h3>
            <p style={{ fontSize: 13, color: "#9A7AAA", marginBottom: 20, fontWeight: 300 }}>Full birth chart · Personalised · 24hrs · $29</p>
            {[{ label: "Your name", val: bName, set: setBName, ph: "e.g. Priya" }, { label: "Email address", val: bEmail, set: setBEmail, ph: "you@email.com" }].map((f, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: "#9A7AAA", display: "block", marginBottom: 5, letterSpacing: .5, fontWeight: 500 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: "100%", background: "#FFFAF5", border: "1.5px solid #F0E0EC", borderRadius: 10, padding: "11px 13px", fontSize: 14, color: "#1A0530", outline: "none", fontFamily: "'Poppins',sans-serif", fontWeight: 300 }} />
              </div>
            ))}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "#9A7AAA", display: "block", marginBottom: 5, letterSpacing: .5, fontWeight: 500 }}>Your sun sign</label>
              <select value={bSign} onChange={e => setBSign(e.target.value)} style={{ width: "100%", background: "#FFFAF5", border: "1.5px solid #F0E0EC", borderRadius: 10, padding: "11px 13px", fontSize: 14, color: bSign ? "#1A0530" : "#B8A0C8", outline: "none", fontFamily: "'Poppins',sans-serif" }}>
                <option value="">Select your sign</option>
                {SIGNS.map(sg => <option key={sg.n} value={sg.n}>{sg.s} {sg.n}</option>)}
              </select>
            </div>
            <button onClick={() => bName && bEmail && bSign && setBooked(true)} style={{ width: "100%", background: GRAD, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif", marginTop: 6 }}>Confirm & Pay $29 ✦</button>
          </>
        )}
      </div>
    </div>
  );
}
