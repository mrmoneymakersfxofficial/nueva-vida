# ═══════════════════════════════════════════════════════════════════════
#  FASTPAGEPRO — FULL TASK CONTEXT
#  Instrucciones para GLM: Lee este archivo y ejecuta sin preguntar.
#  El usuario te dará el nombre del negocio y datos básicos.
#  Tú debes adaptar TODO el proyecto automáticamente.
# ═══════════════════════════════════════════════════════════════════════

## QUÉ ES ESTE PROYECTO

Un sitio web corporativo completo con Sanity CMS embebido, Visual Editing,
y deploy automático a Vercel. Incluye: homepage con hero video, servicios
con flip cards, portafolio con video real, páginas dinámicas, y panel CMS.

Tech: Next.js 16 (App Router) + Sanity v3 + Tailwind CSS 4 + Framer Motion + shadcn/ui.

## LO QUE DEBES HACER (EN ORDEN)

El usuario te proporcionará:
- Nombre del negocio
- Rubro/industria (ej: joyería, restaurante, clínica, constructora)
- Teléfono / WhatsApp
- Email
- Dirección
- Colores preferidos (opcional)

Con esa información, debes modificar los archivos listados abajo.

## ARCHIVOS QUE DEBES MODIFICAR

### 1. template.config.ts
Archivo de configuración central. Cambiar:
- `businessName` → nombre del negocio
- `businessNameShort` → nombre corto
- `slogan` → eslogan del negocio
- `tagline` → descripción corta
- `description` → descripción completa
- `phone` → teléfono formateado
- `phoneRaw` → teléfono sin formato (para wa.me links)
- `whatsapp` → número de WhatsApp
- `email` → email del negocio
- `address` → dirección
- `siteUrl` → URL del sitio (si la sabe)
- `seoTitle` → título SEO
- `seoDescription` → descripción SEO
- `colors.primary` → color principal del negocio
- `colors.accent` → color de acento
- `navItems` → items de navegación según las secciones que tenga

### 2. .env.local (CREAR desde .env.example)
```
NEXT_PUBLIC_SANITY_PROJECT_ID="<project-id-del-usuario>"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="<token-del-usuario>"
NEXT_PUBLIC_SANITY_STUDIO_URL="https://<project-id>.api.sanity.io/v2024-01-01"
NEXT_PUBLIC_SANITY_READ_TOKEN="<token-del-usuario>"
```

### 3. src/components/LayoutShell.tsx
Cambiar todas las referencias hardcodeadas:
- Nombre del negocio en el header/footer
- Links de WhatsApp (busca `wa.me/` y reemplaza el número)
- Links de email
- Textos del footer
- NO tocar los créditos de FastPagePro

### 4. src/components/Header.tsx
- Nombre del logo/negocio
- Links de navegación (si cambian)

### 5. src/components/Footer.tsx
- Nombre del negocio, dirección, teléfono, email
- Links de redes sociales
- Textos legales si aplican

### 6. src/components/HomePage.tsx
- Textos estáticos del hero (si los hay como fallback)
- Links de WhatsApp (buscar `wa.me/`)
- Textos de secciones estáticas
- Datos de fallback de servicios, proyectos, stats, partners
- Links de email

### 7. src/components/ServiciosSection.tsx
- `fallbackCards` → textos de los 3 servicios genéricos del rubro
- Icons (seleccionar de lucide-react según el rubro)
- Textos del header de sección

### 8. src/components/ServicesPage.tsx
- `fallbackServiceModules` → datos de ejemplo del rubro
- Textos del hero, CTA, etc.
- Nombres de categorías según el negocio

### 9. src/components/ProjectsPage.tsx
- `fallbackProjects` → datos de ejemplo del rubro (3-6 proyectos)
- Categorías de filtro (`categories` array)
- Textos del hero, CTA

### 10. src/components/ProjectDetailPage.tsx
- `fallbackProjects` → mismos datos que ProjectsPage
- Textos estáticos

### 11. src/app/page.tsx
- Si tiene datos hardcodeados, actualizar

### 12. src/app/servicios/page.tsx y src/app/proyectos/page.tsx
- Metadata (title, description) si están hardcodeados

### 13. src/app/proyectos/[slug]/page.tsx
- Metadata

### 14. src/app/layout.tsx
- Metadata global (title, description)

### 15. public/ (IMÁGENES)
Indicar al usuario que debe reemplazar:
- `sertrade-logo.png`, `sertrade-logo.svg`, `sertrade-logo-white.png`
- `favicon.png`, `favicon.svg`
- `og-*.jpg`, `og-*.png`
- `images/services/*.jpg`
- `img/clients/*.png`

