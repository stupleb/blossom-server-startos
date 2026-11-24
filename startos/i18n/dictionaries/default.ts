export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Blossom Server!': 0,
  'Blossom Server': 1,
  'Blossom Server is ready': 2,
  'Blossom Server is not ready': 3,

  // interfaces.ts
  'Public Blossom endpoint — accepts blob uploads, downloads, and the BUD protocol APIs. Nostr clients connect to this URL.': 4,
  'Admin Dashboard': 5,
  'Operator dashboard for browsing blobs, editing storage rules, managing users, and reviewing reports. Protected by HTTP Basic Auth.': 6,

  // setAdminPassword + showAdminCredentials
  'Set Admin Password': 10,
  'Generate a new random password for the admin dashboard. Replaces any existing password.': 11,
  'Admin Dashboard Credentials': 12,
  'Use these credentials to sign in to the admin dashboard at /admin.': 13,
  Username: 14,
  Password: 15,
  'Show Admin Credentials': 16,
  'Display the current admin dashboard username and password.': 17,
  'No admin password has been set. Run "Set Admin Password" to generate one.': 18,

  // setPrimaryUrl
  'Public Domain': 20,
  'The hostname that clients will use to reach this Blossom server. Returned in every blob descriptor URL and enforced against the BUD-11 "server" tag in Nostr auth events.': 21,
  'Set Public Domain': 22,
  "Choose which of this server's hostnames is canonical. Blob URLs returned to clients will use this hostname, and Nostr auth events will be validated against it.": 23,

  // setUploadLimit
  'Max Upload Size (MB)': 30,
  'Largest file the server stores as sent, whether uploaded or mirrored from another server.': 31,
  'Set Max Upload Size': 32,
  'Change the largest file the server stores, and the largest it will optimize.': 33,
  'Max Size for Optimization (MB)': 34,
  'Largest file a client may send for the server to optimize before storing it, as the landing page does with "Optimize media" ticked. Optimizing a large video takes a lot of processing time.': 35,

  // togglePrivateMode
  'Enable Private Mode': 40,
  'Disable Private Mode': 41,
  'Private mode is currently ON — only the pubkeys in your allowlist may upload, and reports are refused. Run this action to allow any authenticated pubkey and accept reports from anyone. Your allowlist is kept for when you turn Private Mode back on.': 42,
  'Private mode is currently OFF — any authenticated Nostr pubkey may upload, and anyone may report a stored file. Run this action to restrict uploads to your allowlist and refuse reports.': 43,
  'Private mode is currently OFF. Add at least one pubkey via "Manage Allowed Pubkeys" before enabling it.': 44,
  'Cannot enable Private Mode: the allowed-pubkeys list is empty. Add at least one pubkey via "Manage Allowed Pubkeys" first.': 46,
  'Anyone who can reach this server will be able to upload files to it and report the files it stores.': 47,

  // toggleOwnerlessCleanup
  'Enable Ownerless Cleanup': 50,
  'Disable Ownerless Cleanup': 51,
  'Ownerless cleanup is currently ON — blobs with no remaining owners are deleted on every prune cycle, regardless of retention rules. Run this action to keep ownerless blobs.': 52,
  'Ownerless cleanup is currently OFF — blobs are only deleted when their retention rule expires, even if no Nostr user claims ownership. Run this action to also delete ownerless blobs immediately.': 53,

  // setAllowedPubkeys
  'Allowed Pubkeys': 80,
  'Nostr public keys permitted to upload when Private Mode is on, as npub or hex. Leave empty to remove the list.': 81,
  'An npub, or 64 lowercase hex characters (0–9, a–f).': 82,
  'Manage Allowed Pubkeys': 83,
  'Edit the list of Nostr pubkeys allowed to upload when Private Mode is on. Rules added in the admin dashboard are left as they are.': 84,

  // toggleFileListing
  'Enable File Listing': 100,
  'Disable File Listing': 101,
  'File listing is currently ON — a Nostr client signed in with a key can list the files that key uploaded. Run this action to turn it off.': 102,
  'File listing is currently OFF. Run this action to let a Nostr client signed in with a key list the files that key uploaded. Some Blossom clients need this to show your files.': 103,

  // setLandingPage
  'Customize Landing Page': 104,
  "Set the title of the page visitors see at this server's address, and whether it shows the server's stats.": 105,
  Title: 106,
  "The name shown at the top of the landing page and in the browser's tab.": 107,
  'Show Server Stats': 108,
  'Show how many files the server holds, the storage they use, and the uploads in the last 24 hours.': 109,

  // init watchers
  'Set an admin password before signing in to /admin': 90,
  'Choose a public domain so Blossom can build blob URLs for clients': 91,
  'The configured public domain is no longer available. Select a new one.': 92,
  'Add at least one allowed pubkey before anyone can upload — Private Mode is on but the allowlist is empty.': 93,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
