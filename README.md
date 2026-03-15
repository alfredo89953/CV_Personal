# 🧑‍💻 Alfredo Pablo García — CV Portfolio

<div align="center">

![Version](https://img.shields.io/badge/version-3.0.0-3B82F6?style=flat-square)
![Status](https://img.shields.io/badge/status-active-10B981?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-F59E0B?style=flat-square)
![HTML](https://img.shields.io/badge/HTML5-semantic-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-custom_properties-1572B6?style=flat-square&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-ES6_classes-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

<br/>

> **CV interactivo** construido como una aplicación web profesional —  
> arquitectura limpia, dark mode, animaciones on-scroll y diseño tipo IDE.

<br/>

[🌐 Ver en vivo](https://alfredo89953.github.io/CV_Personal) · [📄 Descargar PDF](#) · [📬 Contacto](#contacto)

</div>

---

## 📁 Estructura del proyecto

```
CV_Personal/
├── index.html       # Estructura semántica — cero lógica, cero estilos inline
├── styles.css       # Capa de diseño — design tokens, componentes, animaciones
└── app.js           # Capa de comportamiento — clases ES6, observers, config
```

> **Separación estricta de responsabilidades.**  
> Cada archivo tiene un único propósito. Editar el diseño no requiere tocar JS,  
> y agregar lógica no requiere tocar CSS.

---

## ✨ Características

| Feature | Detalle |
|---|---|
| 🎨 **Dark mode** | Paleta completa con CSS custom properties |
| 📐 **Layout tipo IDE** | Sidebar fija + topbar sticky + breadcrumb dinámico |
| 🔄 **Animaciones on-scroll** | `IntersectionObserver` — sin librerías externas |
| 📊 **Skill bars animadas** | Entran al viewport con transición CSS |
| 🧭 **Nav activa** | Se sincroniza automáticamente con la sección visible |
| 🖼️ **Avatar ring** | Borde conic-gradient giratorio con `@keyframes` |
| 💻 **Terminal block** | Perfil renderizado como código con syntax highlighting |
| 📱 **Scrollbar custom** | Diseñada para Webkit y Firefox |
| ♿ **Accesible** | Roles ARIA, landmarks semánticos, `aria-label` |
| 🚀 **Zero dependencias** | Vanilla HTML + CSS + JS — sin frameworks |

---

## 🏗️ Arquitectura JS

```js
// app.js — 6 módulos independientes

class SidebarSkillBars   // Anima barras del sidebar al cargar
class SkillBarObserver   // Anima barras del main al entrar al viewport
class RevealObserver     // Fade-in + slide-up de secciones
class ActiveNavObserver  // Sincroniza nav + breadcrumb con scroll
class AvatarLoader       // Carga foto real o SVG Ghibli vía API
// Bootstrap              // DOMContentLoaded → instancia y llama .init()
```

Toda la configuración vive en un objeto centralizado:

```js
const CONFIG = {
  avatar:    { useRealPhoto: true, apiModel: '...', ... },
  observers: { skillBars: { threshold: 0.30 }, ... },
  sectionLabels: { hero: 'inicio', experience: 'experiencia', ... },
};
```

---

## 🎨 Design Tokens

```css
/* styles.css — todas las decisiones de diseño en un solo lugar */
:root {
  --bg:           #0A0E17;   /* fondo principal          */
  --blue:         #3B82F6;   /* color de acento          */
  --cyan:         #22D3EE;   /* highlights               */
  --amber:        #F59E0B;   /* badges / warnings        */
  --green:        #10B981;   /* estados activos / éxito  */
  --font-mono:    'JetBrains Mono', monospace;
  --font-display: 'Syne', sans-serif;
  --sidebar-w:    280px;
}
```

Cambiar `--blue` actualiza la barra de navegación, los dots del timeline,  
los skill bars, los tech tags y el breadcrumb — todo a la vez.

---

## 🚀 Uso local

```bash
# 1. Clonar
git clone https://github.com/alfredo89953/CV_Personal.git
cd CV_Personal

# 2. Abrir (sin servidor necesario)
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# — o con un servidor local —
npx serve .
python3 -m http.server 3000
```

---

## 🔧 Personalización rápida

```css
/* Cambiar color de acento → styles.css */
:root { --blue: #8B5CF6; }  /* ejemplo: morado */
```

```js
/* Usar avatar Ghibli en lugar de foto → app.js */
const CONFIG = {
  avatar: { useRealPhoto: false }   /* ← cambiar a false */
};
```

```html
<!-- Agregar nueva sección → index.html -->
<section id="projects" class="reveal" aria-label="Proyectos">
  ...
</section>
```

```js
/* Registrar la sección en el breadcrumb → app.js */
sectionLabels: {
  projects: 'proyectos',   /* ← agregar aquí */
}
```

---

## 📬 Contacto

<div align="center">

**Alfredo Pablo García**  
Ingeniero en Desarrollo y Gestión de Software  
📍 Mérida, Yucatán · México

[![LinkedIn](https://img.shields.io/badge/LinkedIn-connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-alfredo89953-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/alfredo89953)
[![Email](https://img.shields.io/badge/Email-contacto-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:tu@email.com)

</div>

---

<div align="center">

Hecho con 🖤 en Mérida, Yucatán  
`build v3.0.0` · `last_commit: 2025-11-01`

</div>
