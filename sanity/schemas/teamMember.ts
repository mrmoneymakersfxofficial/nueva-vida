// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField } from "../lib/schema-master";

export default defineType({
  name: "teamMember", title: "Miembro del Equipo", type: "document", icon: () => "👤",
  fields: [
    titleField("Nombre Completo"),
    slugField("name"),
    defineField({ name: "role", title: "Cargo", type: "string", validation: (R: any) => R.required() }),
    defineField({ name: "department", title: "Departamento", type: "string" }),
    defineField({ ...imageField("Foto"), name: "photo", title: "Foto", description: "Se recomienda 400×400px" }),
    descriptionField("Biografía"),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Teléfono", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    orderField(),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
