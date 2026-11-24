# Blossom Server

## Documentation

- [Blossom Server README](https://github.com/hzrd149/blossom-server/blob/master/README.md) — upstream's guide to the server and its configuration
- [Blossom protocol](https://github.com/hzrd149/blossom) — the protocol specification and its BUD documents

## What you get on StartOS

- **A Blossom server for your Nostr clients.** It accepts their uploads and serves the files back by hash.
- **An admin dashboard** for browsing stored files, setting how long files are kept, managing users, and reviewing reported content.
- **Automatic clean-up.** A file that has not been accessed for a set time is deleted. You choose the time for each kind of file.
- **Image and video optimisation** for clients that ask for it, with thumbnails for the media they upload.

## Getting set up

Blossom Server starts in **Private Mode**: only the Nostr keys you list may upload. An open server lets anyone who can reach it store files on your disk, so opening it is left as a deliberate step.

The service will not start until the **Required** items in the **Tasks** table on its Dashboard are done.

1. **Set Admin Password.** Run it and save the password it shows. You will need it to sign in to the admin dashboard.
2. **Manage Allowed Pubkeys.** Add the Nostr public keys that may upload, starting with your own. Paste each key as your client shows it, an `npub` or hex.
3. **Set Public Domain**, if it is listed. Choose the address your Nostr clients will use to reach the server.
4. Start the service.

To run an open server, run **Disable Private Mode**; you can do this instead of step 2. Anyone who can reach the server can then upload: the landing page creates a Nostr key in the browser for visitors who have none. Anyone can also report a stored file to you, and the reports appear in the admin dashboard. While Private Mode is on, reports are refused. Your allowlist is kept while Private Mode is off, can still be edited with **Manage Allowed Pubkeys**, and applies again when you run **Enable Private Mode**.

## Using Blossom Server

### Connecting a Nostr client

Enter the server's address in your client's media server or Blossom server setting. The client signs each upload with your Nostr key, and the server checks the signature before accepting the file.

Use the address you chose in **Set Public Domain**. The server puts that address in the link it returns for every file, and some clients are refused if they sign for a different one. If your clients start using a new address, run **Set Public Domain** again and choose it.

Many Nostr clients, especially on mobile, only accept an address without a port number. The addresses this service has on your local network include one, so for those clients add a domain to the **Blossom Server** interface, then choose that domain in **Set Public Domain**. Clients differ, so test yours before settling on a setup.

### Admin dashboard

Open the **Admin Dashboard** interface and sign in with the username and password from **Set Admin Password**. **Show Admin Credentials** displays them again. Deleting a single file, banning a key, reviewing reports, and setting how long files are kept are all done here.

### How long files are kept

Each rule on the dashboard's **Rules** page says how long one kind of file is kept. By default images are kept for a month after they were last accessed, and video, audio and everything else for a week. A file follows the first rule in the list that matches it, and a shorter period also removes files already stored that are past it.

The last rule, with the note "Allowed pubkeys", holds the keys from **Manage Allowed Pubkeys**. Keep it last, and add keys with that action rather than to another rule: a rule that lists keys applies to those keys only, so other people's files that match it would no longer be accepted once Private Mode is off. Reports arrive only while Private Mode is off.

### Actions

- **Set Max Upload Size** sets the largest file the server stores, and the largest it will optimize when a client asks it to, as the landing page does with **Optimize media** ticked. Optimizing a large video takes a lot of processing time.
- **Enable / Disable File Listing** lets a Nostr client list the files your key uploaded, which some Blossom clients need to show them. A client can list only the files of the key it signs in with.
- **Customize Landing Page** sets the title of the page visitors see at the server's address, and whether it shows the server's stats.
- **Enable / Disable Ownerless Cleanup** decides whether a file is deleted as soon as nobody owns it any more, instead of waiting for its retention period.
- **Set Admin Password** replaces the dashboard password with a newly generated one.

## Limitations

- **There is no limit on total storage.** The server keeps accepting uploads until the disk is full. Shorter retention periods are the way to keep it bounded.
