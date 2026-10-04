# Updating the upstream version

Blossom Server is taken as upstream's published image, `ghcr.io/hzrd149/blossom-server`, pinned by tag in the manifest. Nothing is built from source.

## Determining the upstream version

- Image: `ghcr.io/hzrd149/blossom-server` on the GitHub Container Registry.
- Current pin: `images['blossom-server'].source.dockerTag` in `startos/manifest/index.ts` (format: `ghcr.io/hzrd149/blossom-server:<version>`, no `v`).
- Upstream publishes git tags (`v<version>`) and no GitHub releases. Newest tag:
  ```sh
  git ls-remote --tags --sort=-v:refname https://github.com/hzrd149/blossom-server 'v*' | head -1
  ```
- **A tag, or a version in upstream's `CHANGELOG.md`, does not mean the image exists.** Upstream has raised its version on `master` without tagging or publishing it. Confirm the image resolves for both architectures before pinning it:
  ```sh
  docker buildx imagetools inspect ghcr.io/hzrd149/blossom-server:<version>
  ```
  It must list `linux/amd64` and `linux/arm64`. A version with no image answers `not found`.

## Applying the bump

In `startos/manifest/index.ts`, set `dockerTag` to `ghcr.io/hzrd149/blossom-server:<new version>`.

Then diff `config.example.yml` and `src/config/` between the two upstream tags. `startos/fileModels/config.yml.ts` writes a fixed set of keys into upstream's own `config.yml`, so a key upstream renames, removes, or adds with a default the package must not accept needs the file model to follow, and a migration in `startos/versions/current.ts` when existing installs are affected.
