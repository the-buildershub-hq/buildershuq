import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Builders Hub: Software Development Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "logo-white.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#081223",
          backgroundImage: "radial-gradient(circle at 30% 30%, #0f2647 0%, #081223 60%, #040913 100%)",
          padding: "76px 96px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Left Column: Brand & Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            maxWidth: "600px",
          }}
        >
          {/* Logo & Brand Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoBase64}
              alt="Builders Hub"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              Builders Hub
            </span>
          </div>

          {/* Heading and Subtext */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                margin: 0,
                fontFamily: "Georgia, serif",
                color: "#ffffff",
              }}
            >
              We Build Better Digital Products.
            </h1>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.5,
                color: "#94A3B8",
                margin: 0,
              }}
            >
              Software development agency engineering high performance web applications, mobile platforms, and AI automations.
            </p>
          </div>

          <div style={{ display: "flex" }} />
        </div>

        {/* Right Column: 4 Minimal Craft Slabs */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "380px",
            height: "360px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Slab 1: Vermilion */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "40px",
              width: "150px",
              height: "220px",
              borderRadius: "18px",
              backgroundColor: "#F04623",
              transform: "rotate(-6deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
              boxShadow: "none",
            }}
          >
            <div style={{ display: "flex", height: "80px", width: "100%", opacity: 0.85 }}>
              <svg width="100%" height="80" viewBox="0 0 100 80" fill="none">
                <line x1="10" y1="10" x2="10" y2="25" stroke="#ffffff" strokeWidth="2" />
                <line x1="25" y1="10" x2="25" y2="40" stroke="#ffffff" strokeWidth="2" />
                <line x1="40" y1="10" x2="40" y2="55" stroke="#ffffff" strokeWidth="2" />
                <line x1="55" y1="10" x2="55" y2="70" stroke="#ffffff" strokeWidth="2" />
                <line x1="70" y1="10" x2="70" y2="80" stroke="#ffffff" strokeWidth="2" />
                <line x1="85" y1="10" x2="85" y2="80" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#ffffff" }}>
              Business
            </span>
          </div>

          {/* Slab 2: Warm Sand */}
          <div
            style={{
              position: "absolute",
              left: "80px",
              top: "20px",
              width: "150px",
              height: "220px",
              borderRadius: "18px",
              backgroundColor: "#EFE8DD",
              transform: "rotate(-2deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", height: "80px", width: "100%", opacity: 0.65 }}>
              <svg width="100%" height="80" viewBox="0 0 100 80" fill="#524C44">
                <rect x="10" y="10" width="12" height="12" rx="2" fillOpacity="0.4" />
                <rect x="28" y="10" width="12" height="12" rx="2" fillOpacity="0.8" />
                <rect x="46" y="10" width="12" height="12" rx="2" fillOpacity="0.5" />
                <rect x="64" y="10" width="12" height="12" rx="2" fillOpacity="0.7" />
                <rect x="10" y="28" width="12" height="12" rx="2" fillOpacity="0.7" />
                <rect x="28" y="28" width="12" height="12" rx="2" fillOpacity="0.3" />
                <rect x="46" y="28" width="12" height="12" rx="2" fillOpacity="0.9" />
                <rect x="64" y="28" width="12" height="12" rx="2" fillOpacity="0.4" />
              </svg>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#18181B" }}>
              Action
            </span>
          </div>

          {/* Slab 3: Electric Blue */}
          <div
            style={{
              position: "absolute",
              left: "160px",
              top: "25px",
              width: "150px",
              height: "220px",
              borderRadius: "18px",
              backgroundColor: "#0084FF",
              transform: "rotate(3deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", height: "80px", width: "100%", opacity: 0.8 }}>
              <svg width="100%" height="80" viewBox="0 0 100 80" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M 10 15 Q 50 5 90 15" />
                <path d="M 10 30 Q 50 20 90 30" />
                <path d="M 10 45 Q 50 35 90 45" />
                <path d="M 10 60 Q 50 50 90 60" />
              </svg>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#ffffff" }}>
              Strategy
            </span>
          </div>

          {/* Slab 4: Vivid Spring Green */}
          <div
            style={{
              position: "absolute",
              left: "240px",
              top: "45px",
              width: "150px",
              height: "220px",
              borderRadius: "18px",
              backgroundColor: "#00DF73",
              transform: "rotate(7deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", height: "80px", width: "100%", opacity: 0.85 }}>
              <svg width="100%" height="80" viewBox="0 0 100 80" fill="#0A381E">
                <rect x="10" y="10" width="8" height="20" rx="2" />
                <rect x="25" y="10" width="8" height="20" rx="2" />
                <rect x="40" y="10" width="8" height="20" rx="2" />
                <rect x="55" y="10" width="8" height="20" rx="2" />
                <rect x="70" y="10" width="8" height="20" rx="2" />
                <rect x="10" y="40" width="8" height="20" rx="2" />
                <rect x="40" y="40" width="8" height="20" rx="2" />
                <rect x="70" y="40" width="8" height="20" rx="2" />
              </svg>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#0A2E1A" }}>
              Customers
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
