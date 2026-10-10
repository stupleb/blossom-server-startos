<p align="center">
  <img src="icon.svg" alt="Blossom Server Logo" width="21%">
</p>

# Blossom Server on StartOS

> Everything not listed in this document should behave the same as upstream
> Blossom Server. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Blossom Server](https://github.com/hzrd149/blossom-server) stores files for Nostr clients and serves them back by SHA-256 hash. Uploads are authorized by Nostr-signed events instead of user accounts. This package runs upstream's published image and manages its `config.yml` through StartOS actions.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The package runs upstream's published image, unmodified, in one subcontainer.

| Property      | Value                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| Image         | `ghcr.io/hzrd149/blossom-server`, as upstream publishes it                     |
| Architectures | x86_64, aarch64                                                                |
| Entrypoint    | Upstream's, given the path of the StartOS-managed `config.yml` as its argument |
| Subcontainer  | `blossom-sub`                                                                  |

`blossom-sub` runs two things in order: a one-shot `chown` that gives the data directory to the image's `deno` user, then the server itself (daemon id `primary`).

## Volume and Data Layout

All state is on one volume, `main`. The container sees two parts of it.

| Path on `main` | In the container             | Holds                                                                                                                                                                                                             |
| -------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/`        | `/app/data`, read-write      | `blobs/`, the stored files, named by hash; `sqlite.db`, the record of blobs, owners and reports, with SQLite's `-wal` and `-shm` files beside it; `media-tmp/`, work files of media optimisation and thumbnailing |
| `config.yml`   | `/app/config.yml`, read-only | The server's configuration                                                                                                                                                                                        |

## File Models

The package owns one file: upstream's own `config.yml`. It keeps no separate store of StartOS-side state and passes no setting by environment variable.

`config.yml` is YAML at the root of `main`.

- **How it is seeded.** Every init (install, update, restore, container rebuild) merges the package's defaults into the file: a missing key gets its default, a value of the wrong type is replaced by its default, and everything else is left as found. Keys the package has no model for are kept as they are.
- **Re-asserted on every init.** `host` (`0.0.0.0`), `port` (`3000`), `database.path`, `storage.backend` (`local`), `storage.local.dir`, `landing.enabled` (`true`) and `dashboard.enabled` (`true`). A hand edit to any of these reverts.
- **Written by actions.** `publicDomain`, `dashboard.password`, `storage.rules`, `storage.removeWhenNoOwners`, `upload.maxSize`, `upload.requirePubkeyInRule` and `media.requirePubkeyInRule`. A hand edit survives until the matching action next runs. `publicDomain` is also filled in by the package whenever it is empty.
- **Seeded once, then the operator's.** Everything else. A hand edit survives.
- **How `storage.rules` is laid out.** Four retention rules (`image/*`, `video/*`, `audio/*`, `*`) that never list pubkeys, followed, when the allowlist is not empty, by one more `*` rule that carries it. Upstream consults that last rule only while `requirePubkeyInRule` is on, so the allowlist stays in the file when Private Mode is off, and the retention periods apply to every blob, whoever uploaded it. Set Retention Periods and Manage Allowed Pubkeys each rewrite the whole list to this layout, so a rule added by hand is dropped the next time either runs.
- **Where the defaults differ from upstream's.** `upload.requirePubkeyInRule` starts `true` (Private Mode), `media.enabled` starts `true`, and the default rules add one for `audio/*`. Upstream generates and logs a dashboard password when `dashboard.password` is empty; here the service is held on a task until one is set, so that never happens.
- **When a change takes effect.** The server reads the file at startup. An action that changes it restarts the server; after a hand edit, restart the service.

## Dependencies

None. The server needs no other service.

## Network Access and Interfaces

One HTTP listener on port 3000 serves both interfaces, so they always have the same addresses.

| Interface id | Type | Port | Path     | Serves                                                                    |
| ------------ | ---- | ---- | -------- | ------------------------------------------------------------------------- |
| `primary`    | `ui` | 3000 | `/`      | The Blossom endpoints that Nostr clients use, and upstream's landing page |
| `admin`      | `ui` | 3000 | `/admin` | Upstream's admin dashboard, behind HTTP Basic Auth                        |

`publicDomain` in `config.yml` names one of those addresses, port included where the address has one. The server builds every blob URL it returns from it, and refuses a Nostr auth event whose `server` tag names a different host with `401 Auth token not valid for this server`.

## Installation and First-Run Flow

Upstream has no setup wizard: it reads `config.yml` and starts. The package writes that file at install and holds the service on tasks until the operator has made the choices upstream leaves to hand-editing.

1. `config.yml` is seeded with Private Mode on, the media endpoint on, and the dashboard on.
2. `publicDomain` is filled in with the `primary` interface's `.local` address, or with the first address StartOS reports when it has none.
3. Tasks are raised for what is still missing: on a fresh install, an admin password and an allowlist. See [Tasks](#tasks).

The service does not start while a critical task is pending. Disable Private Mode can be run in place of adding an allowlist; it withdraws that task.

## Actions

The package has eight actions, all user-facing, all runnable whether the service is running or stopped. Every one except Show Admin Credentials changes `config.yml` and so restarts the server once.

- **Set Admin Password** (`set-admin-password`): run it at first setup, where it is a task, or to rotate the dashboard password. It writes a new random password to `dashboard.password` and returns it with the username. The previous password stops working, and every run produces a different one.
- **Show Admin Credentials** (`show-admin-credentials`): returns the current dashboard username and password. Read-only and repeatable.
- **Set Public Domain** (`set-primary-url`): run it when the address clients use changes, when uploads fail with `401 Auth token not valid for this server`, or when returned blob URLs point somewhere clients cannot reach. It writes the chosen address to `publicDomain`; the choices are the interface's current addresses. URLs already handed out keep the old address. Choosing the address already set changes nothing and restarts nothing.
- **Set Retention Periods** (`set-retention-periods`): sets how long a blob is kept after it was last accessed, per category. It rewrites `storage.rules`, keeping the allowlist. A shorter period also applies to blobs already stored: any that are past it are deleted at the next prune cycle. Repeatable.
- **Manage Allowed Pubkeys** (`set-allowed-pubkeys`): sets which Nostr keys may upload while Private Mode is on. It rewrites `storage.rules`, keeping the retention periods. The list can be edited while Private Mode is off and takes effect when Private Mode is turned on. Emptying it while Private Mode is on leaves a server nobody can upload to and raises the allowlist task. Repeatable.
- **Set Max Upload Size** (`set-upload-limit`): writes `upload.maxSize`, the limit for `/upload` and `/mirror`. The media endpoint has its own limit, `media.maxSize`, which no action changes. Repeatable.
- **Enable / Disable Private Mode** (`toggle-private-mode`): one action whose name follows the current state. It flips `upload.requirePubkeyInRule` and `media.requirePubkeyInRule` together and leaves the allowlist where it is. Off, any Nostr key may upload; on, only keys on the allowlist. Enabling is refused while the allowlist is empty. Blobs already stored are not touched either way. Each run flips the state, so running it twice returns to where it started.
- **Enable / Disable Ownerless Cleanup** (`toggle-ownerless-cleanup`): flips `storage.removeWhenNoOwners`. On, a blob that no key owns any longer is deleted at the next prune cycle, whatever its retention period. Each run flips the state.

Deleting one blob, banning a key and reviewing reports are done in upstream's dashboard at `/admin`, not by actions.

## Tasks

The package raises three tasks. The two critical ones hold the service: it will not start while one is pending. Set Public Domain is important, so it never stops the server.

| Task                   | Severity  | Raised when                                                                                                                                             | Cleared when                                                                                                                          |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Set Admin Password     | critical  | `dashboard.password` is empty, as on every fresh install                                                                                                | The action runs                                                                                                                       |
| Manage Allowed Pubkeys | critical  | Private Mode is on and the allowlist is empty: on every fresh install, and again if the list is emptied while Private Mode is on                        | The action runs, a key is added, or Private Mode is turned off                                                                        |
| Set Public Domain      | important | `publicDomain` is empty and StartOS reports no address to fill it with, or the address in `publicDomain` is not among the interface's current addresses | The action runs, or the address is among the interface's addresses again, including when the package fills an empty `publicDomain` in |

Raising a critical task stops a running service, and clearing it does not start the service again.

## Health Checks

There is one check, on the `primary` daemon: it passes once something is listening on port 3000.

| Check                      | Probes                             | Grace period                |
| -------------------------- | ---------------------------------- | --------------------------- |
| Blossom Server (`primary`) | TCP port 3000 inside the container | 10 seconds, the SDK default |

The server can take longer than the grace period to open its port, so a failure shortly after a start is not a fault by itself. A failure that persists means the server never opened the port; the service log carries upstream's startup output and the reason.

## Backups and Restore

The whole `main` volume is copied as it is; nothing is dumped or rebuilt.

That covers the blobs, the SQLite database with its `-wal` and `-shm` files, and `config.yml`. StartOS stops the service for the backup, so the database is copied at rest. Nothing is excluded.

A restored instance has nothing to rebuild. Its `publicDomain` is the address it had when the backup was made; where that address does not exist, as on a different server, the Set Public Domain task is raised.

## Limitations and Differences

1. **Local storage only.** `storage.backend` is fixed to `local`, so upstream's S3 backend is unavailable.
2. **The dashboard and the landing page are always on.** `dashboard.enabled` and `landing.enabled` are fixed to `true`.
3. **One allowlist, for every kind of file.** Upstream can scope individual rules to particular pubkeys, for instance to give some keys longer retention. The package keeps a single allowlist, and its actions rewrite `storage.rules` to its own layout.
4. **One switch for uploads and media.** Upstream has a separate `requirePubkeyInRule` for `/upload` and for `/media`. Private Mode sets both.
5. **A fixed public address.** Upstream builds blob URLs from the host each request arrived on unless `publicDomain` is set. The package always sets it.
6. **x86_64 and aarch64 only.** Upstream publishes no riscv64 image.

---

## Quick Reference for AI Consumers

```yaml
package_id: blossom-server
image: ghcr.io/hzrd149/blossom-server
architectures: [x86_64, aarch64]
subcontainers: [blossom-sub]
volumes:
  main: /app/data (subpath data), /app/config.yml (subpath config.yml, read-only)
file_models:
  - config.yml
startos_managed_env_vars: []
dependencies: none
interfaces:
  primary: { type: ui, port: 3000 }
  admin: { type: ui, port: 3000 }
actions:
  - show-admin-credentials
  - set-admin-password
  - set-primary-url
  - set-retention-periods
  - set-allowed-pubkeys
  - set-upload-limit
  - toggle-private-mode
  - toggle-ownerless-cleanup
tasks:
  - { action: set-admin-password, severity: critical }
  - { action: set-allowed-pubkeys, severity: critical }
  - { action: set-primary-url, severity: important }
health_checks:
  - primary
```
