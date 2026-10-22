# Updating the upstream version

Blossom Server is taken as upstream's published image, `ghcr.io/hzrd149/blossom-server`, pinned by tag in the manifest, with a temporary CA-store layer from the root `Dockerfile`. Nothing is built from source.

## Determining the upstream version

- Image: `ghcr.io/hzrd149/blossom-server` on the GitHub Container Registry.
- Current pin: the `IMAGE` build arg of `images['blossom-server'].source.dockerBuild` in `startos/manifest/index.ts` (format: `ghcr.io/hzrd149/blossom-server:<version>`, no `v`).
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

In `startos/manifest/index.ts`, set the `IMAGE` build arg to `ghcr.io/hzrd149/blossom-server:<new version>`.

If the new image runs Deno 2.9.8 or later, its built-in roots no longer trust emSign ECC Root CA - G3: remove the root `Dockerfile` and go back to `dockerTag` in the same change.

```sh
docker run --rm --entrypoint deno ghcr.io/hzrd149/blossom-server:<version> --version
```

Then diff `config.example.yml` and `src/config/` between the two upstream tags. `startos/fileModels/config.yml.ts` writes a fixed set of keys into upstream's own `config.yml`, so a key upstream renames, removes, or adds with a default the package must not accept needs the file model to follow, and a migration in `startos/versions/current.ts` when existing installs are affected.

`media.enabled` defaults to `true` because the image ships ffmpeg. Confirm the new image still does; if this prints nothing, set that default to `false` in `startos/fileModels/config.yml.ts`:

```sh
docker run --rm --entrypoint sh ghcr.io/hzrd149/blossom-server:<version> -c 'command -v ffmpeg'
```
