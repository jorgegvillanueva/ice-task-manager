---

description: Genera o actualiza el CHANGELOG usando los commits reales de la rama y calcula la siguiente versión.

---

Usa el skill changelog-release para:

1. Detectar la versión actual en ice-task-manager/package.json.
2. Revisar los commits desde el último tag v* hasta HEAD.
3. Calcular el siguiente bump semántico.
4. Crear o actualizar ice-task-manager/CHANGELOG.md con una nueva entrada arriba.
5. Actualizar la versión en ice-task-manager/package.json.
6. Verificar el diff final y resumir el resultado.

No inventes cambios. Usa solo commits reales.
