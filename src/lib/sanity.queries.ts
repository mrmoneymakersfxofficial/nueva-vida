const IMAGE_FIELDS = `asset->, alt, caption, hotspot, crop`;
const FILE_FIELDS = `asset-> { _id, url, mimeType, path, originalFilename }`;

// ── Home page queries ──
export const HERO_QUERY = `*[_type == "heroSlide" && !(_id in path("drafts.**"))] | order(order asc) [0] { _id, title, subtitle, ctaLabel, ctaLink, ctaType, order }`;

export const STATS_QUERY = `*[_type == "stat" && !(_id in path("drafts.**"))] | order(order asc) { _id, label, value, suffix, prefix, order }`;

export const HOME_SETTINGS_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
  _id, companyName, slogan, tagline, phone, whatsapp, email, address, businessHours,
  aboutDescription, aboutFeatures[], servicesTitle, servicesDescription,
  ctaTitle, ctaDescription, footerDescription
}`;

export const HOME_SERVICES_QUERY = `*[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, title, "slug": slug.current, subtitle, shortDescription, imagePath, category-> { _id, name, "slug": slug.current }, featured, order
}[0..11]`;

export const HOME_TESTIMONIALS_QUERY = `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, order
}[0..6]`;

export const HOME_MENTORSHIPS_QUERY = `*[_type == "mentorship" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, title, "slug": slug.current, institution, location, flag, image { ${IMAGE_FIELDS} }, imagePath,
  galleryImages { ${IMAGE_FIELDS} }, galleryPaths[], galleryLabel, description, order
}`;

export const HOME_FACILITIES_QUERY = `*[_type == "facility" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, imagePath, alt, caption, order
}`;

// ── Servicios page queries ──
export const SERVICES_CATEGORIES_QUERY = `*[_type == "serviceCategory" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, name, "slug": slug.current, description, fullTitle, lead, icon, color, shortLabel,
  imagePath, galleryPaths[], flipTitle, flipServices[], flipCtaLabel, order
}`;

export const SERVICES_WITH_CATEGORY_QUERY = `*[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, title, "slug": slug.current, subtitle, shortDescription, description, imagePath,
  category-> { _id, name, "slug": slug.current, icon, color },
  preparation[], faqs[]{ q, a },
  featured, order
}`;

export function serviceBySlugQuery(slug: string) {
  return `*[_type == "service" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    _id, title, "slug": slug.current, subtitle, shortDescription, description,
    coverImage { ${IMAGE_FIELDS} }, imagePath,
    category-> { _id, name, "slug": slug.current, icon, color },
    preparation[], faqs[]{ q, a },
    subservices[] { title, description, image { ${IMAGE_FIELDS} } },
    featured, order
  }`;
}

// ── Salud page queries ──
export const HEALTH_ARTICLES_QUERY = `*[_type == "healthArticle" && !(_id in path("drafts.**"))] | order(order asc) {
  _id, title, "slug": slug.current, icon, color, description, fullContent, order
}`;

export const HEALTH_SETTINGS_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
  _id, healthPageTitle, healthPageDescription, healthFaqTitle, healthFaqDescription, healthFaqs[]{ q, a }
}`;

// ── Full siteSettings (for Footer/Navbar) ──
export const SITE_SETTINGS_FULL_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
  _id, companyName, slogan, tagline, logo { ${IMAGE_FIELDS} }, logoWhite { ${IMAGE_FIELDS} },
  phone, whatsapp, email, address, businessHours,
  facebookUrl, instagramUrl, linkedinUrl, tiktokUrl, youtubeUrl,
  mapLatitude, mapLongitude, mapZoom, seoTitle, seoDescription,
  footerDescription, servicesPageTitle, servicesPageDescription, servicesCtaTitle, servicesCtaDescription
}`;

// ── Legacy queries (kept for compatibility) ──
const PROJECT_FIELDS = `_id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, description, excerpt, client, location, year, area, status, tags[], videoMp4 { ${FILE_FIELDS} }, videoWebm { ${FILE_FIELDS} }, service-> { _id, title, "slug": slug.current }, featured, order`;
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`;
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc) { ${PROJECT_FIELDS} }[0..8]`;
export function projectBySlugQuery(slug: string) { return `*[_type == "project" && slug.current == "${slug}"][0] { ${PROJECT_FIELDS} }`; }

export const ALL_TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) { _id, name, "slug": slug.current, role, department, photo { ${IMAGE_FIELDS} }, bio, email, phone, linkedinUrl, order }`;
export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, project-> { _id, title, "slug": slug.current }, featured, order }`;
export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, project-> { _id, title, "slug": slug.current }, featured, order }[0..6]`;
export const ALL_PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) { _id, name, logo { ${IMAGE_FIELDS} }, url, order }`;
export const ALL_SERVICE_CATEGORIES_QUERY = `*[_type == "serviceCategory"] | order(order asc) { _id, name, "slug": slug.current, description, icon, color, flipTitle, flipServices[], flipCtaLabel, order }`;
export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color, flipTitle, flipServices[], flipCtaLabel }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }`;
export const FEATURED_SERVICES_QUERY = `*[_type == "service" && featured == true] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color, flipTitle, flipServices[], flipCtaLabel }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }[0..5]`;
export const ALL_HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(order asc) { _id, title, subtitle, backgroundImage { ${IMAGE_FIELDS} }, backgroundVideoMp4 { ${FILE_FIELDS} }, backgroundVideoWebm { ${FILE_FIELDS} }, posterImage { ${IMAGE_FIELDS} }, mobileFallbackImage { ${IMAGE_FIELDS} }, videoAutoplay, videoMuted, videoLoop, ctaLabel, ctaLink, ctaType, order }`;
export const ALL_STATS_QUERY = `*[_type == "stat"] | order(order asc) { _id, label, value, suffix, prefix, order }`;
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { _id, companyName, slogan, tagline, logo { ${IMAGE_FIELDS} }, logoWhite { ${IMAGE_FIELDS} }, ogImage { ${IMAGE_FIELDS} }, phone, whatsapp, email, address, businessHours, facebookUrl, instagramUrl, linkedinUrl, tiktokUrl, youtubeUrl, mapLatitude, mapLongitude, mapZoom, seoTitle, seoDescription }`;