// @ts-nocheck
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import {
  PackageIcon, HomeIcon, CogIcon, BookIcon, StackIcon,
  UsersIcon, MessageSquareIcon, BarChartIcon, DashboardIcon,
} from "@sanity/icons";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE, SITE_URL, BRAND_COLORS } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "fast-page-pro-studio",
  title: STUDIO_TITLE,
  projectId,
  dataset,
  basePath: "/admin",
  releases: { enabled: false },
  plugins: [
    structureTool({
      structure: (S) => {
        return S.list().title("Panel de Control").items([
          S.listItem().title("Inicio").icon(DashboardIcon).id("home-group").child(
            S.list().title("Inicio").items([
              S.listItem().title("Hero (Slides)").icon(StackIcon).id("hero-slides").child(
                S.documentTypeList("heroSlide").title("Slides del Hero").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Estadísticas").icon(BarChartIcon).id("stats-list").child(
                S.documentTypeList("stat").title("Estadísticas").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Socios / Clientes").icon(UsersIcon).id("partners-list").child(
                S.documentTypeList("partner").title("Socios / Clientes").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            ]),
          ),
          S.listItem().title("Servicios").icon(PackageIcon).id("services-group").child(
            S.list().title("Servicios").items([
              S.listItem().title("Categorías").icon(StackIcon).id("service-categories-list").child(
                S.documentTypeList("serviceCategory").title("Categorías").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              ...S.documentTypeListItems().filter((item) => item.getId() === "service"),
            ]),
          ),
          ...S.documentTypeListItems().filter((item) => item.getId() === "project"),
          ...S.documentTypeListItems().filter((item) => item.getId() === "teamMember"),
          ...S.documentTypeListItems().filter((item) => item.getId() === "testimonial"),
          S.listItem().title("Configuración del Sitio").icon(CogIcon).id("settings-group").child(
            S.list().title("Configuración").items([
              S.listItem().title("Datos del Sitio").icon(HomeIcon).id("site-settings-editor").child(
                S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración"),
              ),
            ]),
          ),
          S.listItem().title("Guía de Uso").icon(BookIcon).id("guide-group").child(
            S.document().schemaType("studioGuide").documentId("studio-guide").title("Guía Paso a Paso"),
          ),
        ]);
      },
    }),
    presentationTool({
      document: { actions: [] },
      previewUrl: {
        initial: process.env.NODE_ENV === "development" ? "http://localhost:3000" : SITE_URL,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          heroSlide: defineLocations({ type: "heroSlide", resolve: () => ({ locations: [{ title: "Hero / Inicio", href: "/#inicio" }] }) }),
          stat: defineLocations({ type: "stat", resolve: () => ({ locations: [{ title: "Nuestros Numeros", href: "/#numeros" }] }) }),
          partner: defineLocations({ type: "partner", resolve: () => ({ locations: [{ title: "Nuestros Clientes", href: "/#clientes" }] }) }),
          serviceCategory: defineLocations({ type: "serviceCategory", resolve: (doc) => ({ locations: [{ title: "Servicios", href: "/servicios" }, { title: `Categoria: ${doc.name || ""}`, href: `/servicios#${doc.slug?.current || ""}` }] }) }),
          service: defineLocations({ type: "service", resolve: (doc) => ({ locations: [{ title: "Servicios", href: "/servicios" }, { title: `Servicio: ${doc.title || ""}`, href: `/servicios#${doc.slug?.current || ""}` }] }) }),
          project: defineLocations({ type: "project", resolve: (doc) => ({ locations: [{ title: "Proyectos", href: "/proyectos" }, { title: `Proyecto: ${doc.title || ""}`, href: `/proyectos/${doc.slug?.current || doc.slug || ""}` }] }) }),
          teamMember: defineLocations({ type: "teamMember", resolve: () => ({ locations: [{ title: "Nosotros", href: "/#nosotros" }] }) }),
          testimonial: defineLocations({ type: "testimonial", resolve: () => ({ locations: [{ title: "Inicio", href: "/" }] }) }),
          siteSettings: defineLocations({ type: "siteSettings", resolve: () => ({ locations: [{ title: "Inicio (Header + Hero)", href: "/" }, { title: "Nosotros", href: "/#nosotros" }, { title: "Contacto (Footer)", href: "/#contacto" }, { title: "Servicios", href: "/servicios" }, { title: "Proyectos", href: "/proyectos" }] }) }),
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: { unsavedChanges: { warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?" } },
  form: { image: { directUploads: true } },
  theme: { "--brand-primary": BRAND_COLORS.primary, "--brand-accent": BRAND_COLORS.accent, "--brand-dark": BRAND_COLORS.dark } as React.CSSProperties,
});
