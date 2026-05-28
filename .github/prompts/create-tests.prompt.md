---
description: "Generate Vitest unit tests for a source file. Usage: /create-tests <file> [example-test-file]"
name: "Create Tests"
argument-hint: "Path to source file (required) and optional example test file, e.g. src/utils/ice.ts src/utils/other.test.ts"
agent: "agent"
tools: [read, edit, search]
---

Generate Vitest unit tests for the file provided as the first argument.

## Steps

1. **Read the source file** to understand its exports, types and logic.
2. If a second argument (example test file) was provided, **read it** to match its style, structure and patterns (describe blocks, assertion style, mock approach).
3. If no example file was provided, search for any existing `*.test.ts` or `*.spec.ts` in the workspace to infer the project's test conventions.
4. **Read [.github/instructions/react-typescript.instructions.md](./../instructions/react-typescript.instructions.md)** to apply project naming and TypeScript conventions.
5. **Write the test file** next to the source file, named `<filename>.test.ts` (or `.test.tsx` for React components).

## Test requirements

- Use `describe` / `it` blocks with descriptive names in English.
- Cover: happy path, edge cases (boundary values, empty inputs), and error/invalid input scenarios.
- For pure functions in `utils/`: test all exported functions independently; no mocks needed.
- For hooks: use `@testing-library/react` `renderHook`; mock external dependencies.
- For components: use `@testing-library/react` `render` + `screen`; assert on visible output, not implementation.
- For services: mock `fetch` or the Gemini SDK; test success and failure branches.
- ICE score values range 1–10 per dimension; score ranges 1–1000. Use these boundaries in tests.
- Do **not** use `any`; type all variables explicitly.
- Do **not** add `console.log`.

## Output

Create the test file at the correct path and confirm:
- Which file was tested
- How many test cases were written
- Whether any dependency needs installing (e.g. `@testing-library/react`, `vitest`)
