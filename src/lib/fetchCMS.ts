import { draftMode } from "next/headers";
import { getClientForDraft } from "@/lib/sanity.client";
import { sanityFetch } from "@/sanity/live";

export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
    let isDraft = false;
    try { const dm = await draftMode(); isDraft = dm.isEnabled; } catch {}

    // When draft mode is active, use sanityFetch from next-sancy/live
    // which embeds stega-encoded source maps needed for Presentation Tool
    // (VisualEditing overlay + click-to-navigate + inline editing + auto-save)
    if (isDraft) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await sanityFetch<any>({ query });
      return (result?.data ?? null) as T | null;
    }

    // For regular visitors, use the published client (CDN-enabled, fast)
    const client = getClientForDraft(false);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch (error) { console.warn("[CMS] Fetch failed, using fallback:", error); return null; }
}