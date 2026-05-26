#!/usr/bin/env bash
set -u

ROOT_DIR="/Users/jorge/Documents/Jorge/curso_desarrollo_IA_plexus_2/curso"
PROJECT_DIR="$ROOT_DIR/ice-task-manager"

if [ ! -d "$PROJECT_DIR" ]; then
  echo '{"systemMessage":"No se encontró la carpeta ice-task-manager para ejecutar el formateo."}'
  exit 0
fi

cd "$PROJECT_DIR" || exit 0

npm run lint -- --fix >/dev/null 2>&1 || true

if command -v npx >/dev/null 2>&1 && npx --no-install prettier --version >/dev/null 2>&1; then
  npx prettier --write "src/**/*.{ts,tsx,css}" "*.{json,md}" >/dev/null 2>&1 || true
else
  echo '{"systemMessage":"Hook Stop ejecutado: ESLint con --fix aplicado. Prettier se omitió porque no está instalado en el proyecto."}'
fi

exit 0
