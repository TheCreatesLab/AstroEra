import Head from "next/head";
import Link from "next/link";
import { GLOBAL_CSS, GRAD } from "../lib/constants";

export default function AffiliateDisclosure() {
  return (
    <>
      <Head>
        <title>Affiliate Disclosure | AstroEra</title>
        <meta name="description" content="AstroEra Affiliate Disclosure — transparency about our advertising and affiliate relationships." />
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
          <h1 style={{ fontFamily: "'Rozha One',serif", fontSize: "clamp(32px,5vw,48px)", color: "#1A0530", marginBottom: 8, lineHeight: 1.1 }}>Affiliate Disclosure</h1>
          <p style={{ fontSize: 13, color: "#9A7AAA", marginBottom: 40, fontWeight: 300 }}>Last updated: May 1, 2026</p>

          <div style={{ background: "linear-gradient(135deg,#FFF0F7,#F5EEFF)", border: "1.5px solid #E8C8F0", borderRadius: 16, padding: 24, marginBottom: 36 }}>
            <p style={{ fontSize: 15, color: "#3D1F5C", lineHeight: 1.85, fontWeight: 400 }}>
              <strong>In plain English:</strong> Some links on AstroEra may earn us a small commission if you click and buy. It costs you nothing extra and helps us keep the site free. We only recommend things we genuinely think are useful for your cosmic journey.
            </p>
          </div>

          {[
            { title: "Our Commitment to Transparency", content: "AstroEra is committed to full transparency with our readers. This disclosure page exists to clearly explain how we earn revenue and how that may influence the content you see on our website." },
            { title: "Affiliate Links", content: "Some of the links on AstroEra are affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at no additional cost to you. These commissions help us maintain and improve the website and keep our core content free for everyone." },
            { title: "Products We Recommend", content: "We only recommend products and services that we genuinely believe will be valuable to our readers. Our editorial opinions are not influenced by affiliate relationships. We would recommend the same products regardless of whether an affiliate program exists." },
            { title: "Google AdSense", content: "AstroEra displays advertisements served by Google AdSense. These ads are selected by Google based on the content of our pages and your browsing history. We receive revenue when visitors interact with these ads. The presence of an advertisement does not constitute an endorsement of the advertised product or service." },
            { title: "Sponsored Content", content: "If we ever publish sponsored content, it will be clearly labelled as such. As of the date of this disclosure, we do not publish sponsored content." },
            { title: "Price Accuracy", content: "Prices listed on our website for affiliate products are indicative and may change. Always verify the current price on the seller's website before making a purchase." },
            { title: "Questions", content: "If you have any questions about our affiliate relationships or how we earn revenue, please contact us at thecreateslab@gmail.com. We are happy to provide full transparency about any specific product or relationship." },
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
