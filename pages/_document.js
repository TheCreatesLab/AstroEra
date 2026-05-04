import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global Meta */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AstroEra" />
        <meta name="theme-color" content="#FF6CAB" />

        {/* Open Graph Global */}
        <meta property="og:site_name" content="AstroEra" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://astroera.live/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@astroera" />
        <meta name="twitter:image" content="https://astroera.live/og-image.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Global Schema - Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AstroEra",
              "url": "https://astroera.live",
              "logo": "https://astroera.live/logo.png",
              "description": "Professional daily horoscopes, birth chart readings, compatibility and cosmic guidance for your generation.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "thecreateslab@gmail.com",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.instagram.com/astroera.live"
              ]
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AstroEra",
              "url": "https://astroera.live",
              "description": "Free daily horoscopes, weekly horoscopes, compatibility readings and birth chart analysis.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://astroera.live/daily-horoscope/{search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
