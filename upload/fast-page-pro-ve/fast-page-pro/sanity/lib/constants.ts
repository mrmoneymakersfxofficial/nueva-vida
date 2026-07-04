// @ts-nocheck
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Fast Page Pro Client";
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const BRAND_COLORS = { primary: "#004691", accent: "#D4AF37", dark: "#001C3D" } as const;
