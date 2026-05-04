import Head from "next/head";
import Link from "next/link";
import { GLOBAL_CSS, GRAD } from "../lib/constants";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | AstroEra</title>
        <meta name="description" content="AstroEra Privacy Policy — how we collect, use and protect your personal information." />
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
          <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,5vw,48px)", color: "#1A0530", marginBottom: 8, lineHeight: 1.1 }}>Privacy Policy</h1>
          <p style={{ fontSize: 13, color: "#9A7AAA", marginBottom: 40, fontWeight: 300 }}>Last updated: May 1, 2026</p>

          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly to us when you book a reading or subscribe to our newsletter, including your name, email address, and zodiac sign. We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on pages." },
            { title: "2. How We Use Your Information", content: "We use the information we collect to deliver your astrology readings and services, send you weekly horoscope newsletters (if subscribed), respond to your questions and requests, improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties." },
            { title: "3. Cookies", content: "We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our website may not function properly." },
            { title: "4. Google AdSense", content: "We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalised advertising by visiting Google's Ads Settings at www.google.com/settings/ads." },
            { title: "5. Third-Party Services", content: "We use third-party services including Razorpay for payment processing and ConvertKit for email marketing. These services have their own privacy policies and we encourage you to review them. We do not store your payment information on our servers." },
            { title: "6. Data Security", content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure." },
            { title: "7. Your Rights", content: "You have the right to access, correct, or delete your personal information at any time. You may unsubscribe from our email newsletters at any time by clicking the unsubscribe link in any email. To request deletion of your data, contact us at thecreateslab@gmail.com." },
            { title: "8. Children's Privacy", content: "Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us." },
            { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the date above. Your continued use of the website after changes constitutes acceptance of the updated policy." },
            { title: "10. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at thecreateslab@gmail.com or through our website at astroera.live." },
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
