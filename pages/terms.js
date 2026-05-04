import Head from "next/head";
import Link from "next/link";
import { GLOBAL_CSS, GRAD } from "../lib/constants";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | AstroEra</title>
        <meta name="description" content="AstroEra Terms of Service — the rules and guidelines for using our astrology platform." />
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

      <section style={{ background: "#FFFAF5", padding: "60px 20px", width: "100%", minHeight: "80vh" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,5vw,48px)", color: "#1A0530", marginBottom: 8, lineHeight: 1.1 }}>Terms of Service</h1>
          <p style={{ fontSize: 13, color: "#9A7AAA", marginBottom: 40, fontWeight: 300 }}>Last updated: May 1, 2026</p>

          {[
            { title: "1. Entertainment Purposes Only", content: "AstroEra provides astrology content, horoscopes, tarot readings, and related services strictly for entertainment purposes only. Our content is not intended to be a substitute for professional advice including but not limited to medical, legal, financial, or psychological advice. We make no claims about the accuracy or predictive nature of astrological content." },
            { title: "2. Acceptance of Terms", content: "By accessing and using astroera.live, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and your continued use of the site constitutes acceptance of any changes." },
            { title: "3. Use of Services", content: "You agree to use AstroEra only for lawful purposes and in a way that does not infringe the rights of others. You must not use our website to distribute spam, malware, or harmful content, attempt to gain unauthorised access to our systems, or engage in any conduct that restricts or inhibits others' use of the website." },
            { title: "4. Paid Readings", content: "When you purchase a birth chart reading or other paid service, you agree that the reading is provided for entertainment purposes only. Refunds are available within 24 hours of purchase if your reading has not yet been delivered. Once delivered, all sales are final. We aim to deliver all readings within 24 hours of payment confirmation." },
            { title: "5. Intellectual Property", content: "All content on AstroEra, including text, graphics, logos, and horoscope readings, is the property of Creates Lab and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission." },
            { title: "6. Email Newsletter", content: "By subscribing to our newsletter, you consent to receive weekly horoscope emails and occasional promotional content. You may unsubscribe at any time. We will not share your email address with third parties without your consent except as described in our Privacy Policy." },
            { title: "7. Limitation of Liability", content: "To the fullest extent permitted by law, AstroEra and Creates Lab shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability for any claim shall not exceed the amount you paid for the specific service giving rise to the claim." },
            { title: "8. Disclaimers", content: "Our services are provided on an 'as is' basis without warranties of any kind. We do not guarantee that our website will be uninterrupted, error-free, or free of viruses. Astrological readings are subjective interpretations and we make no guarantees about their accuracy or applicability to your life circumstances." },
            { title: "9. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India." },
            { title: "10. Contact", content: "For any questions about these Terms of Service, please contact us at thecreateslab@gmail.com." },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Rozha One',serif", fontSize: 20, color: "#1A0530", marginBottom: 10 }}>{section.title}</h2>
              <p style={{ fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 300 }}>{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#1A0530", padding: "28px 20px", textAlign: "center" }}>
        <Link href="/" style={{ fontFamily: "'Rozha One',serif", fontSize: 18, color: "#FFF5FA", textDecoration: "none" }}>✦ AstroEra</Link>
        <p style={{ fontSize: 12, color: "#7A5A8A", marginTop: 8, fontWeight: 300 }}>© 2026 AstroEra · For entertainment purposes</p>
      </footer>
    </>
  );
}
