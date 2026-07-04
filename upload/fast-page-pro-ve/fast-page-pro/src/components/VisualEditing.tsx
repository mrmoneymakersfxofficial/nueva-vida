"use client";

import { useEffect, useState } from "react";
import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

/**
 * VisualEditing overlay — ONLY renders when the page is loaded
 * inside an iframe (Sanity Presentation Tool context).
 *
 * - Direct visit to sertrade.vercel.app/* → NOT in iframe → returns null → no overlay
 * - Presentation Tool iframe at /admin/presentation → in iframe → overlay renders
 *
 * This ensures the public site never shows editing UI, borders, or badges,
 * while the CMS Presentation Tool continues to work correctly.
 */
export function VisualEditing() {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    try {
      // window.self !== window.top = we're in an iframe
      // If cross-origin, accessing window.top throws — which also means we're in an iframe
      setIsIframe(window.self !== window.top);
    } catch {
      // Cross-origin access error → definitely inside an iframe
      setIsIframe(true);
    }
  }, []);

  if (!isIframe) return null;
  return <SanityVisualEditing />;
}