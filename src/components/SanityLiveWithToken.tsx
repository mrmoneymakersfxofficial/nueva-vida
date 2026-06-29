"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Custom Sanity Live component that fetches the read-only token
 * from our own API endpoint (no NEXT_PUBLIC_ env var needed).
 *
 * Connects to Sanity's Live Content API via EventSource and
 * refreshes the page when content changes.
 */
export function SanityLiveWithToken({ includeDrafts = false, children }: { includeDrafts?: boolean; children?: ReactNode }) {
  const [ready, setReady] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      try {
        // Fetch token from our own server endpoint
        const res = await fetch("/api/sanity-token");
        if (!res.ok || cancelled) return;
        const { token, projectId } = await res.json();
        if (!token || !projectId || cancelled) return;

        const dataset = "production";
        const perspective = includeDrafts ? "drafts" : "published";

        // Connect to Sanity Live Content API
        const url = `https://api.sanity.io/v1/data/listen/${projectId}?dataset=${dataset}&perspective=${perspective}&token=${encodeURIComponent(token)}`;

        const es = new EventSource(url, { withCredentials: false });
        eventSourceRef.current = es;

        es.onopen = () => {
          if (!cancelled) setReady(true);
        };

        es.addEventListener("message", (event: MessageEvent) => {
          if (cancelled) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === "welcome") return;

            // Any content change → refresh the page
            if (data.transitions || data.type === "mutation") {
              // Use Next.js router refresh if available, otherwise hard reload
              if (typeof window !== "undefined" && (window as any).__nextRouter) {
                (window as any).__nextRouter.refresh();
              } else {
                window.location.reload();
              }
            }
          } catch {
            // Ignore parse errors
          }
        });

        es.onerror = () => {
          // Reconnect after 3 seconds on error
          if (!cancelled) {
            es.close();
            setTimeout(() => {
              if (!cancelled) connect();
            }, 3000);
          }
        };
      } catch {
        // Silently fail — live updates are optional
      }
    }

    connect();

    return () => {
      cancelled = true;
      eventSourceRef.current?.close();
    };
  }, [includeDrafts]);

  return <>{children}</>;
}