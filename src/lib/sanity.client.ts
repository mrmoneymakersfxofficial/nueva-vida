import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

function createSanityClient(options?: { perspective?: "published" | "previewDrafts" }): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  const isDraft = options?.perspective === "previewDrafts";
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-01-01",
    useCdn: !isDraft,
    perspective: isDraft ? "previewDrafts" : "published",
    token: isDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    stega: { enabled: true, studioUrl: "/admin" },
  });
}

let _publishedClient: SanityClient | null = null;
export function getPublishedClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  if (!_publishedClient) _publishedClient = createSanityClient({ perspective: "published" });
  return _publishedClient;
}

function getDraftClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  return createSanityClient({ perspective: "previewDrafts" });
}

export function getClientForDraft(isDraft: boolean): SanityClient | null {
  return isDraft ? getDraftClient() : getPublishedClient();
}

export const sanityClient = {
  fetch: async <T = unknown>(query: string): Promise<T> => {
    const client = getPublishedClient();
    if (!client) return [] as unknown as T;
    return client.fetch<T>(query);
  },
} as Pick<SanityClient, "fetch">;

export function urlFor(source: Parameters<ImageUrlBuilder["image"]>[0]) {
  const client = getPublishedClient();
  if (!client) return { url: () => "", width: () => ({ fit: () => ({ url: () => "" }) }), height: () => ({ fit: () => ({ url: () => "" }) }) } as unknown as ReturnType<ImageUrlBuilder["image"]>;
  return createImageUrlBuilder(client).image(source);
}

// === TYPES ===
export interface SanityImage { asset?: { _ref: string; _type: string; _id?: string; url?: string }; alt?: string; caption?: string; hotspot?: { x: number; y: number; height: number; width: number }; crop?: { top: number; bottom: number; left: number; right: number }; }
export interface PortableTextBlock { _type: string; _key: string; children: Array<{ text: string; marks: string[] }>; style?: string; markDefs?: Array<{ _key: string; _type: string; href?: string }>; listItem?: string; level?: number; }
export interface SanityFile { asset?: { _ref: string; _type: string; url?: string }; }
export interface SanityServiceCategory { _id: string; name: string; slug: string; description?: string; icon?: string; color?: string; flipTitle?: string; flipServices?: string[]; flipCtaLabel?: string; order?: number; }
export interface SanitySubservice { title: string; description?: string; image?: SanityImage | null; }
export interface SanityService { _id: string; title: string; slug: string; coverImage?: SanityImage | null; description?: PortableTextBlock[]; category?: SanityServiceCategory | null; subservices?: SanitySubservice[]; featured?: boolean; order?: number; }
export interface SanityProject { _id: string; title: string; slug: string; coverImage?: SanityImage | null; gallery?: SanityImage[]; description?: PortableTextBlock[]; excerpt?: string; client?: string; location?: string; year?: string; area?: string; status?: "completed" | "in-progress" | "planned"; tags?: string[]; videoMp4?: SanityFile | null; videoWebm?: SanityFile | null; service?: { _id: string; title: string; slug: string } | null; featured?: boolean; order?: number; }
export interface SanityTeamMember { _id: string; name: string; slug: string; role: string; department?: string; photo?: SanityImage | null; bio?: PortableTextBlock[]; email?: string; phone?: string; linkedinUrl?: string; order?: number; }
export interface SanityTestimonial { _id: string; authorName: string; authorRole?: string; company?: string; quote?: PortableTextBlock[]; photo?: SanityImage | null; rating?: number; project?: { _id: string; title: string; slug: string } | null; featured?: boolean; order?: number; }
export interface SanityPartner { _id: string; name: string; logo?: SanityImage | null; url?: string; order?: number; }
export interface SanityHeroSlide { _id: string; title: string; subtitle?: PortableTextBlock[]; backgroundImage?: SanityImage | null; backgroundVideoMp4?: SanityFile | null; backgroundVideoWebm?: SanityFile | null; posterImage?: SanityImage | null; mobileFallbackImage?: SanityImage | null; videoAutoplay?: boolean; videoMuted?: boolean; videoLoop?: boolean; ctaLabel?: string; ctaLink?: string; ctaType?: "primary" | "secondary" | "whatsapp" | "mail"; order?: number; }
export interface SanityStat { _id: string; label: string; value: number; suffix?: string; prefix?: string; order?: number; }
export interface SanitySiteSettings { _id: string; companyName?: string; slogan?: string; tagline?: string; logo?: SanityImage | null; logoWhite?: SanityImage | null; ogImage?: SanityImage | null; phone?: string; whatsapp?: string; email?: string; address?: string; businessHours?: string; facebookUrl?: string; instagramUrl?: string; linkedinUrl?: string; tiktokUrl?: string; youtubeUrl?: string; mapLatitude?: number; mapLongitude?: number; mapZoom?: number; seoTitle?: string; seoDescription?: string; }

export function plainText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map((b) => b._type === "block" && b.children ? b.children.map((c) => c.text).join("") : "").join("\n").trim();
}

export function getImageUrl(image: SanityImage | null | undefined, width = 800, height = 600): string | null {
  if (!image || !image.asset) return null;
  try { return urlFor(image).width(width).height(height).fit("crop").url(); } catch { return null; }
}

export function getVideoUrl(file: SanityFile | null | undefined): string | null {
  if (!file || !file.asset) return null;
  const asset = file.asset as any;
  // 1. Use the direct URL from Sanity (most reliable, auto-generated)
  if (asset.url) return asset.url;
  // 2. Construct CDN URL from resolved asset fields
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    if (!projectId) return null;
    // Full asset ID: e.g. "file-abc123def456-mp4"
    const assetId = asset._id || asset._ref || "";
    if (!assetId) return null;
    // If we have the original filename, construct full CDN path
    const originalFilename = asset.originalFilename || "";
    // CDN format: files/{projectId}/{dataset}/{fullAssetId}/{originalFilename}
    // This 302-redirects to the actual file — works reliably
    if (originalFilename) {
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}/${encodeURIComponent(originalFilename)}`;
    }
    // Without filename, use asset ID alone (redirect still works)
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}`;
  } catch { return null; }
}
