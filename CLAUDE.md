# CLAUDE.md

See [CONTRIBUTING.md](CONTRIBUTING.md) for the doc map and contribution workflow.

## Operating rules

- This package wraps [hzrd149/blossom-server](https://github.com/hzrd149/blossom-server), a Deno + Hono content-addressed blob storage server implementing the Nostr Blossom protocol.
- The upstream config file (`config.yml`) is the single source of truth. The StartOS `configYaml` file model writes to it directly; do not introduce a parallel store for the same values.
- Authentication is Nostr-signed events (kind 24242). There are no traditional user accounts. The only credentials StartOS manages are the HTTP Basic Auth for the upstream `/admin` dashboard.
- The `publicDomain` config field is baked into every blob descriptor URL returned to clients **and** is enforced against the BUD-11 `server` tag in Nostr auth events. Changing it is operator-visible behaviour — clients that signed events for the old domain will get 401s. Surface this in any new action that touches `publicDomain`.
- Per-blob and per-user management (force-delete, ban, report review) is handled in the upstream admin dashboard at `/admin`. Do **not** add StartOS actions that duplicate those flows.
- The upstream image already ships ffmpeg + sharp; `media.enabled: true` is the default. If a future bump removes ffmpeg, flip the default to `false`.
