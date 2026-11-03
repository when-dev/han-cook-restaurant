import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";

export const alt = "HanCook Korean Restaurant — Bratislava";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Social share card. Uses the built-in Latin font only (no Hangul glyphs), so the Korean
 * locale shows the English tagline. Swap for a real photo once available.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) && lang !== "ko" ? lang : "en");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(circle at 70% 20%, #5a0d12 0%, #0c0a0b 60%)",
          color: "#f6ecdc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 80px",
            borderRadius: 40,
            border: "4px solid #ffd9d2",
            boxShadow: "0 0 40px #e3242b, inset 0 0 40px rgba(227,36,43,.6)",
          }}
        >
          <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -4, color: "#ffe9e4", textShadow: "0 0 30px #e3242b" }}>
            HanCook
          </div>
          <div style={{ fontSize: 30, letterSpacing: 12, color: "#ffb627", marginTop: 8 }}>KOREAN RESTAURANT</div>
        </div>
        <div style={{ fontSize: 34, marginTop: 48, color: "#d8cdc2" }}>{dict.footer.tagline}</div>
        <div style={{ fontSize: 26, marginTop: 14, color: "#e3242b", fontWeight: 700 }}>Obchodná 54 · Bratislava</div>
      </div>
    ),
    size,
  );
}
