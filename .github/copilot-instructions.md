# Ice Task Manager — Agent Instructions

SPA de gestión de tareas con modelo ICE (Impact × Confidence × Ease), construida con React 18 + TypeScript strict + Vite + Material UI v6.  
Sin backend, sin router, sin autenticación. Persistencia en `localStorage`.

## Documentación de referencia
- Alcance funcional: [docs/MVP_SCOPE.md](../docs/MVP_SCOPE.md)
- Convenciones técnicas completas: [docs/DEV_GUIDE.md](../docs/DEV_GUIDE.md)
- Secuencia de implementación: [docs/tareas-implementacion-mvp.md](../docs/tareas-implementacion-mvp.md)

## Comandos clave
```bash
npm run dev      # inicia el servidor de desarrollo
npm run build    # compila TypeScript + bundle Vite
npm run lint     # ESLint (debe pasar sin errores antes de cada commit)
```
Requiere `VITE_AI_API_KEY` en `.env` (ver `.env.example`). Sin ella, el botón "Sugerir ICE con IA" se deshabilita; el resto de la app funciona.

## Estructura de carpetas
```
src/
├── components/   # Presentación pura (sin lógica de negocio)
├── hooks/        # useTasks (fuente de verdad), useIceSuggestion
├── services/     # aiService.ts — llamadas a Google Gemini
├── types/        # task.ts — única fuente de tipos del dominio
└── utils/        # ice.ts — funciones puras (calculateIceScore, validación)
```

## Reglas críticas

**Arquitectura**
- `useTasks` es la única fuente de verdad del array de tareas.
- `App.tsx` solo compone: obtiene estado de `useTasks` y pasa props; sin lógica condicional de negocio.
- Dependencia unidireccional: `components/` nunca importa desde `hooks/` o `services/`.
- Datos derivados con `useMemo`; nunca `useEffect` + `setState` en cascada.

**TypeScript**
- Modo strict. Prohibido `any`; usar `unknown` + type guard.
- Props con `type`, herencia con `interface`. Tipos en `src/types/`, no duplicar en componentes.

**Material UI**
- Usar siempre componentes MUI para controles; no HTML nativo equivalente.
- Estilar con prop `sx`; sin `style` inline ni CSS externo salvo excepción documentada.
- Layouts con `Box`, `Stack`, `Grid2`. Colores de `IceScoreBadge` desde `theme.palette`.

**ICE Score**
- Fórmula: `impact × confidence × ease` (rango 1–1000). Calculado en `src/utils/ice.ts`; nunca mutado a mano.
- Escala de color: `error.main` (1–200) · `warning.main` (201–500) · `success.main` (501–1000).

**Prohibiciones**
- No añadir librerías sin justificación explícita y comparación con alternativa nativa.
- No usar Context API, Redux, Zustand ni Jotai en este MVP.
- No `console.log` en código de producción.
- No mutar estado directamente; siempre inmutabilidad.
- No hardcodear API keys; usar `import.meta.env.VITE_AI_API_KEY`.

**Nombrado**
- Componente/Tipo → `PascalCase` | Hook → `use` + PascalCase | función/variable → `camelCase` | constante global → `SCREAMING_SNAKE_CASE`
- Cada componente en su propia carpeta: `TaskCard/TaskCard.tsx`.
