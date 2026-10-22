# claude-training

Training repo for working with Claude Code on a real project: a small book manager app, its design docs, and the Claude Code skills used to file, fix and merge its issues.

## Layout

| Path                 | What's there                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `practice-one/`      | The app: React 18 + TypeScript + Vite + Tailwind, pnpm, Storybook. See `practice-one/CLAUDE.md`. |
| `docs/`              | Project overview, known bugs (`likely-bugs.md`), UI audit and refresh guides                     |
| `design/`            | Design specs and HTML cards for the UI refresh                                                   |
| `.claude/skills/`    | Project skills for the issue → fix → merge workflow (below)                                      |
| `.github/workflows/` | CI: lint and build on every push to `main`/`sample-project` and on pull requests                 |

## Run the app

```sh
git clone git@github.com:quannguyen-agilityio/claude-training.git
cd claude-training/practice-one
corepack enable                  # uses the pnpm version pinned in package.json
pnpm install --frozen-lockfile
pnpm dev                         # http://localhost:3000, no backend or .env needed
```

`pnpm build` (type check + bundle), `pnpm lint:eslint` and `pnpm storybook` are the other scripts you'll use.

## Workflow

Work happens on `sample-project` (the default branch) through issues and pull requests. The Claude Code skills drive it with the GitHub CLI (`gh auth login` first):

1. `/create-github-issue <bug>`: reproduce a suspected bug and file it as an issue.
2. `/resolve-github-issue <issue> sample-project`: fix it on a `fix/<n>-<slug>` branch and open a draft PR.
3. `/merge-github-pr <pr>`: check the PR is safe to merge, resolve conflicts, test the merge result and merge it.

Commits follow Conventional Commits (commitlint enforces it).

## History

The project started on GitLab and moved here on 2026-10-22. Issue numbers were kept. Each GitLab merge request is recorded as a comment on the issue it closed, and screenshots from that time are on the `gitlab-uploads` branch.
