# practice-one — Book manager (React 18 + TS + Vite + Tailwind)

Full reference: `../docs/project-overview.md`. Known bugs: `../docs/likely-bugs.md`.

## Build / run (from `practice-one/`)
```sh
pnpm install --frozen-lockfile   # pnpm 11 (pinned via packageManager; `corepack enable`)
echo 'ROOT_URL=http://localhost:3001' > .env       # required for dev AND build
npx json-server@0.17.4 --watch db.json --port 3001   # backend (db.json not in repo)
pnpm dev            # http://localhost:3000
pnpm build          # tsc + vite build; this is the type check
pnpm lint:eslint    # fix:eslint to autofix (pre-commit runs it)
pnpm storybook      # :6006
```
There is no test suite. To check a change, run `pnpm build`, `pnpm lint:eslint`, then use it in `pnpm dev`.

## Conventions
- One component per folder: `Name/index.tsx` plus `index.stories.tsx` for any new visual component. Shared primitives go in `components/common/`.
- Import across folders with the aliases `@components`, `@enums`, `@services`, `@stores`, `@helpers`, etc. Use relative imports only inside the same folder.
- Put string constants in `src/enums/` (variants, storage keys, error messages), not inline literals.
- Style with Tailwind classes and `clsx`. Colors use the named tokens from `tailwind.config.cjs`. Support `dark:`.
- Make HTTP calls only through `ApiRequest` (`services/api-request.ts`) → `ApiService` → `axiosClient`. The interceptor already unwraps `response.data`.
- Keep global state in the `BookContext` reducer (`stores/book`): add an action type, a reducer case, and a `useCallback` setter.
- Formatting: Prettier (single quotes, 2 spaces, width 120, trailing commas, `x => x`).
- Commits follow Conventional Commits (commitlint enforces this): `feat: …`, `fix: …`, `refactor: …`.

## Never do
- Never commit lockfile churn from a different pnpm major. New dependency build scripts must be allowed or denied in `pnpm-workspace.yaml` (`allowBuilds`).
- Never upgrade json-server to 1.x. Its query syntax breaks `_sort` and `title_like`.
- Never commit `.env` or put secrets in it.
- Never run `pnpm dev` from a shell holding secrets, and never use `--host`. `EnvironmentPlugin('all')` exposes the whole environment to the browser.
- Never call axios or `fetch` directly from components.
- Never skip hooks (`--no-verify`) or disable lint rules to get a commit through.
- Never use `any` or `@ts-ignore` to silence `tsc`. Fix the type.
- Never add a dependency without asking first.