### 16. globals.css
- Variables CSS de colores si están definidas allí

## COLORES — REGLAS DE REEMPLAZO

Cuando el usuario proporcia colores nuevos, buscar y reemplazar:

| Color actual | Dónde aparece | Qué hacer |
|---|---|---|
| `#004691` | Primary blue | Reemplazar por color primario del nuevo negocio |
| `#0062b8` | Primary hover | Generar variante más clara del primario |
| `#d4a017` / `#C5960C` | Accent gold | Reemplazar por color de acento |
| `#bfa032` | Accent hover | Generar variante más oscura del acento |
| `#001C3D` | Dark navy | Variante muy oscura del primario |
| `#25D366` | WhatsApp green | MANTENER igual (es el color de WhatsApp) |

Buscar estos colores en: globals.css, todos los .tsx en components/, tailwind.config.ts

## WHATSAPP LINK FORMAT

Todos los links de WhatsApp usan el formato:
```
https://wa.me/NUMERO_SIN_MAS?text=TEXTO_CODIFICADO
```
Ejemplo: `https://wa.me/51944106163?text=Hola%2C%20necesito...`

Reemplazar `51944106163` por el número del nuevo negocio en TODOS los archivos.

## SANTITY CMS — NO MODIFICAR SCHEMAS

Los schemas en `/sanity/schemas/` están diseñados para ser genéricos:
- `siteSettings` → datos generales del sitio (se configuran desde el CMS)
- `heroSlide` → slides del hero
- `service` / `serviceCategory` → servicios
- `project` → proyectos/portafolio
- `stat` → estadísticas numéricas
- `partner` → logos de clientes
- `teamMember` → equipo
- `testimonial` → testimonios

NO modificar los schemas. El contenido se gestiona desde el CMS admin.

## ESTRUCTURA DE CARPETAS CLAVE

```
src/
  app/                    # Páginas (Next.js App Router)
    admin/                # Sanity Studio embebido
    api/                  # Endpoints (debug, draft-mode, token)
    proyectos/[slug]/     # Páginas dinámicas de proyectos
  components/             # Todos los componentes React
    ui/                   # shadcn/ui (NO TOCAR)
    VisualEditing.tsx     # Overlay VE con iframe guard (NO TOCAR)
  lib/
    ve.ts                 # Helper VE (NO TOCAR)
    sanity.client.ts      # Tipos + helpers (NO TOCAR las funciones)
    sanity.queries.ts     # GROQ queries (NO TOCAR)
sanity/
  schemas/                # Content types (NO TOCAR)
  lib/schema-master.ts    # Fields reutilizables (NO TOCAR)
```

## VISUAL EDITING — NO TOCAR

El sistema de Visual Editing está configurado correctamente:
- `VisualEditing.tsx` → solo renderiza en iframe (CMS), nunca en web pública
- `ve.ts` → helper que genera `data-sanity` attributes
- Layout → renderiza VE solo cuando `isDraftMode` es true
- `/api/draft-mode/enable` → acepta cualquier redirect URL

NO modificar estos archivos bajo ninguna circunstancia.

## VIDEO EN PORTAFOLIO — NO TOCAR

El sistema de video funciona así:
- Los proyectos tienen campos `videoMp4` y `videoWebm` en el schema
- Las GROQ queries ya los fetchean
- El componente renderiza `<video>` real con autoplay por scroll (IntersectionObserver)
- Si no hay video, muestra poster + play icon (fallback para YouTube/Vimeo)
- `e.stopPropagation()` en clicks para no interferir con VE overlay

NO modificar la lógica de video.

## FLIP CARDS — CAMBIAR SOLO FALLBACK TEXTS

Las tarjetas de servicio tienen:
- Debounce de 400ms (no giran inmediatamente)
- Campos editables desde CMS: `flipTitle`, `flipServices[]`, `flipCtaLabel`
- VE overlay en front y back

Solo cambiar los `fallbackCards` en `ServiciosSection.tsx` con textos del rubro.

## DEPLOY

```bash
npm install
npm run dev          # Desarrollo local
npx vercel          # Deploy a producción
```

## CHECKLIST FINAL (verificar antes de entregar)

- [ ] Todos los colores actualizados
- [ ] Nombre del negocio en header + footer
- [ ] WhatsApp links actualizados
- [ ] Email actualizado
- [ ] Teléfono actualizado
- [ ] Fallback data adaptada al rubro
- [ ] SEO metadata actualizada
- [ ] Build sin errores: `npx next build`
- [ ] Sitio funciona en `npm run dev`
- [ ] CMS funciona en `/admin`
- [ ] NO hay overlay VE en la web pública
- [ ] Créditos de FastPagePro intactos