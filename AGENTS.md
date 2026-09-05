# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- This package wraps [hzrd149/blossom-server](https://github.com/hzrd149/blossom-server), a Deno + Hono content-addressed blob storage server implementing the Nostr Blossom protocol.
- The upstream config file (`config.yml`) is the single source of truth. The StartOS `configYaml` file model writes to it directly; do not introduce a parallel store for the same values.
- Authentication is Nostr-signed events (kind 24242). There are no traditional user accounts. The only credentials StartOS manages are the HTTP Basic Auth for the upstream `/admin` dashboard.
- The `publicDomain` config field is baked into every blob descriptor URL returned to clients **and** is enforced against the BUD-11 `server` tag in Nostr auth events. Changing it is operator-visible behaviour — clients that signed events for the old domain will get 401s. Surface this in any new action that touches `publicDomain`.
- Per-blob and per-user management (force-delete, ban, report review) is handled in the upstream admin dashboard at `/admin`. Do **not** add StartOS actions that duplicate those flows.
- The upstream image already ships ffmpeg + sharp; `media.enabled: true` is the default. If a future bump removes ffmpeg, flip the default to `false`.
- `CONTRIBUTING.md` — build, version-update and contribution workflow for this repo.
