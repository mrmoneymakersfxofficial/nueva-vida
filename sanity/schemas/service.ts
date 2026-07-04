// @ts-nocheck
import { defineField, defineType } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField, featuredField, categoryReferenceField } from "../lib/schema-master";

export default defineType({
  name: "service", title: "Servicio", type: "document", icon: () => "📐",
  fieldsets: [
    { name: "info", title: "ℹ️ Información Principal", description: "Título, imagen, categoría y descripción del servicio.", options: { collapsible: false } },
    { name: "detail", title: "📋 Detalle del Servicio", description: "Subtítulo, precio, duración, preparación y FAQs.", options: { collapsible: true, collapsed: false } },
    { name: "subservices", title: "🔧 Subservicios / Áreas", description: "Lista de subservicios o áreas de especialidad dentro de este servicio.", options: { collapsible: true, collapsed: true } },
    { name: "display", title: "👁️ Visualización", description: "Control de cómo se muestra el servicio en el sitio.", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    titleField("Nombre del Servicio"),
    slugField("title"),
    categoryReferenceField("serviceCategory", "Categoría de Servicio"),
    defineField({ ...imageField("Imagen de Portada", true), name: "coverImage", title: "Imagen de Portada", description: "Imagen panorámica para la cabecera del servicio. Se recomienda 1400×600px." }),
    descriptionField("Descripción del Servicio"),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string", fieldset: "detail", description: "Ej: Diagnóstico por Imagen, Control Prenatal" }),
    defineField({ name: "shortDescription", title: "Descripción Corta", type: "text", rows: 2, fieldset: "detail", description: "Para tarjetas y listas." }),
    defineField({ name: "price", title: "Precio", type: "string", fieldset: "detail", description: "Ej: Desde S/ 180" }),
    defineField({ name: "duration", title: "Duración", type: "string", fieldset: "detail", description: "Ej: 30 minutos" }),
    defineField({ name: "imagePath", title: "Ruta de Imagen (local)", type: "string", fieldset: "display", description: "Fallback imagen en /public. Ej: /ultrasound-service.jpg" }),
    defineField({ name: "preparation", title: "Preparación", type: "array", fieldset: "detail", of: [{ type: "string" }], description: "Instrucciones para el paciente." }),
    defineField({
      name: "faqs", title: "Preguntas Frecuentes", type: "array", fieldset: "detail",
      of: [{ type: "object", title: "FAQ", fields: [
        { name: "q", title: "Pregunta", type: "string", validation: (R: any) => R.required() },
        { name: "a", title: "Respuesta", type: "text", rows: 3, validation: (R: any) => R.required() },
      ], preview: { select: { title: "q", subtitle: "a" } } }],
    }),
    defineField({
      name: "subservices", title: "Subservicios / Áreas", fieldset: "subservices",
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
