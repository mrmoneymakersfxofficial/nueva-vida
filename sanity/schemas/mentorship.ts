// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, imageField, orderField } from "../lib/schema-master";

export default defineType({
  name: "mentorship", title: "Mentoría / Formación", type: "document", icon: () => "🎓",
  fields: [
    titleField("Título de la Formación"),
    slugField("title"),
    defineField({ name: "institution", title: "Institución", type: "string" }),
    defineField({ name: "location", title: "Ubicación", type: "string" }),
    defineField({ name: "flag", title: "Bandera (Emoji)", type: "string", description: "Ej: 🇦🇷" }),
    { ...imageField("Imagen Principal"), name: "image", title: "Imagen Principal" },
    defineField({ name: "imagePath", title: "Ruta de Imagen (local)", type: "string", description: "Fallback si no hay imagen subida. Ej: /doctores/dr-elias-1.jpg" }),
    defineField({ name: "galleryImages", title: "Imágenes de Galería", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "galleryPaths", title: "Rutas de Galería (local)", type: "array", of: [{ type: "string" }], description: "Fallback rutas locales para galería." }),
    defineField({ name: "galleryLabel", title: "Texto del Botón Galería", type: "string", initialValue: "Ver galería" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 4 }),
    orderField(),
  ],
  preview: { select: { title: "title", subtitle: "institution", media: "image" } },
});