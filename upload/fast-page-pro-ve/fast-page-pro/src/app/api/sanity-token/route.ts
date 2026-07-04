import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Exposes the server-side Sanity read token to the browser
// so the live refresh component can connect to Sanity's Live API.
// Only used in draft/preview mode — the token is read-only.
export async function GET() {
  const token = process.env.SANITY_API_READ_TOKEN || "";
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

  if (!token || !projectId) {
    return NextResponse.json({ token: "", projectId: "" });
  }

  return NextResponse.json({ token, projectId }, {
    headers: {
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}