# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

- Do not add a second store (a `store.json`) for values `config.yml` can hold: upstream reads only `config.yml`, so a copy drifts from what the server enforces.
- Never make an action rewrite the whole `storage.rules` list: the dashboard's rule editor writes it too, and a rewrite drops its rules. Manage Allowed Pubkeys edits only the rule carrying `ALLOWLIST_NOTE`, and adds it last, never onto a retention rule: upstream skips a rule that lists pubkeys for every other key, so Disable Private Mode would stop opening the server.
- Keep `storage.rules` out of `main.ts`'s `.const()`, all but the allowlist rule: the dashboard applies its rule edits live, and upstream rereads rules only when the dashboard writes them, so the allowlist action relies on that one rule restarting the server.
- Anything that writes `upload.requirePubkeyInRule` must set `report.enabled` to its opposite in the same merge: upstream stores a report from any key, so a report endpoint left on behind Private Mode is an open write.
- A new action that changes `publicDomain` must tell the user that clients signing auth events for the old domain will be refused.
- Do not add actions for per-blob or per-user management (force-delete, ban, report review) or for retention rules: upstream's `/admin` dashboard owns them.
