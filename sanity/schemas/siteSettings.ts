// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings", title: "Configuración del Sitio", type: "document", icon: () => "⚙️",
  fields: [
    defineField({ name: "companyName", title: "Nombre de la Empresa", type: "string" }),
    defineField({ name: "slogan", title: "Slogan", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoWhite", title: "Logo Blanco", type: "image", options: { hotspot: true }, description: "Logo para fondos oscuros" }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", options: { hotspot: true }, description: "Imagen para compartir en redes sociales (1200x630)" }),
    defineField({ name: "phone", title: "Teléfono", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", description: "Número con código de país, sin +. Ej: 51944106163" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Dirección", type: "string" }),
    defineField({ name: "businessHours", title: "Horario", type: "string" }),
    defineField({ name: "facebookUrl", title: "Facebook", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url" }),
    defineField({ name: "mapLatitude", title: "Latitud del Mapa", type: "number" }),
    defineField({ name: "mapLongitude", title: "Longitud del Mapa", type: "number" }),
    defineField({ name: "mapZoom", title: "Zoom del Mapa", type: "number", initialValue: 15 }),
    defineField({ name: "seoTitle", title: "SEO Título", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Descripción", type: "text", rows: 3, description: "Máximo 160 caracteres" }),
    // — Home page sections —
    defineField({ name: "aboutDescription", title: "Texto Quiénes Somos", type: "text", rows: 4, description: "Párrafo principal de la sección 'Quiénes Somos'." }),
    defineField({ name: "aboutFeatures", title: "Características Quiénes Somos", type: "array", of: [{ type: "string" }], description: "Lista de features. Ej: Tecnología 4D, Ambiente Privado" }),
    defineField({ name: "servicesTitle", title: "Título Sección Servicios (Home)", type: "string" }),
    defineField({ name: "servicesDescription", title: "Descripción Sección Servicios (Home)", type: "text", rows: 2 }),
    defineField({ name: "ctaTitle", title: "Título CTA (Home)", type: "string" }),
    defineField({ name: "ctaDescription", title: "Descripción CTA (Home)", type: "text", rows: 2 }),
    defineField({ name: "footerDescription", title: "Texto del Footer", type: "text", rows: 2 }),
    // — Servicios page —
    defineField({ name: "servicesPageTitle", title: "Título Página Servicios", type: "string" }),
    defineField({ name: "servicesPageDescription", title: "Descripción Página Servicios", type: "text", rows: 2 }),
    defineField({ name: "servicesCtaTitle", title: "Título CTA Servicios", type: "string" }),
    defineField({ name: "servicesCtaDescription", title: "Descripción CTA Servicios", type: "text", rows: 2 }),
    // — Salud page —
    defineField({ name: "healthPageTitle", title: "Título Página Salud", type: "string" }),
    defineField({ name: "healthPageDescription", title: "Descripción Página Salud", type: "text", rows: 2 }),
    defineField({ name: "healthFaqTitle", title: "Título FAQ Salud", type: "string" }),
    defineField({ name: "healthFaqDescription", title: "Descripción FAQ Salud", type: "text", rows: 2 }),
    defineField({
      name: "healthFaqs", title: "Preguntas Frecuentes (Salud)", type: "array",
      of: [{ type: "object", title: "FAQ", fields: [
        { name: "q", title: "Pregunta", type: "string", validation: (R: any) => R.required() },
        { name: "a", title: "Respuesta", type: "text", rows: 3, validation: (R: any) => R.required() },
      ], preview: { select: { title: "q", subtitle: "a" } } }],
    }),
  ],
});
