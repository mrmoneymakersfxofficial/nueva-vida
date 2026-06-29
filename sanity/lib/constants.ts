// @ts-nocheck
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Nueva Vida";
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://nueva-vida-consultorio.vercel.app");
export const BRAND_COLORS = { primary: "#00A3E0", accent: "#0697B8", dark: "#0A2F6B" } as const;
