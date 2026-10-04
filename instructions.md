# Blossom Server

## Documentation

- [Blossom Server README](https://github.com/hzrd149/blossom-server/blob/master/README.md) — upstream's guide to the server and its configuration
- [Blossom protocol](https://github.com/hzrd149/blossom) — the protocol specification and its BUD documents

## What you get on StartOS

- **A Blossom server for your Nostr clients.** It accepts their uploads and serves the files back by hash.
- **An admin dashboard** for browsing stored files, managing users, and reviewing reported content.
- **Automatic clean-up.** A file that has not been accessed for a set time is deleted. You choose the time for each kind of file.
- **Image and video optimisation** for clients that ask for it, with thumbnails for the media they upload.

## Getting set up

Blossom Server starts in **Private Mode**: only the Nostr keys you list may upload. An open server lets anyone who can reach it store files on your disk, so opening it is left as a deliberate step.

The service will not start until the **Required** items in the **Tasks** table on its Dashboard are done.

1. **Set Admin Password.** Run it and save the password it shows. You will need it to sign in to the admin dashboard.
2. **Manage Allowed Pubkeys.** Add the Nostr public keys that may upload, starting with your own. Keys are entered in hex; most clients show an `npub`, which <https://damus.io/key/> converts.
3. **Set Public Domain**, if it is listed. Choose the address your Nostr clients will use to reach the server.
4. Start the service.

To run an open server, run **Disable Private Mode**; you can do this instead of step 2. Anyone who can reach the server can then upload: the landing page creates a Nostr key in the browser for visitors who have none. Your allowlist is kept while Private Mode is off, can still be edited with **Manage Allowed Pubkeys**, and applies again when you run **Enable Private Mode**.

## Using Blossom Server

### Connecting a Nostr client

Enter the server's address in your client's media server or Blossom server setting. The client signs each upload with your Nostr key, and the server checks the signature before accepting the file.

Use the address you chose in **Set Public Domain**. The server puts that address in the link it returns for every file, and some clients are refused if they sign for a different one. If your clients start using a new address, run **Set Public Domain** again and choose it.

Many Nostr clients, especially on mobile, only accept an address without a port number. The addresses this service has on your local network include one, so for those clients add a domain to the **Blossom Server** interface, then choose that domain in **Set Public Domain**. Clients differ, so test yours before settling on a setup.

### Admin dashboard

Open the **Admin Dashboard** interface and sign in with the username and password from **Set Admin Password**. **Show Admin Credentials** displays them again. Deleting a single file, banning a key, and reviewing reports are all done here.

### Actions

- **Set Retention Periods** sets how long images, videos, audio and other files are kept after they were last accessed. The defaults are one month for images and one week for the rest. A shorter period also removes files already stored that are past it.
- **Set Max Upload Size** sets the largest file the server accepts as an upload.
- **Enable / Disable Ownerless Cleanup** decides whether a file is deleted as soon as nobody owns it any more, instead of waiting for its retention period.
- **Set Admin Password** replaces the dashboard password with a newly generated one.

## Limitations

- **There is no limit on total storage.** The server keeps accepting uploads until the disk is full. Shorter retention periods are the way to keep it bounded.
