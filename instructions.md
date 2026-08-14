# Blossom Server

Blossom Server is a content-addressed blob storage server for the Nostr Blossom protocol. Nostr clients upload files to it and retrieve them by SHA-256 hash, with all authentication done via Nostr-signed events (kind 24242) — there is no traditional user account system.

## Documentation

- [Blossom Server upstream README](https://github.com/hzrd149/blossom-server/blob/master/README.md)
- [Blossom protocol specification](https://github.com/hzrd149/blossom)
- [BUD specs (Blossom Upgrade Documents)](https://github.com/hzrd149/blossom/blob/master/buds/)

## What you get on StartOS

- **A Nostr-authenticated blob server** reachable at `/` over every enabled StartOS gateway.
- **An admin dashboard** at `/admin` for browsing blobs, managing users, and reviewing flagged content.
- **An automatic prune loop** that deletes expired blobs according to configurable retention rules.
- **Image + video optimisation** via the BUD-05 `/media` endpoint (ffmpeg and sharp included in the image). Media uploads also get automatic best-effort thumbnails, returned to clients as NIP-94 `thumb` tags.

## Getting set up

Blossom ships in **Private Mode** — uploads are rejected unless the uploader's Nostr pubkey is on your allowlist. This is intentional: an open Blossom server lets anyone on the internet park files on your disk. Complete the three critical tasks below to turn the server on.

1. **Set Admin Password.** Find the task in the critical tasks tray and run it. The action returns a generated username and password — copy the password somewhere safe.
2. **Manage Allowed Pubkeys.** Add the hex pubkey(s) you want to permit. Most clients display npubs — convert to hex at <https://damus.io/key/>. At minimum, add your own pubkey. Add others (family, friends, customers) as needed.
3. **Set Public Domain** if the auto-selected hostname isn't right. This is the hostname your Nostr clients will reach the server at. It's baked into every blob URL returned to clients and is enforced against the BUD-11 `server` tag in Nostr auth events.
4. **(Optional) Set Retention Periods** to control how long each kind of blob is kept. Defaults: images 1 month, videos 1 week, audio 1 week, everything else 1 week.
5. **Open the Admin Dashboard** by clicking the `/admin` interface and signing in with the credentials from step 1.

If you want to run an open server (anyone with a Nostr key may upload), run the **Disable Private Mode** action after completing the steps above.

## Plugging it into a Nostr client

Point your Nostr client's "media server" (or equivalent) setting at the Public Domain you chose above. Most clients support either a single Blossom server or a media-server-list event (NIP-96/Blossom). Your client signs the upload request with your Nostr key, and Blossom verifies the signature before accepting.

### A note about port 443

StartOS assigns this service a high-numbered HTTPS port (e.g. `:55769`) on every gateway. **Many Nostr clients — especially on mobile — won't accept a URL with a non-standard port.** They expect `https://<host>` with the implicit `:443`. In practice this means:

- **For LAN, `.local`, or Tor access:** works fine in browsers and CLI tools, but most mobile clients will reject these URLs.
- **For real Nostr client use:** attach a **clearnet custom domain** (StartOS will provision a Let's Encrypt cert) or **StartTunnel** in StartOS Settings → Gateways. Either route gives you a stable hostname on the standard `:443` port. Then run **Set Public Domain** in Blossom and pick that hostname.

Behavior varies by client, so test yours before committing to a setup.

## Limitations

- **No total-storage cap** — Blossom doesn't have a "stop when full" knob. Watch your disk usage in the StartOS dashboard, and use **Set Retention Periods** to keep storage bounded.
- **Storage backend is locked to local filesystem** — S3 is not exposed.
- **Per-blob management lives in the upstream dashboard**, not in StartOS actions. To delete a specific blob, ban a pubkey, or review reports, use `/admin`.
