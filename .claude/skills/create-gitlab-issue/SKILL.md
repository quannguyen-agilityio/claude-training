---
name: create-gitlab-issue
description: Verify a suspected bug by reproducing it, then file it as a GitLab issue with glab, including repro steps, evidence, affected files and a fix idea. Use when the user wants to turn a likely bug (e.g. an entry in docs/likely-bugs.md, or a free-text bug description) into a GitLab issue/ticket.
argument-hint: '<bug number from docs/likely-bugs.md | free-text bug description> [--yes]'
allowed-tools: Bash(glab auth status:*), Bash(glab repo view:*), Bash(glab issue list:*), Bash(glab issue view:*), Bash(glab label list:*), Bash(git rev-parse:*), Bash(git status:*), Bash(node --version), Bash(pnpm --version)
---

# Create a GitLab issue from a likely bug

## Usage

Run it from the repo root in Claude Code:

```
/create-gitlab-issue <bug number | "bug title" | free-text description> [--yes]
```

| Example                                                     | What it does                                                                 |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/create-gitlab-issue 1`                                    | Verifies bug #1 from `docs/likely-bugs.md`, then asks before filing it       |
| `/create-gitlab-issue #12`                                  | Same, for bug #12 (the `#` is optional)                                      |
| `/create-gitlab-issue "Search box doesn't filter"`          | Finds the `docs/likely-bugs.md` entry by its title                           |
| `/create-gitlab-issue Delete button does nothing on Safari` | Treats the text as a new bug report and finds the code it points at          |
| `/create-gitlab-issue 3 --yes`                              | Files without the confirmation step (still stops if the bug isn't confirmed) |

Before you start, you need `glab` logged in to the repo's GitLab host (`glab auth login --hostname <host>`).

You get back the verdict and, once filed, the issue URL. For a bug from `docs/likely-bugs.md`, the entry gets an uncommitted `- **Issue:** <url>` line. Next step: `/resolve-gitlab-issue <issue number> <base branch>`.

Input: `$ARGUMENTS`

The input is one of:

- A bug number or title from `docs/likely-bugs.md` (e.g. `1`, `#12`, `"Search box doesn't filter"`). Read that entry in full: Where, What, Repro, Fix idea, and any (verified)/(inferred) notes.
- A free-text bug description. Use it as-is, and look up the code it points at.

If `--yes` is present, skip the confirmation in step 5. Otherwise always confirm.

Work through the steps in order. **Never create an issue for a bug you couldn't reproduce or confirm.**

## 1. Preflight

1. Run `glab auth status` and `glab repo view`. If glab is missing or not authenticated against the repo's host (see `git remote -v`), stop and tell the user to run `glab auth login --hostname <host>`.
2. Look for duplicates: `glab issue list --search "<key words>" --all`. If an open or closed issue already covers this bug, show it to the user and stop, unless they say to continue.
3. Record the environment for the issue: `git rev-parse --short HEAD`, the branch name, `node --version` and `pnpm --version`.

## 2. Reproduce

The app lives in `practice-one/` (React + Vite + TypeScript, pnpm, Storybook 6.5). Pick the cheapest method that actually demonstrates the bug:

| Bug kind                                                                    | How to reproduce                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static / code-level (dead code, wrong props, bad class names, wrong config) | Read the exact lines and quote them. Trace the data flow to show the failure path. Run `pnpm build` (tsc) if types are involved.                                                                    |
| Tooling (lint, hooks, build)                                                | Run the real command (`pnpm lint:eslint`, `pnpm build`, `ls -l .husky`, `git config core.hooksPath`…) and capture the exit code and the relevant output.                                            |
| Runtime UI behaviour                                                        | Start `pnpm dev` (http://localhost:3000) in the background, drive it with the Playwright MCP tools (`browser_navigate`, `browser_snapshot`, `browser_click`…), follow the repro steps, then `browser_take_screenshot` and `browser_console_messages`. Fall back to the `claude-in-chrome` skill if Playwright isn't connected. Stop the server and `browser_close` afterwards. |
| Storybook                                                                   | `NODE_OPTIONS=--openssl-legacy-provider pnpm storybook` (needed on Node ≥ 17). Open the affected story ids.                                                                                         |
| Network / config                                                            | Run the app with and without the relevant env var (e.g. `ROOT_URL`). Capture the request URLs, status codes and the visible result.                                                                 |

Rules:

- **Don't change tracked source files to reproduce.** If you need a probe (a script, a test, a temporary edit), put it in the scratchpad or a throwaway git worktree, and make sure `git status` is clean when you're done.
- **Redact secrets from all evidence.** Tokens, env values, home paths and usernames must not appear (this matters most for env-exposure bugs like #12). Show variable _names_ or counts, never values.
- Save screenshots and log excerpts to the scratchpad. Keep log excerpts short, just the lines that prove the bug.

Reach one verdict:

- **Confirmed**: the bug was observed. Continue.
- **Confirmed (static)**: it can't be observed at runtime, but the code path is unambiguous. Continue, and say so in the issue.
- **Not reproduced**: the observed behaviour is correct. Stop and report what you ran and saw. Offer to mark the entry in `docs/likely-bugs.md` as not reproduced.
- **Blocked**: you couldn't run what was needed (missing backend, tool, or permission). Stop and tell the user what's missing. Don't file the issue.

## 3. Choose title and labels

- Title: `[<Area>] <symptom in user terms>`, under ~70 chars. Example: `[Search] Typing in the search box doesn't filter books`.
- Labels: run `glab label list` and pick only labels that exist: a type (e.g. `bug`), and a severity/priority if the project has them. If the right labels don't exist, mention that and file without them. Don't create labels unless the user asks.

## 4. Draft the issue body

Write it to `<scratchpad>/issue-<slug>.md` using this template. Leave out sections that don't apply. Never write "N/A" padding.

```markdown
## Summary

<1–2 sentences: what is broken and who it affects.>

**Severity:** <High | Medium | Low>, <one-line justification>
**Verification:** <Confirmed by reproduction | Confirmed by code inspection> on `<short sha>` (`<branch>`), Node <ver>, pnpm <ver>

## Steps to reproduce

1. …
2. …

## Expected

…

## Actual

…

## Evidence

<command + trimmed output in a code block, and/or screenshots, and/or console errors>

## Root cause

<the faulty code, with `path:line` references relative to the repo root and a short quoted snippet>

## Suggested fix

<the fix idea; note any related bugs it interacts with, e.g. "fixing #14 will make #15 visible">

## Affected files

- `practice-one/src/...:<line>`

<sub>Source: docs/likely-bugs.md #<n></sub>
```

Screenshots: upload each image to the project and use the returned markdown in **Evidence**:

```bash
glab api --method POST "projects/:id/uploads" -F "file=@<scratchpad>/<image>.png"
# the JSON response contains a "markdown" field, e.g. ![bug-1](/uploads/<hash>/bug-1.png)
```

The upload makes the file reachable by anyone who can see the project, so check every image for secrets first.

## 5. Confirm

Unless `--yes` was passed, show the user the verdict, title, labels and the full body, and ask whether to create the issue, edit it, or cancel. Creating an issue is outward-facing, so don't skip this.

## 6. Create

```bash
glab issue create \
  --title "<title>" \
  --description "$(cat <scratchpad>/issue-<slug>.md)" \
  --label "<label1>,<label2>" \
  --yes
```

Then:

1. Report the issue number and URL from glab's output.
2. If the bug came from `docs/likely-bugs.md`, add a `- **Issue:** <url>` line under that entry's heading, and change its marker to **(verified)** if reproduction confirmed it. Don't commit; tell the user the file changed.
3. Check that `git status` shows nothing besides that doc edit, and that no dev server or Storybook process is still running.
