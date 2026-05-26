# Changelog Release Skill

## Purpose
Create or update the project changelog from the commits in the current branch. If `CHANGELOG.md` does not exist, create it. Determine the next version with semantic-release conventional commit rules and add a new release entry using real commit messages only.

## Scope
- Workspace-scoped skill for this repository.
- Primary target files:
  - `ice-task-manager/CHANGELOG.md`
  - `ice-task-manager/package.json`

## Inputs
- Current git branch
- Commits in the branch, preferably since the last version tag (`v*`) or, if none exists, since the beginning of the branch
- Current version from `ice-task-manager/package.json`

## Workflow
1. Detect the current branch and the project root.
2. Read `ice-task-manager/package.json` and take its current version as the base version.
3. Find the latest release tag matching `v*`.
4. Read the commits from that tag to `HEAD`. If no tag exists, read the commits in the current branch.
5. Classify commits with semantic-release rules:
   - `major`: commit contains `BREAKING CHANGE` or `type!:`
   - `minor`: `feat`
   - `patch`: `fix`, `perf`, `revert`
   - no version bump: `docs`, `style`, `refactor`, `test`, `chore`, `ci`
6. Calculate the next version from the highest bump found.
7. Create or update `ice-task-manager/CHANGELOG.md` with a new top entry:
   - Header format: `## x.y.z - YYYY-MM-DD`
   - Group entries by section when possible: `Breaking Changes`, `Features`, `Fixes`, `Performance`, `Documentation`, `Refactor`, `Tests`, `Chores`
8. Add one bullet per real commit message. Do not invent changes. Clean obvious conventional-commit prefixes in the visible changelog text if that improves readability.
9. Update `ice-task-manager/package.json` to the new version.
10. Verify the result by checking the final diff of `CHANGELOG.md` and `package.json`.

## Rules
- Do not install extra libraries automatically.
- If `semantic-release` is not installed or configured, still follow its default conventional commit bump rules.
- If there are no commits that should produce a release entry, stop and report that no new changelog release is needed.
- Do not overwrite previous changelog history.
- New release entries always go at the top.
- Keep the output concise and factual.

## Output
Produce:
- Updated or newly created `ice-task-manager/CHANGELOG.md`
- Updated `ice-task-manager/package.json` version
- Short summary with:
  - previous version
  - new version
  - number of commits included
  - release type: `major`, `minor`, or `patch`

## Example prompts
- `Usa changelog-release para actualizar el CHANGELOG con los commits de esta rama`
- `Genera la siguiente versión y añade la entrada correspondiente al changelog`
- `Crea el CHANGELOG inicial desde los commits actuales y sube la versión`
