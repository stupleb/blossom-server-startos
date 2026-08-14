<p align="center">
  <img src="icon.svg" alt="Blossom Server Logo" width="21%">
</p>

# Blossom Server on StartOS

> **Upstream repo:** <https://github.com/hzrd149/blossom-server>
> **Blossom protocol:** <https://github.com/hzrd149/blossom>
>
> Everything not listed in this document should behave the same as upstream
> Blossom Server. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable.

Blossom Server is a content-addressed blob storage server for the Nostr Blossom protocol. Clients upload files via HTTP and retrieve them by SHA-256 hash. Authentication is Nostr-signed events (kind 24242, BUD-11) — there are no traditional user accounts. Retention is governed by configurable MIME-type rules that double as an upload allowlist.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                  |
| ------------- | -------------------------------------- |
| Image         | `ghcr.io/hzrd149/blossom-server`       |
| Architectures | x86_64, aarch64                        |
| Entrypoint    | Upstream default, passed the path to the StartOS-managed `config.yml` |

The image ships with `ffmpeg` and `sharp` so the BUD-05 media optimisation endpoint works out of the box.

---

## Volume and Data Layout

| Path on volume      | Mount point in container | Purpose                                  |
| ------------------- | ------------------------ | ---------------------------------------- |
| `data/blobs/`       | `/app/data/blobs`        | Content-addressed blob files             |
| `data/sqlite.db`    | `/app/data/sqlite.db`    | Blob metadata, owners, reports           |
| `config.yml`        | `/app/config.yml`        | StartOS-managed Blossom config (read-only in the container) |

All data lives in the single `main` volume — backup is atomic.

---

## Installation and First-Run Flow

On install, StartOS:

1. Seeds `config.yml` with safe defaults (port 3000, local storage, admin dashboard on, media endpoint on, list endpoint off, default retention rules, **Private Mode on**).
2. Picks a sensible default for `publicDomain` (prefers `*.local`).
3. Creates **three critical tasks** that you must complete before the server is usable:
   - **Set Admin Password** — the admin dashboard at `/admin` is locked until this runs.
   - **Set Public Domain** — only surfaced if no `.local` hostname was auto-pickable.
   - **Manage Allowed Pubkeys** — Private Mode is on by default, so until you add at least one Nostr pubkey to the allowlist **nobody can upload**, including you.

There is no separate setup wizard. Once those tasks are done, the service is fully operational. Allowing public uploads (any authenticated pubkey) requires explicitly running the **Disable Private Mode** action.

---

## Configuration Management

| StartOS-Managed (via actions or locked)                              | Upstream-Managed                              |
| -------------------------------------------------------------------- | --------------------------------------------- |
| `publicDomain`, `dashboard.username`/`password`, `storage.rules`, `storage.removeWhenNoOwners`, `upload.maxSize`, `upload.requirePubkeyInRule` | Per-blob deletion, per-user deletion, report review (all done in the upstream `/admin` dashboard) |
| Locked values: `port: 3000`, `host: 0.0.0.0`, `storage.backend: local`, `storage.local.dir`, `database.path`, `dashboard.enabled: true`, `landing.enabled: true` | Media (BUD-05) image and video optimisation defaults, thumbnail generation settings (`media.thumbnail`, 6.2.0+), prune timing, Nostr lookup relays — edit `config.yml` directly via the StartOS file viewer if you need to change them |

The on-disk `config.yml` is the single source of truth. StartOS actions write to it; the daemon restarts on every change. Keys outside the StartOS schema are preserved untouched.

---

## Network Access and Interfaces

A single HTTP listener on port 3000 carries both interfaces:

| Interface       | Path     | Purpose                                                  |
| --------------- | -------- | -------------------------------------------------------- |
| Blossom Server  | `/`      | Public Blossom endpoint (BUD-01/02/04/05/06/08/09/11)    |
| Admin Dashboard | `/admin` | Operator console — Basic Auth, credentials set via action |

Both are exposed via every enabled StartOS gateway (LAN IP, `.local`, clearnet domain, StartTunnel, custom domains).

---

## Actions (StartOS UI)

