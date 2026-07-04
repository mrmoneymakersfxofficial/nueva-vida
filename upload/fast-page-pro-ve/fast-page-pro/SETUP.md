# 🚀 Fast Page Pro — Template de Sanity + Visual Editing

Plantilla autoadministrable con **Sanity CMS** y **Visual Editing** en Presentation Tool,
lista para cualquier negocio. Extrae el ZIP, configura las variables de entorno y listo.

---

## 📋 Requisitos Previos

- **Node.js** 18+ (recomendado: 20 LTS)
- **npm** o **bun**
- **Cuenta en Sanity** (gratuita hasta 100K API requests/mes): https://www.sanity.io/signup
- **Cuenta en Vercel** (opcional, para deploy): https://vercel.com

---

## ⚡ Setup en 5 minutos

### Paso 1: Crear proyecto en Sanity

1. Ve a https://www.sanity.io/manage y crea un nuevo proyecto
2. Anota el **Project ID** (ej: `abc123def`)
3. El dataset por defecto es `production`

### Paso 2: Obtener API Tokens

1. En tu proyecto de Sanity, ve a **API > Tokens**
2. Crea un token con permisos de **lectura** (Read)
3. Crea otro token con permisos de **lectura** pero marcalo como **public**
4. También puedes usar: https://www.sanity.io/manage/project/TU_ID/api > **Add API Token**

### Paso 3: Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=tkn_xxxxxxxx
NEXT_PUBLIC_SANITY_API_READ_TOKEN=tkn_xxxxxxxx
NEXT_PUBLIC_COMPANY_NAME=Mi Negocio
NEXT_PUBLIC_SITE_URL=https://mi-negocio.com
```

### Paso 4: Instalar y ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` para ver el sitio.
Abre `http://localhost:3000/admin` para acceder al Sanity Studio CMS.

### Paso 5: Deploy en Vercel

```bash
npx vercel
```

O conecta tu repositorio de GitHub a Vercel para deploy automático.

**Variables de entorno en Vercel:**
Ve a **Settings > Environment Variables** en tu proyecto de Vercel y agrega todas las variables de `.env.local`.

---

## 🖼️ Visual Editing — Presentation Tool

El template incluye **Visual Editing** completamente funcional:

### Cómo funciona
1. Entra a **http://tu-sitio.com/admin** (Sanity Studio)
2. En el panel izquierdo, haz clic en el icono de **Presentación** (el que parece un ojo/dispositivo)
3. Se abrirá el **Presentation Tool** mostrando tu sitio web
4. Haz clic en cualquier texto, imagen o elemento editable → se abrirá el editor directo
5. Los cambios se reflejan **en tiempo real** en la vista previa

### Arquitectura del VE (Visual Editing)

```
┌─────────────────────────────────────────────────────┐
│  Sanity Studio (/admin)                              │
│  ┌───────────────────────────────────────────────┐  │
│  │  Presentation Tool (iframe)                    │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  Tu sitio Next.js (con overlay VE)      │  │  │
│  │  │  - data-sanity attributes               │  │  │
│  │  │  - Click-to-edit                         │  │  │
│  │  │  - Live refresh via SanityLive           │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Componentes clave del VE

| Archivo | Función |
|---------|---------|
| `src/components/VisualEditing.tsx` | Overlay VE — **SOLO** se rendera dentro de iframes (Presentation Tool). En el sitio público no aparece nada. |
| `src/components/SanityLiveWithToken.tsx` | Live refresh — Escucha cambios en Sanity via EventSource y recarga la página automáticamente en modo draft. |
| `src/lib/ve.ts` | Helper `ve(id, type, path)` — Genera atributos `data-sanity` para click-to-edit. |
| `src/lib/fetchCMS.ts` | Fetch wrapper — Usa `sanityFetch` con stega en modo draft, cliente publicado en modo normal. |
| `src/sanity/live.ts` | Configuración de `defineLive` de next-sanity para live content. |
| `src/app/api/draft-mode/enable/route.ts` | Activa el modo draft (usado por Presentation Tool). |
| `src/app/api/draft-mode/disable/route.ts` | Desactiva el modo draft. |
| `src/app/api/sanity-token/route.ts` | Expone el token de lectura al browser para live refresh (solo en draft). |

### Agregar VE a un nuevo componente

Importa el helper y úsalo en cualquier elemento editable:

```tsx
import { ve } from '@/lib/ve';

