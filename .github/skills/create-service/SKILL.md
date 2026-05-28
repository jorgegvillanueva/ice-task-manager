---
name: create-service
description: "Create a typed service or service-based utility in src/services/ for the Ice Task Manager React project. Use when adding API calls, external integrations, or reusable async logic. Asks for methods and types if not provided, then auto-generates tests via create-tests."
argument-hint: "Service name and optional description, e.g. 'notificationService — sends push notifications'"
---

# Create Service

Creates a fully-typed service file in `src/services/` following the Ice Task Manager conventions, and optionally a companion hook in `src/hooks/`. Ends by running `/create-tests` on the new file.

## When to Use

- Adding a call to an external API (REST, SDK, etc.)
- Encapsulating `fetch` or third-party SDK logic outside components
- Creating a reusable async utility that belongs in `src/services/`

## Step 1 — Gather Requirements

Before writing any code, verify you have all of the following. **Ask the user** for any that are missing from the conversation context:

1. **Service name** (camelCase, e.g. `aiService`, `analyticsService`)
2. **Purpose** — one sentence describing what it does
3. **Methods** — for each method:
   - Name (camelCase)
   - Parameters with types
   - Return type (Promise included)
   - Brief description of behavior
4. **External dependency** — which library or API does it call? (e.g. `@google/generative-ai`, native `fetch`)
5. **Companion hook** — is a `useXxx` hook in `src/hooks/` needed to expose `loading`, `error`, and the result to components? (yes/no)
6. **Env vars** — any `VITE_*` keys required?

Do not proceed until all six points are known.

## Step 2 — Read Conventions

Read [react-typescript.instructions.md](./../../instructions/react-typescript.instructions.md) to apply:
- TypeScript strict rules (no `any`; use `unknown` + type guard for external JSON)
- `as unknown as X` is allowed only in `services/` for external JSON — document with a comment
- Import order: external libs → types → utils
- Naming: `camelCase` for functions, `PascalCase` for types, `SCREAMING_SNAKE_CASE` for constants
- No `console.log`; no hardcoded API keys (`import.meta.env.VITE_*`)

## Step 3 — Create the Service File

Path: `src/services/<serviceName>.ts`

Structure to follow:

```typescript
// External imports first
import { ExternalSdk } from 'external-lib';

// Internal types
import type { DomainType } from '../types/task';

// Module-level constants (SCREAMING_SNAKE_CASE)
const API_ENDPOINT = import.meta.env.VITE_SOME_KEY as string;

// Exported types specific to this service
export type ServiceResult = { ... };

// Service functions — exported individually (no class, no singleton object)
export async function methodName(param: ParamType): Promise<ReturnType> {
  // implementation
}
```

Rules:
- No default export; export each function individually.
- No class or singleton object pattern.
- No state; services are pure async functions.
- Validate / guard external API responses before returning typed data.
- Throw meaningful `Error` instances with descriptive messages on failure.
- If `VITE_*` key is required, check it at call-time and throw if missing.

## Step 4 — Create the Companion Hook (if requested)

Path: `src/hooks/use<ServiceName>.ts`

```typescript
import { useState, useCallback } from 'react';
import { methodName } from '../services/<serviceName>';
import type { ServiceResult } from '../services/<serviceName>';

type UseServiceNameState = {
  data: ServiceResult | null;
  loading: boolean;
  error: string | null;
};

export function useServiceName(): UseServiceNameState & { fetch: (param: ParamType) => Promise<void> } {
  const [data, setData] = useState<ServiceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (param: ParamType) => {
    setLoading(true);
    setError(null);
    try {
      const result = await methodName(param);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
}
```

Rules:
- Hook name: `use` + PascalCase version of the service name.
- Expose `loading`, `error`, `data` plus action callbacks.
- Use `useCallback` for action functions to avoid unnecessary re-renders.
- No business logic here — delegate entirely to the service.

## Step 5 — Generate Tests

Once the service (and hook, if created) is saved, invoke the `/create-tests` prompt on the new service file:

```
/create-tests src/services/<serviceName>.ts
```

If a hook was also created, run a second invocation:

```
/create-tests src/hooks/use<ServiceName>.ts src/services/<serviceName>.test.ts
```

## Checklist

- [ ] All six requirements from Step 1 are known
- [ ] No `any`, no `console.log`, no hardcoded keys
- [ ] External response validated / guarded before returning typed data  
- [ ] `as unknown as X` documented with a comment if used
- [ ] Each exported function has an explicit return type annotation
- [ ] `npm run lint` passes (remind the user to run it)
- [ ] Tests generated via `/create-tests`
