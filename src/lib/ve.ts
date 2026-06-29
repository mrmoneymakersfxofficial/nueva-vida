/**
 * Visual Editing helper — generates `data-sanity` HTML attributes
 * for click-to-edit in the Sanity Presentation Tool overlay.
 *
 * Usage in client components:
 *   <h2 {...ve('hero-slide-1', 'heroSlide', 'title')}>Hello</h2>
 *
 * The overlay only activates when VisualEditing is mounted (draft mode).
 * On the public site these are inert data attributes.
 */

function encodeDataAttr(
  id: string,
  type: string,
  path: string,
): string {
  const parts: string[] = [];
  parts.push(`id=${id}`);
  if (type) parts.push(`type=${type}`);
  if (path) parts.push(`path=${path}`);
  parts.push(`base=${encodeURIComponent('/admin')}`);
  return parts.join(';');
}

export function ve(
  id: string,
  type: string,
  path: string,
): Record<string, string> {
  try {
    const value = encodeDataAttr(id, type, path);
    return value ? { 'data-sanity': value } : {};
  } catch {
    return {};
  }
}