// En tu componente:
<h2 {...ve(documentId, 'heroSlide', 'title')}>
  {data.title}
</h2>
<img {...ve(documentId, 'project', 'coverImage')} src={imgUrl} alt={data.title} />
```

**Parámetros de `ve()`:**
- `id`: El `_id` del documento en Sanity
- `type`: El `_type` del documento (ej: `heroSlide`, `project`, `service`)
- `path`: El campo del documento (ej: `title`, `coverImage`, `description`)

### Iframe Guard (importante)

El componente `VisualEditing.tsx` usa un **iframe guard**:
```tsx
// Solo rendera el overlay si estamos dentro de un iframe (Presentation Tool)
window.self !== window.top → muestra overlay
// En el sitio público (no iframe) → retorna null, sin overlay
```

Esto garantiza que el sitio público NUNCA muestre bordes de edición, badges, ni UI del CMS.

---

## 📁 Estructura del Proyecto

```
fast-page-pro/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (SanityLive + VisualEditing)
│   │   ├── page.tsx                # Homepage
│   │   ├── servicios/
│   │   │   ├── page.tsx            # Página de servicios (listado)
│   │   │   └── [slug]/page.tsx     # Detalle de servicio por categoría
│   │   ├── proyectos/
│   │   │   ├── page.tsx            # Portafolio de proyectos
│   │   │   └── [slug]/page.tsx     # Detalle de proyecto
│   │   ├── admin/[[...tool]]/      # Sanity Studio (embebido)
│   │   └── api/
│   │       ├── draft-mode/enable/  # Activar modo draft
│   │       ├── draft-mode/disable/ # Desactivar modo draft
│   │       └── sanity-token/       # Token para live refresh
│   ├── components/
│   │   ├── VisualEditing.tsx       # Overlay VE (iframe guard)
│   │   ├── SanityLiveWithToken.tsx # Live refresh component
│   │   ├── Header.tsx              # Header/navigation
│   │   ├── Footer.tsx              # Footer con datos de siteSettings
│   │   ├── LayoutShell.tsx         # Layout wrapper
│   │   ├── HomePage.tsx            # Homepage renderer
│   │   ├── ServicesPage.tsx        # Página de servicios
│   │   ├── ServiceDetailPage.tsx   # Detalle de servicio (3 bloques)
│   │   ├── ServiciosSection.tsx    # Sección flip cards (homepage)
│   │   ├── ProjectsPage.tsx        # Portafolio
│   │   ├── ProjectDetailPage.tsx   # Detalle de proyecto
│   │   ├── Lightbox.tsx            # Lightbox para imágenes
│   │   ├── ScrollReveal.tsx        # Animaciones de scroll
│   │   └── ui/                     # Componentes shadcn/ui
│   ├── lib/
│   │   ├── sanity.client.ts        # Cliente Sanity + tipos + helpers
│   │   ├── sanity.queries.ts       # Queries GROQ
│   │   ├── fetchCMS.ts             # Fetch wrapper con draft/published
│   │   ├── ve.ts                   # Helper data-sanity attributes
│   │   └── projectHelpers.ts       # Helpers de proyecto
│   └── sanity/
│       └── live.ts                 # defineLive config
├── sanity/
│   ├── config.ts                   # Sanity Studio config (VE + Presentation)
│   ├── schema.ts                   # Export de schemas
│   ├── lib/
│   │   ├── constants.ts            # Brand colors, site URL, company name
│   │   └── schema-master.ts        # Field helpers reutilizables
│   └── schemas/
│       ├── siteSettings.ts         # Configuración global del sitio
│       ├── heroSlide.ts            # Slides del hero
│       ├── stat.ts                 # Estadísticas
│       ├── partner.ts              # Socios/clientes
│       ├── serviceCategory.ts      # Categorías de servicio
│       ├── service.ts              # Servicios individuales
│       ├── project.ts              # Proyectos/portafolio
│       ├── teamMember.ts           # Miembros del equipo
│       ├── testimonial.ts          # Testimonios
│       └── guia.ts                 # Guía de uso en Studio
├── public/                         # Assets estáticos
├── .env.example                    # Template de variables de entorno
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🗃️ Schemas Disponibles

