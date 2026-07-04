// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "facility", title: "Instalación", type: "document", icon: () => "🏛️",
  fields: [
    defineField({ name: "imagePath", title: "Ruta de Imagen (local)", type: "string", description: "Ruta en /public. Ej: /instalaciones/instalacion-1.jpg" }),
    defineField({ name: "alt", title: "Texto Alternativo", type: "string" }),
    defineField({ name: "caption", title: "Leyenda", type: "string" }),
    orderField(),
  ],
  preview: { select: { title: "caption", subtitle: "imagePath" } },
});