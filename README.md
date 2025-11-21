# Tienda Online Plantilla

Una plantilla completa de tienda online moderna construida con **Strapi** (backend) y **Astro + React** (frontend).

## 📋 Características

- ✅ Backend CMS con Strapi v5
- ✅ Frontend moderno con Astro + React
- ✅ Carrito de compras funcional
- ✅ Gestión de productos y categorías
- ✅ Configuración de tienda personalizable
- ✅ Responsive design con Tailwind CSS
- ✅ TypeScript en todo el proyecto

## 🚀 Inicio rápido

### Requisitos

- Node.js >= 20.0.0
- npm >= 6.0.0

### Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

El backend estará en `http://localhost:1337`

### Frontend (Astro)

```bash
cd frontend
npm install
npm run dev
```

El frontend estará en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── config/          # Configuración de Strapi
│   ├── database/        # Migraciones
│   ├── public/          # Archivos públicos (uploads)
│   ├── src/
│   │   ├── admin/       # Admin panel
│   │   ├── api/         # Endpoints de API
│   │   │   ├── category/
│   │   │   ├── product/
│   │   │   └── store-config/
│   │   └── extensions/  # Extensiones personalizadas
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # Componentes Astro y React
    │   ├── layouts/     # Layouts principales
    │   ├── pages/       # Rutas y páginas
    │   ├── lib/         # Utilidades (cliente Strapi, tipos)
    │   └── styles/      # Estilos globales
    ├── public/          # Assets estáticos
    ├── astro.config.mjs
    └── package.json
```

## 🔧 Configuración

### Frontend (.env)

```env
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_WHATSAPP_NUMBER=34123456789
PUBLIC_STORE_NAME=Mi Tienda Online
PUBLIC_STORE_DESCRIPTION=Descripción de tu tienda
PUBLIC_STORE_EMAIL=contacto@mitienda.com
```

## 📚 Stack Tecnológico

### Backend

- Strapi v5
- SQLite (por defecto)
- Node.js

### Frontend

- Astro v5
- React v18
- Tailwind CSS v3
- TypeScript v5

## 🛠️ Scripts útiles

### Backend

- `npm run develop` - Inicia modo desarrollo
- `npm run build` - Compila para producción
- `npm run start` - Inicia servidor en producción

### Frontend

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de producción

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👤 Autor

Creado por Xlugner

---

**¡Contribuciones bienvenidas!** Si encuentras un bug o tienes una mejora, no dudes en abrir un issue o pull request.
