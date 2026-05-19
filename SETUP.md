# Mi Piel Veracruz — Setup Guide

## Stack
- **Next.js 15** (App Router) + TypeScript
- **TailwindCSS** + Shadcn/UI
- **Prisma ORM** + PostgreSQL
- **NextAuth v5** (Google + Credentials)
- **Cloudinary** (imágenes)
- **Stripe** (pagos)
- **Framer Motion** (animaciones)
- **Nodemailer** (correos)

---

## 1. Prerequisitos

- Node.js 20+
- PostgreSQL (local o Railway/Supabase/Neon)
- Cuenta Cloudinary (gratis)
- Cuenta Stripe (modo test)
- Google OAuth credentials

---

## 2. Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
copy .env.example .env
```

---

## 3. Configurar variables de entorno

Edita `.env` y llena todos los valores:

### Base de datos
```
DATABASE_URL="postgresql://user:password@localhost:5432/mipiel_veracruz"
```

### NextAuth
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-con: openssl rand -base64 32"
```

### Google OAuth
1. Ve a https://console.cloud.google.com/
2. Crea un proyecto
3. Habilita Google OAuth
4. Crea credenciales OAuth 2.0
5. Agrega `http://localhost:3000/api/auth/callback/google` como redirect URI

```
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Cloudinary
1. Regístrate en https://cloudinary.com/
2. Ve a Dashboard > API Keys

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### Stripe (modo test)
1. Regístrate en https://stripe.com/
2. Ve a Developers > API Keys

```
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Email (Gmail)
1. Activa verificación en 2 pasos en tu cuenta Gmail
2. Ve a Seguridad > Contraseñas de aplicación
3. Genera una contraseña para "Correo"

```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tu@gmail.com"
SMTP_PASS="tu-app-password"
EMAIL_FROM="Mi Piel Veracruz <noreply@mipielveracruz.com>"
```

---

## 4. Base de datos

```bash
# Generar cliente de Prisma
npm run db:generate

# Crear tablas
npm run db:push

# Cargar datos de ejemplo
npm run db:seed
```

### Credenciales de demo (después del seed):
- **Admin:** admin@mipielveracruz.com / Admin123!
- **Cliente:** cliente@demo.com / Cliente123!

---

## 5. Iniciar desarrollo

```bash
npm run dev
```

Abre http://localhost:3000

---

## 6. Estructura del proyecto

```
app/
├── (marketing)/          # Landing page, servicios, blog
├── (auth)/               # Login, registro, recuperar contraseña
├── (dashboard)/          # Panel del cliente
├── admin/                # Panel de administración
├── agendar/              # Sistema de reservas
└── api/                  # API Routes

components/
├── ui/                   # Componentes Shadcn/UI
├── layout/               # Navbar, Footer
├── marketing/            # Secciones de la landing
├── dashboard/            # Componentes del dashboard
├── booking/              # Wizard de reservas
└── admin/                # Componentes del panel admin

lib/
├── prisma.ts             # Cliente Prisma
├── utils.ts              # Utilidades
├── cloudinary.ts         # Integración Cloudinary
├── stripe.ts             # Integración Stripe
├── email.ts              # Servicio de correos
├── ai.ts                 # Arquitectura IA (futura)
└── validations/          # Esquemas Zod

prisma/
├── schema.prisma         # Modelos de base de datos
└── seed.ts               # Datos de ejemplo
```

---

## 7. Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con SEO |
| `/servicios` | Catálogo de servicios |
| `/blog` | Blog SEO |
| `/agendar` | Sistema de reservas |
| `/login` | Inicio de sesión |
| `/register` | Registro de cliente |
| `/dashboard` | Panel del cliente |
| `/dashboard/citas` | Mis citas |
| `/dashboard/expediente` | Expediente médico + fotos |
| `/dashboard/historial` | Historial de sesiones |
| `/admin` | Panel de admin (solo ADMIN) |
| `/admin/agenda` | Calendario de citas |
| `/admin/clientes` | Gestión de clientes |

---

## 8. API Routes

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/appointments` | GET, POST | Citas |
| `/api/appointments/[id]` | PATCH, DELETE | Actualizar/cancelar cita |
| `/api/availability` | GET | Horarios disponibles |
| `/api/services` | GET, POST | Servicios |
| `/api/blog` | GET, POST | Blog |
| `/api/skin-photos` | GET, POST | Fotos de expediente |
| `/api/admin/stats` | GET | Métricas del admin |
| `/api/admin/clients` | GET | Lista de clientes |
| `/api/auth/register` | POST | Registro de usuario |

---

## 9. Integración IA (futura)

La arquitectura está lista en `lib/ai.ts`:
- `analyzeSkin(imageUrl)` — análisis de piel
- `chatWithDermatologyBot(messages)` — chatbot dermatológico
- Tablas en DB: `ai_conversations`, `ai_messages`, `ai_skin_analyses`

Para activar, instala `@anthropic-ai/sdk` y completa las funciones con la API de Anthropic.

---

## 10. Deploy a producción

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```

### Railway (PostgreSQL)
1. Crea una base de datos en https://railway.app/
2. Copia la `DATABASE_URL`
3. Corre `npm run db:push` y `npm run db:seed`

---

## Licencia
Proyecto privado — Mi Piel Veracruz © 2025
