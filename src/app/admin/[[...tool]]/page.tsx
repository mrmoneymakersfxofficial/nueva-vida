"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Studio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      display: "flex", justifyContent: "center", alignItems: "center",
      background: "#0A2F6B"
    }}>
      <p style={{ color: "#00A3E0", fontSize: 18, fontFamily: "sans-serif" }}>Cargando Studio...</p>
    </div>
  ),
});

function StudioGuard({ children }: { children: React.ReactNode }) {
  const hasProjectId = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  if (!hasProjectId) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        background: "#0A2F6B", padding: 32, textAlign: "center", fontFamily: "system-ui, sans-serif"
      }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,163,224,0.3)", borderRadius: 16, padding: "48px 40px", maxWidth: 520, width: "100%" }}>
          <h2 style={{ color: "#00A3E0", fontSize: 22, marginBottom: 16, fontWeight: 600 }}>Sanity Studio — No Configurado</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>Para acceder al panel de administracion, debes configurar las siguientes variables de entorno en tu plataforma de despliegue (Vercel):</p>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "16px 20px", textAlign: "left", marginBottom: 24, fontSize: 13 }}>
            <code style={{ color: "#00A3E0", display: "block", marginBottom: 6 }}>NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id</code>
            <code style={{ color: "#00A3E0", display: "block", marginBottom: 6 }}>NEXT_PUBLIC_SANITY_DATASET=production</code>
            <code style={{ color: "#00A3E0", display: "block" }}>SANITY_API_READ_TOKEN=tu_read_token</code>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function StudioWithConfig() {
  const config = require("../../../../sanity.config");
  return <Studio config={config.default || config} />;
}

export default function AdminPage() {
  useEffect(() => {
    // Hide all parent layout elements when Studio is mounted
    document.body.style.overflow = "hidden";
    const selectors = [
      "nav", "header",
      "footer",
      "[class*='mobile-bottom']",
      "[class*='MobileBottom']",
      "[class*='scroll-spy']",
      "[class*='ScrollSpy']",
      "[class*='toaster']",
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
    });
    return () => {
      document.body.style.overflow = "";
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.display = "";
        });
      });
    };
  }, []);

  return (
    <StudioGuard>
      <div style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
        <StudioWithConfig />
      </div>
    </StudioGuard>
  );
}