| Action                       | Purpose                                                                                                | Inputs                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Show Admin Credentials       | Display the current dashboard username and password.                                                   | None                                            |
| Set Admin Password           | Generate a new 32-char random password for the dashboard. Replaces the existing one.                   | None                                            |
| Set Public Domain            | Choose which of your service hostnames is canonical. Used in blob descriptor URLs and BUD-11 validation. | Hostname (select from available)               |
| Set Retention Periods        | Per-category expiration: Images (`image/*`), Videos (`video/*`), Audio (`audio/*`), Other (`*`).        | Four duration strings (e.g. "1 month")          |
| Manage Allowed Pubkeys       | Hex-encoded Nostr pubkeys allowed to upload when Private Mode is on. Applied uniformly to all categories. | List of hex pubkeys (64 chars)                 |
| Set Max Upload Size          | Change the maximum accepted blob size.                                                                 | Number (MB)                                     |
| Enable / Disable Private Mode | Toggle `upload.requirePubkeyInRule`. Refuses to enable when the allowlist is empty.                   | None                                            |
| Enable / Disable Ownerless Cleanup | Toggle `storage.removeWhenNoOwners` — delete blobs with no remaining owners on every prune cycle. | None                                            |

For per-blob operations (delete a specific blob, ban a pubkey, dismiss a report), use the upstream admin dashboard at `/admin`.

---

## Backups and Restore

**Included:** the `main` volume, which holds `data/blobs/`, `data/sqlite.db`, and `config.yml`. SQLite is checkpointed atomically with the file copy.

**Excluded:** nothing — there is no external state.

**Restore behavior:** the volume is restored before the daemon starts. The previous `publicDomain` and admin password are restored as-is. If the previous `publicDomain` is no longer a valid hostname (e.g., restored on a different StartOS box), a critical task prompts you to pick a new one.

---

## Health Checks

| Check          | Method                  | Messages                                                                |
| -------------- | ----------------------- | ----------------------------------------------------------------------- |
| Blossom Server | Port listening on 3000  | Success: "Blossom Server is ready" / Error: "Blossom Server is not ready" |

---

## Dependencies

None. Blossom Server is fully standalone.

---

## Limitations and Differences

1. **Architectures:** x86_64 and aarch64 only. riscv64 is not supported (no upstream image).
2. **Storage backend is locked to `local`.** S3 is not exposed as a configuration option. Use the upstream image directly if you need S3.
3. **Per-blob management is not surfaced as StartOS actions.** Browsing, search, and force-delete live in the upstream admin dashboard at `/admin`.
4. **No total-storage cap.** Blossom has no `maxTotalBytes` setting; once the volume fills, uploads will fail at the filesystem layer. Monitor disk use through the StartOS dashboard, or use Set Retention Periods to shorten expirations.
5. **Reports queue (BUD-09)** is operator-managed via the upstream `/admin/reports` view, not via a StartOS action.
6. **Most Nostr clients require port 443.** StartOS assigns each service a unique high-numbered HTTPS port (e.g. `:55769`) for its LAN, `.local`, and Tor hostnames. Many Nostr clients — particularly on mobile — accept only a `https://<host>` URL with no custom port. In practice this means you'll need to attach a **clearnet custom domain** (Let's Encrypt) or **StartTunnel** to the Blossom interface so the service is reachable on the implicit `:443`. The LAN/`.local`/Tor endpoints still work for browsers and CLI clients that tolerate explicit ports.

---

## What Is Unchanged from Upstream

- All BUD endpoints (`/upload`, `/mirror`, `/media`, `/list`, `/report`, `GET/HEAD /:sha256`, `DELETE /:sha256`) behave exactly as upstream documents.
- Nostr authentication (BUD-11, kind 24242 events) is unchanged.
- The automatic prune loop and retention rule semantics are unchanged. Thumbnails (6.2.0+) are excluded from both expiry rules and ownerless cleanup and are deleted only alongside their parent blob — verified against the upstream prune queries.
- Image optimisation (sharp) and video transcoding (ffmpeg) defaults are unchanged, as are NIP-94 metadata tags and automatic media thumbnails (both added upstream in 6.2.0; thumbnail settings live under `media.thumbnail` in `config.yml`).
- The landing page and admin dashboard UI are upstream's, unmodified.
- The SQLite schema is upstream's.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: blossom-server
architectures: [x86_64, aarch64]
volumes:
  main: /app/data + /app/config.yml
ports:
  ui: 3000
dependencies: none
startos_managed_env_vars: none
actions:
  - show-admin-credentials
  - set-admin-password
  - set-primary-url
  - set-retention-periods
  - set-allowed-pubkeys
  - set-upload-limit
  - toggle-private-mode
  - toggle-ownerless-cleanup
```
