---
name: react-typescript-instructions
description: 'Instructions for React + TypeScript code style and architecture in the Ice Task Manager project
applyTo: "ice-task-manager/src/**/*.{ts,tsx}"
---

# React + TypeScript — Reglas de arquitectura

## UI: MUI siempre
- Usar `@mui/material` para todos los controles. No crear componentes custom si MUI ya lo ofrece.
- Estilar con `sx` y props de MUI, no con `style` inline.

## Dependencias
- **No añadir ni eliminar librerías sin preguntar al usuario.** Indicar nombre, motivo y alternativa.

## TypeScript
- Tipado estricto: props explícitas, sin `any`, tipos en `src/types/`.
- `type` para shapes y unions; `interface` solo si se necesita `extends`.

## React
- Un componente = una responsabilidad. Lógica en `hooks/`, render en `components/`.
- `App.tsx` solo compone; sin lógica de negocio.
- Preferir componentes controlados y `useMemo` sobre `useEffect` para datos derivados.

## Estructura
- Tipos: `src/types/` · Utilidades: `src/utils/` · APIs: `src/services/` · Estado: `src/hooks/` · UI: `src/components/<Name>/`

## Naming
- Componentes y tipos: `PascalCase` · Hooks: `useCamelCase` · Utilidades: `camelCase` · Constantes: `SCREAMING_SNAKE_CASE`

## Prohibido
- `console.log` en producción, secretos hardcodeados, lógica duplicada entre componentes, `as unknown as X`.
