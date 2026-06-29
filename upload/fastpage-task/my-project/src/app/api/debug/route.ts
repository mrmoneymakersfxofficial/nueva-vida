import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { headers } from "next/headers";
import { getPublishedClient, getVideoUrl } from "@/lib/sanity.client";
import { ALL_HERO_SLIDES_QUERY } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    environment: {},
    sanity: {},
    draftMode: {},
    presentationTool: {},
    videoAssets: {},
    requests: {},
  };

  // ===== 1. ENVIRONMENT =====
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  result.environment = {
    NODE_ENV: process.env.NODE_ENV || "unknown",
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId || "NOT SET",
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN
      ? `SET (${process.env.SANITY_API_READ_TOKEN.length} chars, starts: ${process.env.SANITY_API_READ_TOKEN.slice(0, 6)}...)`
      : "NOT SET",
    NEXT_PUBLIC_SANITY_API_READ_TOKEN: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN
      ? `SET (${process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN.length} chars, starts: ${process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN.slice(0, 6)}...)`
      : "NOT SET",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "NOT SET (will use VERCEL_URL)",
    VERCEL_URL: process.env.VERCEL_URL || "NOT SET (normal locally)",
    computed_SITE_URL: siteUrl,
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
  };

  // ===== 2. REQUEST INFO =====
  try {
    const h = await headers();
    result.requests = {
      url: h.get("x-invoke-path") || h.get("x-next-url") || "unknown",
      host: h.get("host") || "unknown",
      referer: h.get("referer") || "none",
      userAgent: (h.get("user-agent") || "").slice(0, 120),
      secFetchDest: h.get("sec-fetch-dest") || "unknown",
      secFetchMode: h.get("sec-fetch-mode") || "unknown",
    };
  } catch { /* headers() may not be available in all contexts */ }

  // ===== 3. DRAFT MODE =====
  try {
    const dm = await draftMode();
    result.draftMode = {
      isEnabled: dm.isEnabled,
      note: "Draft mode enables VisualEditing + SanityLiveWithToken in layout.tsx. The VisualEditing component has an iframe guard — it only renders when window.self !== window.top (i.e., inside the Presentation Tool iframe).",
    };
  } catch (e: unknown) {
    result.draftMode = { error: e instanceof Error ? e.message : String(e) };
  }

  // ===== 4. SANITY CONNECTION =====
  try {
    const client = getPublishedClient();
    if (!client) {
      result.sanity = { status: "ERROR", message: "Could not create Sanity client" };
    } else {
      const count = await client.fetch<number>(`count(*[_type == "heroSlide"])`);
      const allCounts: Record<string, number> = {};
      const types = ["heroSlide", "stat", "service", "serviceCategory", "project", "teamMember", "testimonial", "partner", "siteSettings"];
      for (const t of types) {
        allCounts[t] = await client.fetch<number>(`count(*[_type == "${t}"])`);
      }
      result.sanity = {
        status: "OK",
        projectId: projectId || "MISSING",
        dataset,
        perspective: "published",
        useCdn: true,
        stega_enabled: true,
        studioUrl: "/admin",
        documentCounts: allCounts,
      };
    }
  } catch (err: unknown) {
    result.sanity = { status: "ERROR", message: err instanceof Error ? err.message : String(err) };
  }

  // ===== 5. PRESENTATION TOOL CONFIG =====
  result.presentationTool = {
    siteUrl,
    previewModeEnableEndpoint: "/api/draft-mode/enable",
    previewModeDisableEndpoint: "/api/draft-mode/disable",
    adminPath: "/admin",
    iframeGuard: "VisualEditing.tsx checks window.self !== window.top. If NOT in iframe → returns null (no overlay). If in iframe → renders SanityVisualEditing.",
    locationMappings: {
      heroSlide: "/#inicio",
      stat: "/#numeros",
      partner: "/#clientes",
      serviceCategory: "/servicios",
      service: "/servicios#<slug>",
      project: "/proyectos#<slug>",
      teamMember: "/#nosotros",
      testimonial: "/",
      siteSettings: "/#inicio, /#nosotros, /#contacto",
    },
  };

  // ===== 6. VIDEO ASSETS =====
  try {
    const client = getPublishedClient();
    if (client) {
      const rawQuery = `*[_type == "heroSlide"] | order(order asc) {
        _id, title,
        backgroundVideoMp4 { asset-> { _id, url, mimeType, path, originalFilename, size } },
        backgroundVideoWebm { asset-> { _id, url, mimeType, path, originalFilename, size } },
        videoAutoplay, videoMuted, videoLoop,
        posterImage { asset-> { _id } },
        backgroundImage { asset-> { _id } },
      }`;
      const slides = await client.fetch<Record<string, unknown>[]>(rawQuery);
      result.videoAssets = slides.map((s: any) => ({
        _id: s._id,
        title: s.title,
        mp4: {
          hasAsset: !!s.backgroundVideoMp4?.asset,
          assetUrl: s.backgroundVideoMp4?.asset?.url || "MISSING",
          resolvedUrl: getVideoUrl(s.backgroundVideoMp4) || "NULL",
          mimeType: s.backgroundVideoMp4?.asset?.mimeType || "MISSING",
          originalFilename: s.backgroundVideoMp4?.asset?.originalFilename || "MISSING",
          size: s.backgroundVideoMp4?.asset?.size || "MISSING",
        },
        webm: {
          hasAsset: !!s.backgroundVideoWebm?.asset,
          resolvedUrl: getVideoUrl(s.backgroundVideoWebm) || "NULL",
        },
        cmsFlags: {
          videoAutoplay: s.videoAutoplay,
          videoMuted: s.videoMuted,
          videoLoop: s.videoLoop,
        },
        codeForces: {
          autoPlay: "ALWAYS true (hardcoded)",
          muted: "ALWAYS true (hardcoded)",
          loop: "ALWAYS true (hardcoded)",
          playsInline: "ALWAYS true (hardcoded)",
        },
      }));
    }
  } catch (err: unknown) {
    result.videoAssets = { error: err instanceof Error ? err.message : String(err) };
  }

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}