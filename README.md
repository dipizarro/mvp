# Astro Reader

## 🌌 Carta Astral Online — Astro Reader

---

## 🇪🇸 Español

### Descripción

Astro Reader es una aplicación web moderna para generar cartas astrales personalizadas, visualizar interpretaciones y descargar resultados en PDF. Incluye procesamiento de pagos, animaciones avanzadas y una experiencia visual inmersiva.

### Tecnologías principales

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React**
- **Jest + React Testing Library**
- **@react-pdf/renderer** (funcionalidad PDF, temporalmente desactivada por compatibilidad)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   cd frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` si necesitas variables de entorno (por ejemplo, claves de pago).

### Scripts principales

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la app para producción
- `npm run start` — Inicia la app en modo producción
- `npm run test` — Ejecuta los tests unitarios

### Estructura de carpetas

```
frontend/
  src/
    app/           # Páginas y layouts principales
    components/    # Componentes UI y secciones de interpretación
    data/          # Datos estáticos (ej: interpretaciones, pagos)
    lib/           # Utilidades y helpers
    services/      # Lógica de negocio (cálculo de carta, pagos)
    __tests__/     # Tests unitarios
```

### Uso básico

1. Inicia el servidor:
   ```bash
   npm run dev
   ```
2. Accede a `http://localhost:3000` y completa el formulario para generar tu carta astral.
3. Visualiza interpretaciones, explora secciones y (próximamente) descarga el PDF.

### Testing

- Los tests están en `src/__tests__/` y usan Jest + React Testing Library.
- Ejecuta `npm run test` para correr todos los tests.

### Accesibilidad y UX

- Formularios accesibles con labels y validaciones inmediatas
- Navegación por teclado y feedback visual
- Animaciones suaves y glassmorphism
- Diseño responsive y moderno

### Créditos

- Desarrollado por [Tu Nombre o Equipo]
- Inspirado en la astrología y el diseño UI/UX moderno

---

## 🇬🇧 English

### Description

Astro Reader is a modern web app to generate personalized natal charts, visualize interpretations, and download results as PDF. It includes payment processing, advanced animations, and an immersive visual experience.

### Main technologies

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React**
- **Jest + React Testing Library**
- **@react-pdf/renderer** (PDF feature, temporarily disabled for compatibility)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file if you need environment variables (e.g., payment keys).

### Main scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start in production mode
- `npm run test` — Run unit tests

### Folder structure

```
frontend/
  src/
    app/           # Main pages and layouts
    components/    # UI components and interpretation sections
    data/          # Static data (e.g., interpretations, payments)
    lib/           # Utilities and helpers
    services/      # Business logic (chart calculation, payments)
    __tests__/     # Unit tests
```

### Basic usage

1. Start the server:
   ```bash
   npm run dev
   ```
2. Go to `http://localhost:3000` and fill out the form to generate your natal chart.
3. View interpretations, explore sections, and (soon) download the PDF.

### Testing

- Tests are in `src/__tests__/` and use Jest + React Testing Library.
- Run `npm run test` to execute all tests.

### Accessibility & UX

- Accessible forms with labels and instant validation
- Keyboard navigation and visual feedback
- Smooth animations and glassmorphism
- Responsive, modern design

### Credits

- Developed by [Your Name or Team]
- Inspired by astrology and modern UI/UX design
