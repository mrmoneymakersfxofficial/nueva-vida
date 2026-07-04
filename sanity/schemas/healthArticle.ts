// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, orderField } from "../lib/schema-master";

export default defineType({
  name: "healthArticle", title: "Artículo de Salud", type: "document", icon: () => "🏥",
  fields: [
    titleField("Título"),
    slugField("title"),
    defineField({ name: "icon", title: "Icono", type: "string", description: "Nombre del icono Lucide. Ej: heart, baby, shield, stethoscope" }),
    defineField({ name: "color", title: "Color de Fondo", type: "string", description: "Clases Tailwind. Ej: from-pink-500/10 to-rose-500/10", initialValue: "from-cyan-500/10 to-sky-500/10" }),
    defineField({ name: "description", title: "Descripción Breve", type: "text", rows: 3 }),
    defineField({ name: "fullContent", title: "Contenido Completo", type: "array", of: [{ type: "block" }] }),
    orderField(),
  ],
  preview: { select: { title: "title", subtitle: "icon" } },
});