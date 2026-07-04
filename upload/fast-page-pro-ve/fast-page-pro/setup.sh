#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  FASTPAGEPRO — Script de instalación rápida
#  Uso: chmod +x setup.sh && ./setup.sh
# ═══════════════════════════════════════════════════════════════

set -e
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        FASTPAGEPRO — Configuración Rápida           ║${NC}"
echo -e "${CYAN}║     Plantilla lista para cualquier negocio          ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# ─── 1. SANITY ───
echo -e "${YELLOW}[1/4] Sanity CMS${NC}"
echo "Necesitas un proyecto en Sanity (https://www.sanity.io/manage)."
echo "Si ya tienes uno, pega los valores. Si no, créalo ahí y vuelve."
echo ""

read -p "  Sanity Project ID: " SANITY_PROJECT_ID
read -p "  Sanity Dataset (default: production): " SANITY_DATASET
SANITY_DATASET=${SANITY_DATASET:-production}
read -p "  Sanity API Token (opcional, Enter para omitir): " SANITY_API_TOKEN

# ─── 2. NEGOCIO ───
echo ""
echo -e "${YELLOW}[2/4] Datos del Negocio${NC}"
read -p "  Nombre del negocio: " BIZ_NAME
read -p "  Eslogan corto: " BIZ_SLOGAN
read -p "  Teléfono (ej: +51 999 999 999): " BIZ_PHONE
read -p "  WhatsApp (sin + ni espacios, ej: 51999999999): " BIZ_WA
read -p "  Email: " BIZ_EMAIL
read -p "  Dirección: " BIZ_ADDRESS
read -p "  URL del sitio (ej: https://miejemplo.com): " BIZ_URL

# ─── 3. COLORES ───
echo ""
echo -e "${YELLOW}[3/4] Colores${NC} (presiona Enter para usar los por defecto)"
read -p "  Color principal (default: #004691): " COLOR_PRIMARY
COLOR_PRIMARY=${COLOR_PRIMARY:-#004691}
read -p "  Color de acento (default: #d4a017): " COLOR_ACCENT
COLOR_ACCENT=${COLOR_ACCENT:-#d4a017}

# ─── 4. ESCRIBIR .ENV ───
echo ""
echo -e "${YELLOW}[4/4] Generando archivos...${NC}"

ENV_FILE=".env.local"
cat > "$ENV_FILE" << EOF
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="${SANITY_PROJECT_ID}"
NEXT_PUBLIC_SANITY_DATASET="${SANITY_DATASET}"
SANITY_API_TOKEN="${SANITY_API_TOKEN}"
NEXT_PUBLIC_SANITY_STUDIO_URL="https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01"
NEXT_PUBLIC_SANITY_READ_TOKEN="${SANITY_API_TOKEN}"
EOF

echo -e "  ${GREEN}✓${NC} $ENV_FILE creado"

# ─── SUMMARY ───
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ¡Configuración completada!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
echo "  Siguientes pasos:"
echo ""
echo "  1. Edita template.config.ts con los datos exactos del negocio."
echo "  2. Reemplaza los archivos en /public/:"
echo "     - sertrade-logo.png / .svg  →  Logo del cliente"
echo "     - favicon.png / .svg        →  Favicon del cliente"
echo "     - og-*.jpg / og-*.png      →  Open Graph images"
echo "     - /public/images/services/  →  Imágenes de servicios"
echo "     - /public/img/clients/      →  Logos de clientes"
echo ""
echo "  3. Personaliza los textos en template.config.ts"
echo "  4. Ejecuta:"
echo "     npm install"
echo "     npm run dev"
echo ""
echo "  5. Visita http://localhost:3000 para ver el sitio."
echo "  6. Visita http://localhost:3000/admin para el CMS."
echo ""
echo "  7. En el CMS, ve a presentation tool para editar"
echo "     contenido directamente con Visual Editing."
echo ""
echo -e "  ${CYAN}Documentación completa: SETUP.md${NC}"
echo ""