# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

- Do not add a second store (a `store.json`) for values `config.yml` can hold: upstream reads only `config.yml`, so a copy drifts from what the server enforces.
- Never put `pubkeys` on the four retention rules. Upstream skips a rule that lists pubkeys for every other key — at upload whatever `requirePubkeyInRule` says, and at prune — so Disable Private Mode would stop opening the server and files from other keys would never expire. The allowlist has a trailing `*` rule of its own (`rulesOf` in `startos/fileModels/config.yml.ts`).
- A new action that changes `publicDomain` must tell the user that clients signing auth events for the old domain will be refused.
- Do not add actions for per-blob or per-user management (force-delete, ban, report review): upstream's `/admin` dashboard owns them.
