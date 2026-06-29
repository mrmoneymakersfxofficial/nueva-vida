// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField, featuredField, statusField, categoryReferenceField } from "../lib/schema-master";

export default defineType({
  name: "project", title: "Proyecto", type: "document", icon: () => "🏗️",
  fields: [
    titleField("Título del Proyecto"),
    slugField("title"),
    defineField({ ...imageField("Imagen de Portada", true), name: "coverImage", title: "Imagen de Portada", description: "Se recomienda 1200×800px" }),
    defineField({ name: "gallery", title: "Galería", type: "array", of: [{ type: "image", options: { hotspot: true } }], description: "Imágenes adicionales del proyecto" }),
    descriptionField("Descripción Completa"),
    defineField({ name: "excerpt", title: "Resumen Corto", type: "text", rows: 2, description: "Breve descripción para tarjetas. Máximo 200 caracteres.", validation: (R: any) => R.max(200) }),
    defineField({ name: "client", title: "Cliente", type: "string" }),
    defineField({ name: "location", title: "Ubicación", type: "string" }),
    defineField({ name: "year", title: "Año", type: "string" }),
    defineField({ name: "area", title: "Área", type: "string", description: 'Ej: "15,000 m²"' }),
    statusField(),
    defineField({ name: "tags", title: "Etiquetas", type: "array", of: [{ type: "string" }], description: "Tags para filtrado" }),
    defineField({ name: "videoMp4", title: "Video MP4", type: "file", options: { accept: "video/mp4" }, description: "Archivo de video en formato MP4 para el portafolio." }),
    defineField({ name: "videoWebm", title: "Video WebM", type: "file", options: { accept: "video/webm" }, description: "Archivo de video en formato WebM (opcional, para mejor compatibilidad)." }),
    defineField({ name: "service", title: "Servicio Relacionado", type: "reference", to: [{ type: "service" }] }),
    featuredField("Proyecto Destacado", "Activa para mostrarlo en la sección principal"),
    orderField(),
  ],
  preview: { select: { title: "title", media: "coverImage", status: "status" }, prepare({ title, media, status }) { return { title, media, subtitle: status === "completed" ? "Completado" : status === "in-progress" ? "En Progreso" : "Planificado" }; } },
});
