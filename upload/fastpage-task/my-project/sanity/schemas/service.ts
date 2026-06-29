// @ts-nocheck
import { defineField, defineType } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField, featuredField, categoryReferenceField } from "../lib/schema-master";

export default defineType({
  name: "service", title: "Servicio", type: "document", icon: () => "📐",
  fieldsets: [
    { name: "info", title: "ℹ️ Información Principal", description: "Título, imagen, categoría y descripción del servicio.", options: { collapsible: false } },
    { name: "detail", title: "🔧 Subservicios / Áreas", description: "Lista de subservicios o áreas de especialidad dentro de este servicio.", options: { collapsible: true, collapsed: false } },
    { name: "display", title: "👁️ Visualización", description: "Control de cómo se muestra el servicio en el sitio.", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    titleField("Nombre del Servicio"),
    slugField("title"),
    categoryReferenceField("serviceCategory", "Categoría de Servicio"),
    defineField({ ...imageField("Imagen de Portada", true), name: "coverImage", title: "Imagen de Portada", description: "Imagen panorámica para la cabecera del servicio. Se recomienda 1400×600px." }),
    descriptionField("Descripción del Servicio"),
    defineField({
      name: "subservices", title: "Subservicios / Áreas", fieldset: "detail",
      description: "Lista de subservicios, especialidades o áreas incluidas.",
      type: "array",
      of: [{ type: "object", title: "Subservicio", fields: [
        { name: "title", title: "Nombre del Subservicio", type: "string", validation: (Rule: any) => Rule.required().max(80) },
        { name: "description", title: "Descripción Corta", type: "text", rows: 2, validation: (Rule: any) => Rule.max(200).optional() },
        { name: "image", title: "Imagen del Subservicio", type: "image", options: { hotspot: true } },
      ], preview: { select: { title: "title", subtitle: "description", media: "image" } } }],
      validation: (Rule) => Rule.max(12).error("Máximo 12 subservicios por servicio."),
    }),
    featuredField("Servicio Destacado", "Activa para mostrarlo en secciones principales del sitio."),
    orderField(),
  ],
  preview: { select: { title: "title", category: "category.name", media: "coverImage", featured: "featured" }, prepare({ title, category, media, featured }) { return { title: featured ? `⭐ ${title}` : title, subtitle: category || "Sin categoría", media }; } },
});
