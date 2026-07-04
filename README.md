# Alfredo Pablo García — CV Portfolio

<div align="center">

![Version](https://img.shields.io/badge/version-4.0.0-C9A55C?style=flat-square)
![Status](https://img.shields.io/badge/status-active-4D8C6F?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-5B6577?style=flat-square)
![HTML](https://img.shields.io/badge/HTML5-semantic_ATS-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-custom_properties-1572B6?style=flat-square&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-ES6_classes-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

<br/>

> **CV interactivo** construido como una aplicación web profesional —  
> diseño corporativo premium, dark mode, responsivo mobile-first y semántica ATS-friendly.

<br/>

[🌐 Ver en vivo](https://cvalfredo.vercel.app/) · [📄 Descargar PDF](https://cvalfredo.vercel.app/assets/Alfredo-Pablo-Garcia-CV.pdf) · [📬 Contacto](#-contacto)

</div>

---

## 📁 Estructura del proyecto

```
CV_Personal/
├── index.html                    # Estructura semántica ATS-friendly — cero lógica, cero estilos inline
├── styles.css                    # Capa de diseño — design tokens, componentes, responsivo
├── app.js                        # Capa de comportamiento — clases ES6, observers, config
├── assets/
│   └── Alfredo-Pablo-Garcia-CV.pdf   # PDF descargable (colocar aquí)
└── README.md
```

> **Separación estricta de responsabilidades.**  
> Cada archivo tiene un único propósito. Editar el diseño no requiere tocar JS,  
> y agregar lógica no requiere tocar CSS.

---

## ✨ Características

| Feature | Detalle |
|---|---|
| 🎨 **Dark mode corporativo** | Paleta azul casi negro con acento dorado sobrio — CSS custom properties |
| 📐 **Layout sidebar + main** | Sidebar fija 292 px + topbar sticky + breadcrumb dinámico |
| 📱 **Mobile-first responsivo** | Sidebar colapsa a menú off-canvas con botón hamburguesa en ≤ 960 px |
| 🔄 **Animaciones on-scroll** | `IntersectionObserver` nativo — cero librerías externas |
| 🏷️ **Skill tags agrupadas** | Competencias como etiquetas por categoría (Backend · Cloud · Infraestructura) |
| 🧭 **Nav activa** | Se sincroniza automáticamente con la sección visible al hacer scroll |
| 📋 **Semántica ATS-friendly** | `h1`/`h2`/`p`/`ul`/`li` reales — sin bloques de código decorativos |
| 🎓 **Credenciales verificables** | Links directos a Credly y Coursera para cada certificación |
| 📥 **CTA Descargar CV** | Botón de descarga como acción primaria en el hero |
| ♿ **Accesible** | Roles ARIA, landmarks semánticos, `aria-label`, `aria-expanded` |
| 🚀 **Zero dependencias** | Vanilla HTML + CSS + JS — sin frameworks ni bundlers |

---

## 🏗️ Arquitectura JS

```js
// app.js — 5 módulos independientes

class MobileNav          // Abre/cierra sidebar off-canvas en mobile (backdrop, Esc, nav-link)
class RevealObserver     // Fade-in + slide-up de elementos .reveal al entrar al viewport
class ActiveNavObserver  // Sincroniza nav lateral + breadcrumb con la sección visible
class AvatarLoader       // Carga foto real o SVG Ghibli vía Claude API (configurable)
// Bootstrap             // DOMContentLoaded → instancia todos los módulos y llama .init()
```

Toda la configuración vive en un objeto centralizado:

```js
const CONFIG = {
  avatar: {
    useRealPhoto: true,          // false → genera SVG Ghibli vía Claude API
    apiModel: 'claude-sonnet-4-6',
  },
  observers: {
    reveal:    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    activeNav: { threshold: 0.40 },
  },
  sectionLabels: {
    hero: 'Inicio', profile: 'Perfil', experience: 'Experiencia', ...
  },
  mobileBreakpoint: 960,         // px — por debajo activa el menú off-canvas
};
```

---

## 🎨 Design Tokens

```css
/* styles.css — todas las decisiones visuales en un solo lugar */
:root {
  /* Fondos — azul casi negro, sofisticado */
  --bg:        #050810;
  --surface:   #0D1320;

  /* Bordes ultra finos en gris-azulado */
  --border:    #161E2E;
  --border-2:  #1F2A3D;

  /* Acento único — oro sobrio, usado con moderación */
  --accent:    #C9A55C;

  /* Texto */
  --text:      #ECEEF1;
  --text-mid:  #9AA3B2;
  --text-soft: #5B6577;

  /* Tipografía corporativa — una sola familia */
  --font-sans: 'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif;

  /* Layout */
  --sidebar-w: 292px;
}
```

Cambiar `--accent` actualiza el CTA de descarga, los chips destacados, los badges de certificación, el borde activo de navegación y los enlaces de credencial — todo a la vez.

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
:root { --accent: #7C6CD4; }  /* ejemplo: violeta corporativo */
```

```js
/* Activar avatar Ghibli generado por IA → app.js */
const CONFIG = {
  avatar: { useRealPhoto: false }   /* ← cambiar a false */
};
```

```html
<!-- Agregar nueva sección → index.html -->
<section id="nueva-seccion" class="reveal" aria-label="Nueva sección">
  <div class="section-heading">
    <h2 class="section-title">Título</h2>
    <div class="section-line"></div>
  </div>
  ...
</section>
```

```js
/* Registrar la sección en el breadcrumb → app.js */
sectionLabels: {
  'nueva-seccion': 'Título',   /* ← agregar aquí */
}
```

---

## 🎓 Certificaciones

| Certificación | Emisor | Vigencia | Verificar |
|---|---|---|---|
| AWS Certified Cloud Practitioner | Amazon Web Services | Jun 2026 – Jun 2029 | [Credly](https://www.credly.com/badges/b1971ad4-9858-4399-a0ba-e08363200843/public_url) |
| Fortinet Certified Associate in Cybersecurity | Fortinet | Nov 2025 – Nov 2027 | [Credly](https://www.credly.com/badges/0c5bdce4-554a-4d72-a9d1-5c273b40cd03/public_url) |
| Google Cybersecurity Certificate | Google / Coursera | 2024 | [Coursera](https://www.coursera.org/account/accomplishments/professional-cert/certificate/HHWF9PVUNRTC) |

---

## 📬 Contacto

<div align="center">

**Alfredo Pablo García**  
Ingeniero en Desarrollo y Gestión de Software  
📍 Mérida, Yucatán · México

[![LinkedIn](https://img.shields.io/badge/LinkedIn-alfredo--pablo--garcia-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/alfredo-pablo-garcia-494075293)
[![GitHub](https://img.shields.io/badge/GitHub-alfredo89953-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/alfredo89953)
[![Credly](https://img.shields.io/badge/Credly-certificaciones-FF6B35?style=flat-square&logo=credly&logoColor=white)](https://www.credly.com/badges/b1971ad4-9858-4399-a0ba-e08363200843/public_url)

</div>

---

<div align="center">

Hecho con 🖤 en Mérida, Yucatán  
`build v4.0.0` · `last_commit: 2026-06-28`

</div>
