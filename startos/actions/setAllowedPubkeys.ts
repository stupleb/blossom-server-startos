import { bech32 } from '@scure/base'
import {
  ALLOWLIST_NOTE,
  configYaml,
  isAllowlist,
} from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value, List } = sdk

const toHex = (key: string) =>
  key.startsWith('npub1')
    ? Buffer.from(
        bech32.fromWords(bech32.decode(key as `npub1${string}`).words),
      ).toString('hex')
    : key

const toNpub = (hex: string) =>
  /^[0-9a-f]{64}$/.test(hex)
    ? bech32.encode('npub', bech32.toWords(Buffer.from(hex, 'hex')))
    : hex

const inputSpec = InputSpec.of({
  pubkeys: Value.list(
    List.text(
      {
        name: i18n('Allowed Pubkeys'),
        description: i18n(
          'Nostr public keys permitted to upload when Private Mode is on, as npub or hex. Leave empty to remove the list.',
        ),
      },
      {
        placeholder: 'npub1…',
        patterns: [
          {
            regex: '^(npub1[02-9ac-hj-np-z]{58}|[0-9a-f]{64})$',
            description: i18n(
              'An npub, or 64 lowercase hex characters (0–9, a–f).',
            ),
          },
        ],
      },
    ),
  ),
})

export const setAllowedPubkeys = sdk.Action.withInput(
  'set-allowed-pubkeys',

  async () => ({
    name: i18n('Manage Allowed Pubkeys'),
    description: i18n(
      'Edit the list of Nostr pubkeys allowed to upload when Private Mode is on. Rules added in the admin dashboard are left as they are.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    pubkeys: (
      (await configYaml
        .read((c) => c.storage.rules.find(isAllowlist)?.pubkeys)
        .once()) ?? []
    ).map(toNpub),
  }),

  async ({ effects, input }) => {
    const pubkeys = [...new Set(input.pubkeys.map(toHex))]
    const rules = (await configYaml.read((c) => c.storage.rules).once()) ?? []
    const current = rules.find(isAllowlist)
    await configYaml.merge(effects, {
      storage: {
        rules: !current
          ? pubkeys.length
            ? [
                ...rules,
                {
                  type: '*',
                  expiration:
                    rules.find((r) => r.type === '*')?.expiration ?? '1 week',
                  pubkeys,
                  note: ALLOWLIST_NOTE,
                },
              ]
            : rules
          : pubkeys.length || current.nip05Domains?.length
            ? rules.map((r) =>
                r === current
                  ? { ...r, pubkeys: pubkeys.length ? pubkeys : undefined }
                  : r,
              )
            : rules.filter((r) => r !== current),
      },
    })
  },
)