| Schema | Tipo | Descripción |
|--------|------|-------------|
| `siteSettings` | Singleton | Datos del sitio: nombre, logo, redes sociales, SEO, mapa |
| `heroSlide` | Document | Slides del hero con imagen/video de fondo y CTA |
| `stat` | Document | Estadísticas numéricas con prefijo/sufijo |
| `partner` | Document | Logos de socios/clientes |
| `serviceCategory` | Document | Categorías de servicio (con flip card fields) |
| `service` | Document | Servicios individuales con subservicios |
| `project` | Document | Proyectos con galería, video, ubicación |
| `teamMember` | Document | Equipo con foto, bio, contacto |
| `testimonial` | Document | Testimonios con calificación y foto |
| `studioGuide` | Singleton | Guía de uso embebida en el Studio |

---

## 🎨 Personalización

### Colores de Marca

Edita `sanity/lib/constants.ts`:

```ts
export const BRAND_COLORS = {
  primary: "#004691",   // Tu color principal
  accent: "#D4AF37",    // Tu color de acento
  dark: "#001C3D",      // Tu color oscuro
} as const;
```

Estos colores se aplican automáticamente al Sanity Studio y al sitio.

### Logo y Favicon

1. Sube tu logo en **CMS > Configuración > Logo** y **Logo Blanco**
2. Reemplaza los archivos en `public/`:
   - `favicon.svg` — Favicon SVG
   - `favicon.png` — Favicon PNG 64x64
   - `apple-touch-icon.png` — Apple touch icon 180x180

### Datos del Sitio

Todo se configura desde el CMS en **Configuración del Sitio**:
- Nombre de la empresa
- Teléfono, email, WhatsApp
- Redes sociales
- Dirección y mapa
- SEO (título y descripción)

---

## 🔧 Modificar para un Negocio Diferente

### Cambiar los servicios
1. Edita los **Categorías de Servicio** en el CMS
2. Agrega/elimina servicios individuales bajo cada categoría
3. Los cambios se reflejan automáticamente en el sitio

### Cambiar el portafolio
1. Agrega **Proyectos** en el CMS con imágenes y descripción
2. Marca como **Destacado** para mostrar en la página principal

### Agregar nuevas secciones
1. Crea un nuevo schema en `sanity/schemas/`
2. Agrégalo a `sanity/schema.ts`
3. Crea los queries GROQ en `src/lib/sanity.queries.ts`
4. Agrega las `locations` en `sanity.config.ts` para el Presentation Tool
5. Crea el componente React con atributos `data-sanity` vía `ve()`

### Renombrar el Sanity Studio
Edita `sanity/lib/constants.ts`:
```ts
export const STUDIO_TITLE = "Mi Negocio CMS";
```

---

## 🐛 Troubleshooting

### El Presentation Tool no carga
- Verifica que `NEXT_PUBLIC_SITE_URL` esté configurada correctamente
- En desarrollo usa `http://localhost:3000`
- En producción usa `https://tu-dominio.com`

### El overlay de VE no aparece
- Solo aparece dentro del Presentation Tool (iframe)
- Verifica que estés en modo draft (`/admin/presentation`)
- Revisa que `SANITY_API_READ_TOKEN` esté configurado

### Las imágenes no cargan
- Verifica que las imágenes se hayan subido correctamente en el CMS
- Los campos de imagen requieren hacer clic y subir un archivo

### Los cambios no se reflejan
- Presiona el botón **Publicar** en el CMS para guardar cambios
- En modo Presentation Tool, la página se recarga automáticamente
- Si no, espera 3 segundos (reconexión automática del Live API)

---

## 📄 Licencia

Template proporcionado por Fast Page Pro. Uso libre para proyectos comerciales y personales.
