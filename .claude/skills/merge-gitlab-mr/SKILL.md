---
name: merge-gitlab-mr
description: Merge a GitLab merge request safely. Check that it is mergeable (draft, approvals, discussions, pipeline), resolve merge conflicts locally in an isolated worktree if there are any, test the merge result (lint, build, runtime smoke), then merge exactly the tested commit and verify the linked issues closed. Use when the user wants an MR/PR (number or URL) merged, or its conflicts resolved.
argument-hint: '<MR number | MR URL> [--yes]'
allowed-tools: Bash(glab auth status:*), Bash(glab repo view:*), Bash(glab mr view:*), Bash(glab mr list:*), Bash(glab mr diff:*), Bash(glab issue view:*), Bash(git status:*), Bash(git fetch:*), Bash(git log:*), Bash(git diff:*), Bash(git show:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(git ls-remote:*), Bash(git merge-base:*), Bash(git worktree list:*)
---

# Merge a GitLab MR, resolving conflicts if needed

## Usage

Run it from the repo root in Claude Code:

```
/merge-gitlab-mr <MR number | MR URL> [--yes]
```

| Example                                                                                           | What it does                                                                 |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/merge-gitlab-mr 1`                                                                              | Checks MR !1, resolves conflicts if any, tests, and asks once before merging |
| `/merge-gitlab-mr !1`                                                                             | Same (`!` and `#` are optional)                                              |
| `/merge-gitlab-mr https://gitlab.asoft-python.com/quan.nguyen/claude-training/-/merge_requests/1` | Takes the MR number from the URL                                             |
| `/merge-gitlab-mr 1 --yes`                                                                        | Pushes the conflict resolution and merges without asking, if all tests pass  |

Before you start, you need:

- `glab` logged in to the repo's GitLab host, and SSH push access to `origin` (only needed if there are conflicts).
- An MR you have reviewed. Usually it comes from `/resolve-gitlab-issue`. This skill checks that the merge is _safe_. It doesn't replace your code review.

Your working tree is never touched. Conflict resolution happens in a throwaway `git worktree`, so uncommitted changes and your current branch stay as they are.

You get back the merged MR's URL, the merge commit, how conflicts were resolved (if any), whether the linked issues closed, and confirmation that the remote source branch was deleted. If anything fails, nothing is merged and you get told why.

Input: `$ARGUMENTS`

- **MR:** a number (`1`, `!1`, `#1`) or a URL (`…/-/merge_requests/1`). Take the trailing number as the MR iid.
- `--yes`: skip the confirmations before pushing a conflict resolution (step 3.9) and before merging (step 5). It does **not** cover a draft MR, marking a draft ready always needs a yes (step 2). It also never overrides a stop condition.

Work through the steps in order.

**Hard rules:**

- Never push to the target branch.
- Never force-push, and never rebase a branch that's already pushed. Conflicts are resolved by merging the target into the source branch.
- Never bypass required approvals, unresolved blocking discussions or a failed pipeline. Never merge a commit you didn't test (always pass `--sha`).
- Never delete branches yourself with `git push --delete` or the API. The remote source branch is removed by GitLab as part of the merge (`--remove-source-branch`, step 5). Never delete a local branch unasked.

## Gotchas in this environment

- **glab is a snap with its own private `/tmp`.** It can't read files in the scratchpad. Pass text inline (`--message "$(cat <file>)"`). For file uploads, use `curl` against the API with the token from `glab config get token --host <host>`, used inline and never printed.
- **glab is often silent on success.** Always verify the outcome with `glab api`.
- **zsh doesn't word-split `$VAR`.** List files explicitly instead of `eslint --fix $FILES`.
- **Don't `pkill -f <pattern>`.** The pattern matches the shell running the command and kills it. Find PIDs with `ps -eo pid,args | grep -E "json-serve[r]|storyboo[k]|vite/bin/vit[e]"` and `kill` them.
- **pnpm:** every script goes through `pnpm --config.verify-deps-before-run=false …`. **Never run `pnpm install`** (see `/resolve-gitlab-issue` step 3 for why).

## 1. Preflight

1. Run `glab auth status` and `glab repo view`. If glab isn't authenticated for the host in `git remote -v`, stop and tell the user to run `glab auth login --hostname <host>`.
2. Load the MR: `glab api "projects/:id/merge_requests/<iid>"`. Note `title`, `state`, `draft`, `source_branch`, `target_branch`, `source_project_id` / `target_project_id`, `sha` (source head), `detailed_merge_status`, `has_conflicts`, `squash`, `force_remove_source_branch`, `head_pipeline`, `web_url`, and the description.
   - `state` is `merged`: report it and stop. `closed`: stop and ask whether to reopen. That's out of scope by default.
   - `source_project_id != target_project_id` (fork MR): you can merge it if there are no conflicts, but you can't push a resolution to it. If it has conflicts, stop and ask the author to resolve them.
3. Load the project's merge settings: `glab api "projects/:id"` → `merge_method` (`merge`, `rebase_merge`, `ff`), `squash_option`, `only_allow_merge_if_pipeline_succeeds`, `only_allow_merge_if_all_discussions_are_resolved`.
4. Read the context:
   - Commits: `glab api "projects/:id/merge_requests/<iid>/commits"`.
   - Changed files: `git diff --stat origin/<target>...origin/<source>` after `git fetch origin`.
   - Linked issues: `glab api "projects/:id/merge_requests/<iid>/closes_issues"`.
   - Discussions: `glab api "projects/:id/merge_requests/<iid>/discussions"`. List unresolved, resolvable threads.

   You'll need this to resolve conflicts in a way that keeps the MR's intent.

5. Remember the user's current branch and `git status --porcelain`, so you can confirm in step 7 that they're unchanged.

## 2. Decide what's blocking

Re-read `detailed_merge_status`. If it's `checking`, `unchecked` or `preparing`, wait a few seconds and re-read, up to ~30 s. Then act on the status:

| Status                                               | Action                                                                                                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mergeable`                                          | Go to step 4.                                                                                                                                                                                                                                                 |
| `draft_status`                                       | The MR is a draft, which means someone wanted a review before merging. Ask the user whether they've reviewed it and want it marked ready, even with `--yes`. If yes, run `glab mr update <iid> --ready`, verify `draft: false`, and re-evaluate. If no, stop. |
| `conflict` (or `has_conflicts: true`)                | Go to step 3.                                                                                                                                                                                                                                                 |
| `need_rebase`                                        | The project needs the source to contain the latest target (`ff` / `rebase_merge`). Go to step 3. Merging the target in satisfies it with no history rewrite. Use `glab mr rebase` only if the user explicitly prefers a server-side rebase.                   |
| `discussions_not_resolved`                           | Stop. List the unresolved threads (author, file:line, first line). Resolving them is the reviewer's call, not yours.                                                                                                                                          |
| `not_approved` / `requested_changes`                 | Stop. Say who needs to approve or what was requested.                                                                                                                                                                                                         |
| `ci_must_pass` / `ci_still_running`                  | Show the pipeline (`head_pipeline.web_url`). If it's running, watch it until it finishes (no tight polling, check every ~60 s). If it failed, stop and show the failed jobs. Don't retry or skip it.                                                          |
| `blocked_status`, `jira_association_missing`, others | Stop and report the status as-is.                                                                                                                                                                                                                             |

Even when GitLab says `mergeable`, an MR that's been open for a while may be well behind the target. That's fine. Step 4 tests the actual merge result.

## 3. Resolve conflicts in a worktree

Only when step 2 sent you here. Work in the scratchpad:

```bash
git fetch origin
WT=<scratchpad>/merge-<iid>
git worktree add --detach "$WT" origin/<source>
ln -s "$PWD/practice-one/node_modules" "$WT/practice-one/node_modules"   # lint/build need it; never pnpm install
```

The worktree is **detached** on `origin/<source>`, so it works even if the user has the source branch checked out. If the user has a local `<source>` branch that's ahead of `origin/<source>` (`git log origin/<source>..<source>`), stop and ask. They have unpushed work on it.

1. **Baseline** (before merging, so you can tell new failures from old ones): in `$WT/practice-one`, run `rm -rf dist && pnpm --config.verify-deps-before-run=false lint:eslint` and record the counts. Run the same on `origin/<target>` too (`git -C "$WT" switch --detach origin/<target>`, lint, then switch back to `origin/<source>`). The merged result must be no worse than the worse of the two.
2. **Merge:** `git -C "$WT" merge --no-ff --no-commit origin/<target>`. List the conflicted files with `git -C "$WT" diff --name-only --diff-filter=U`.
3. **Understand both sides before editing each file:**
   - `git log --oneline $(git merge-base origin/<source> origin/<target>)..origin/<target> -- <file>` shows what the target changed, and why. Read those commits and their MRs.
   - The same command with `..origin/<source>` shows what this MR changed.
   - `git -C "$WT" diff <file>` shows the conflict, with both sides (use `git checkout --conflict=diff3 <file>` to see the base as well).
4. **Resolve each hunk so both intents survive.** Keep the MR's fix _and_ the target's change, adapted to each other. For example: the target renamed a function the MR calls, so the MR's code uses the new name. The target added a reducer case next to the MR's, so keep both cases.
   - Take one side wholesale only if the other side's change is truly superseded (e.g. the target already contains the same fix). Say so in the merge commit body.
   - Also check **non-conflicting semantic breaks**. Files that merged cleanly can still break: a call to something the other side removed, a type that changed shape, a duplicated import. `tsc` catches most of these. Grep for the symbols both sides touched.
   - Match the surrounding style (path aliases, Tailwind, the `useCallback` pattern in `stores/book/index.tsx`).
5. **Stop and ask** (show both sides and your proposed resolution) when:
   - Both sides changed the same logic in incompatible ways and you can't keep both behaviours.
   - The conflict is in `package.json`, `pnpm-lock.yaml` or any lockfile. You can't regenerate a lockfile here.
   - A conflicted file is binary, or one side deleted a file the other modified.
   - The resolution needs code beyond reconciling the two sides (new logic, new dependency, touching unrelated files).
6. **Check the resolution:**
   ```bash
   cd "$WT/practice-one"
   git -C "$WT" diff --check                          # leftover markers / whitespace
   grep -rnE '^(<<<<<<<|=======|>>>>>>>)( |$)' . --exclude-dir=node_modules || true
   pnpm --config.verify-deps-before-run=false exec eslint --fix <resolved files under practice-one, listed explicitly>
   pnpm --config.verify-deps-before-run=false exec tsc --noEmit
   ```
   The husky hooks don't run (they aren't executable), so this is the hook's job done by hand, on the resolved files only.
7. **Commit the merge.** Stage the resolved files by name, then `git -C "$WT" commit` with:

   ```
   Merge branch '<target>' into <source>

   Resolve conflicts with <target>:
   - <file>: <what each side did and how they were combined>

   Refs !<iid>

   <commit attribution trailer the session requires>
   ```

   commitlint's config-conventional ignores `Merge …` subjects by default. Validate anyway with `printf '%s\n' "<message>" | pnpm --config.verify-deps-before-run=false exec commitlint --config=commitlint.config.cjs`.

8. **Test the merge result.** Do all of step 4's checks inside `$WT`. Also exercise the areas where the conflicts were, not just the MR's own feature.
9. **Push** (ask first unless `--yes`). Show the user the conflicted files, a one-line resolution per file, `git -C "$WT" show --stat HEAD`, and the test summary. Then:
   ```bash
   git -C "$WT" push origin HEAD:refs/heads/<source>
   ```
   This is a plain fast-forward push. If it's rejected, someone pushed to the source branch meanwhile. **Don't force.** Fetch, start step 3 over from the new `origin/<source>`, and tell the user.
10. Re-read the MR until `sha` equals your pushed `HEAD` and `detailed_merge_status` settles. Then go back to step 2 (e.g. a pipeline may now need to pass).

## 4. Test the merge result

There's no CI in this repo (`.gitlab-ci.yml` is absent), so this local check is the only gate. Test **what will actually land on the target**, not just the source branch:

- If step 3 ran and its tests (3.8) passed on the exact commit you pushed, this step is done. Go to step 5.
- Otherwise, create a worktree and simulate the merge:
  ```bash
  git worktree add --detach "$WT" origin/<target>
  ln -s "$PWD/practice-one/node_modules" "$WT/practice-one/node_modules"
  git -C "$WT" merge --no-ff --no-commit origin/<source>     # must apply cleanly
  ```

Then run these in `$WT/practice-one`:

1. **Static:** `rm -rf dist && pnpm --config.verify-deps-before-run=false lint:eslint`, then `pnpm --config.verify-deps-before-run=false build`, then `rm -rf dist`. No new ESLint errors or warnings compared with `origin/<target>`'s baseline (step 3.1, or run it now), and the build passes.
2. **Runtime smoke:** run it if the MR changes runtime code under `src/`. Start the dev server and drive it with the Playwright MCP tools exactly as in `/resolve-gitlab-issue` step 6 (no backend, http://localhost:3000, `--isolated` browser). Run the dev server from `$WT/practice-one`.
   - Re-run the MR's "How it was tested" steps from its description, and confirm they still hold on the merged code.
   - If there were conflicts, also exercise the target-side feature that conflicted.
   - Check the console for new errors.
   - Skip this check for docs-only or config-only MRs, and say so.
3. Stop every server you started (by PID, see Gotchas). Remove the worktree with `git worktree remove --force "$WT" && git worktree prune`.

If anything fails, **don't merge.**

- If you made the conflict resolution in step 3, fix it with a new commit on the worktree before pushing, or with a follow-up commit pushed the same way, never amend after pushing.
- If the failure is in the MR's own code (no conflicts involved), stop and report it. Fixing the MR is the author's job, or a job for `/resolve-gitlab-issue`.

## 5. Merge

Re-read the MR once more. `detailed_merge_status` must be `mergeable`, and `sha` must equal the commit you tested (the source head; after step 3, your pushed merge commit). If `sha` changed, go back to step 2. New commits haven't been tested.

Unless `--yes` was passed, show the user the following and ask before merging:

- `!<iid>` title, `<source>` → `<target>`
- The commits (`git log --oneline origin/<target>..origin/<source>`) and `git diff --stat origin/<target>...origin/<source>`
- The merge options:
  - Merge method: the project's `merge_method`.
  - Squash: the MR's `squash`, or forced by `squash_option` `always`/`never`.
  - Delete the source branch: always yes, unless the source is the project's `default_branch`, a protected branch (`glab api "projects/:id/protected_branches"`), or lives in a fork (`source_project_id != target_project_id`). In those cases keep it and say why.
- Linked issues that will close.
- The test summary.

Merging is outward-facing and effectively irreversible.

```bash
glab mr merge <iid> --sha <tested sha> --auto-merge=false --yes \
  [--squash]                  # only if the MR/project asks for it
  --remove-source-branch      # always, except for the cases listed above
```

Don't add `--rebase`, a custom `--message`, or auto-merge unless the user asks. Keep GitLab's default merge commit message, which references the MR.

Verify with `glab api "projects/:id/merge_requests/<iid>"`: `state: merged`, and note `merge_commit_sha` (or `squash_commit_sha`) and `merged_at`.

- If the merge was refused (`405`/`406`/`409`, or the state is still `opened`), re-read `detailed_merge_status`, report it, and go back to step 2 once.
- Don't retry blindly.

## 6. After the merge

1. `git fetch origin --prune`. Confirm the merge commit is on `origin/<target>` (`git branch -r --contains <merge sha>`).
2. **Linked issues:** for each issue in `closes_issues`, check `glab api "projects/:id/issues/<n>"` → `state: closed`. The target may not be the default branch, and GitLab only auto-closes issues on merge into the default branch. If an issue is still open, tell the user and offer to close it with `glab issue close <n>`. Don't close it without asking.
3. **Source branch:** confirm it's gone with `git ls-remote --heads origin <source>` (`git fetch --prune` above already dropped `origin/<source>`). If it still exists, report it; don't delete it yourself. If the user has a local `<source>` branch that's now merged (`git branch --merged origin/<target>`), offer `git branch -d <source>`. Don't run it unasked.
4. **Local target:** if the user's local `<target>` is behind `origin/<target>`, mention it (e.g. `git pull --ff-only` when they're on it). Don't pull for them, since their tree may have uncommitted work.

## 7. Wrap up

1. Report:
   - The MR URL, `<source>` → `<target>`, and the merge commit sha.
   - Whether conflicts were resolved: one line per file, plus the commit that resolved them.
   - A one-line test summary.
   - The linked issues' state.
   - Whether the remote source branch was deleted (or why it was kept).
2. Check that the user's branch and `git status --porcelain` match step 1.5, that `git worktree list` shows no leftover worktree, and that no dev server or Storybook process is still running.
3. If the MR came from `docs/likely-bugs.md` (the issue says `Source: docs/likely-bugs.md #<n>`), suggest marking that entry fixed with a `- **Merged:** <MR url>` line. Don't edit it yourself.
