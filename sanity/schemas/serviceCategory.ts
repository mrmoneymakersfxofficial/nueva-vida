// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, orderField } from "../lib/schema-master";

export default defineType({
  name: "serviceCategory", title: "Categoría de Servicio", type: "document", icon: () => "📂",
  fields: [
    titleField("Nombre de la Categoría"),
    slugField("name"),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "icon", title: "Icono", type: "string", description: "Nombre del icono Lucide. Ej: pencil-ruler, wrench, zap" }),
    defineField({ name: "color", title: "Color", type: "string", description: "Color hex. Ej: #004691" }),
    defineField({
      name: "flipTitle", title: "Título del Reverso (Card Back)", type: "string",
      description: "Título que se muestra al girar la tarjeta en la sección 'Nuestros Servicios' del inicio. Si se deja vacío, se usa el nombre de la categoría.",
    }),
    defineField({
      name: "flipServices", title: "Servicios del Reverso (Card Back)", type: "array",
      of: [{ type: "string" }],
      description: "Lista de servicios o descripciones que aparecen al girar la tarjeta. Si se deja vacío, se usan los títulos de los servicios de esta categoría.",
      validation: (Rule: any) => Rule.max(6).error('Máximo 6 items en el reverso de la tarjeta.'),
    }),
    defineField({
      name: "flipCtaLabel", title: "Texto del Botón del Reverso", type: "string",
      description: 'Texto del botón CTA en el reverso de la tarjeta. Por defecto: "CONOCER MÁS".',
      initialValue: "CONOCER MÁS",
    }),
    orderField(),
  ],
  preview: { select: { title: "name", color: "color", flipTitle: "flipTitle" }, prepare({ title, color, flipTitle }) { return { title: title || "Sin nombre", subtitle: flipTitle || color || "" }; } },
});
