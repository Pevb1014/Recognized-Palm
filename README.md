# Recognized Palm.

Aplicación web frontend para reconocimiento y tracking de manos en tiempo real con React + TypeScript + Vite + MediaPipe Tasks Vision.

## Requisitos
- Node.js 20+
- npm 10+

## Instalación
```bash
npm install
```

## Ejecución local
```bash
npm run dev
```

> ⚠️ Esta app usa módulos TypeScript gestionados por Vite. No abras `index.html` directamente con un servidor estático genérico; usa `npm run dev` o una build (`npm run build` + `npm run preview`).


## Build de producción
```bash
npm run build
npm run preview
```

## Deploy en GitHub Pages
### Opción A (recomendada): GitHub Actions
1. En GitHub, activa **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haz push a `main`.
3. El workflow `.github/workflows/deploy.yml` construye `dist` y publica la web automáticamente.

### Opción B (manual)
```bash
npm run deploy
```
Publica `dist/` con `gh-pages`.

## Variables de entorno
Copia `.env.example` como `.env` si quieres ajustar rutas del modelo/wasm.

## Características
- Solicitud de permisos de cámara.
- Detección en tiempo real de hasta 2 manos.
- Dibujo de landmarks y conexiones sobre canvas sincronizado.
- Handedness (Left/Right).
- FPS aproximados y panel de estado.
- Botones de pausar/reanudar cámara.
- Manejo de errores de cámara/tracking.
- UI responsive de estilo futurista.

## Arquitectura
- `src/app`: providers, rutas y configuración.
- `src/core`: cámara, rendimiento y motor de visión desacoplado.
- `src/features/hand-tracking`: hooks, servicios, componentes y tipos de la feature.
- `src/shared`: componentes y utilidades reutilizables.
- `src/pages`: páginas de composición.
- Carpetas complementarias solicitadas: `src/services`, `src/adapters`, `src/utils`, `tests`, `config`, `scripts`, `docs`, `data`, `assets`.

## Extensibilidad futura
Base preparada para:
- Reconocimiento de gestos (`core/vision/gestures`).
- Integración con Three.js / WebGL.
- AR, objetos 3D y tatuajes virtuales.
- Control de interfaz por mano.

## Stack
- React 18
- TypeScript estricto
- Vite
- @mediapipe/tasks-vision
- CSS moderno

