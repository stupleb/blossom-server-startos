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
  'Operator dashboard for browsing blobs, managing users, and reviewing reports. Protected by HTTP Basic Auth.': 6,

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
  'Maximum blob size accepted by the upload endpoint. Enforced from the Content-Length header before any body bytes are read.': 31,
  'Set Max Upload Size': 32,
  'Change the maximum blob size accepted by the upload and mirror endpoints.': 33,

  // togglePrivateMode
  'Enable Private Mode': 40,
  'Disable Private Mode': 41,
  'Private mode is currently ON — only the pubkeys in your allowlist may upload. Run this action to allow any authenticated pubkey.': 42,
  'Private mode is currently OFF — any authenticated Nostr pubkey may upload. Run this action to restrict uploads to your allowlist.': 43,
  'Private mode is currently OFF. To enable it, first add at least one pubkey via "Manage Allowed Pubkeys" — otherwise nobody will be able to upload.': 44,
  'The allowed-pubkeys list is empty. Enabling Private Mode now will lock out every uploader. Add pubkeys first via "Manage Allowed Pubkeys".': 45,
  'Cannot enable Private Mode: the allowed-pubkeys list is empty. Add at least one pubkey via "Manage Allowed Pubkeys" first.': 46,

  // toggleOwnerlessCleanup
  'Enable Ownerless Cleanup': 50,
  'Disable Ownerless Cleanup': 51,
  'Ownerless cleanup is currently ON — blobs with no remaining owners are deleted on every prune cycle, regardless of retention rules. Run this action to keep ownerless blobs.': 52,
  'Ownerless cleanup is currently OFF — blobs are only deleted when their retention rule expires, even if no Nostr user claims ownership. Run this action to also delete ownerless blobs immediately.': 53,

  // setRetentionPeriods
  Images: 60,
  Videos: 61,
  Audio: 62,
  Other: 63,
  'How long to keep image blobs (image/*) after their last access.': 64,
  'How long to keep video blobs (video/*) after their last access.': 65,
  'How long to keep audio blobs (audio/*) after their last access.': 66,
  'How long to keep blobs of any other MIME type after their last access. Acts as the catch-all.': 67,
  'Set Retention Periods': 68,
  'Choose how long each kind of blob is kept after its last access. Blobs whose MIME type matches no category use the "Other" period.': 69,
  'This action rewrites your retention rules to exactly four categories (Images, Videos, Audio, Other). Any custom rules edited directly in config.yml will be replaced.': 70,
  'Format: "<number> <unit>" where unit is seconds, minutes, hours, days, weeks, months, or years. Examples: "1 week", "30 days", "1 month".': 71,

  // setAllowedPubkeys
  'Allowed Pubkeys': 80,
  'Hex-encoded Nostr public keys that are permitted to upload when Private Mode is on. Go to https://damus.io/key/ to convert an npub to hex. Leave empty to remove the allowlist.': 81,
  '64 lowercase hex characters (0–9, a–f). Use damus.io/key/ to convert from npub.': 82,
  'Manage Allowed Pubkeys': 83,
  'Edit the list of Nostr pubkeys allowed to upload when Private Mode is on. The list applies uniformly to all retention categories.': 84,

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
