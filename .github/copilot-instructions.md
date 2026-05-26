# Copilot Instructions

## Stack
- React + TypeScript + Vite.
- Functional components and hooks only.
- Folder split: `components/`, `hooks/`, `services/`, `types/`, `utils/`.

## TypeScript
- Strict typing always: explicit prop types, return types when useful, no `any` unless fully justified.
- Reuse and extend types from `src/types/` instead of duplicating shapes.

## Clean code
- Small, presentational components.
- Business logic in hooks, services, or pure utilities — not in `App.tsx`.
- Clear names, focused functions, low duplication, simple control flow.
- No unused variables or imports (enforced by ESLint).

## Security
- Never hardcode secrets, API keys, or tokens.
- Use environment variables for any external service configuration.

## Response style
- Be concise. Focus on action and result.
- Do not explain intermediate steps unless explicitly asked.
