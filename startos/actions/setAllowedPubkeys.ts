import {
  configYaml,
  RULE_CATEGORIES,
  RuleCategory,
} from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value, List } = sdk

const inputSpec = InputSpec.of({
  pubkeys: Value.list(
    List.text(
      {
        name: i18n('Allowed Pubkeys'),
        description: i18n(
          'Hex-encoded Nostr public keys that are permitted to upload when Private Mode is on. Go to https://damus.io/key/ to convert an npub to hex. Leave empty to remove the allowlist.',
        ),
      },
      {
        placeholder: 'hex pubkey (not npub)',
        patterns: [
          {
            regex: '^[0-9a-f]{64}$',
            description: i18n(
              '64 lowercase hex characters (0–9, a–f). Use damus.io/key/ to convert from npub.',
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
      'Edit the list of Nostr pubkeys allowed to upload when Private Mode is on. The list applies uniformly to all retention categories.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const rules = (await configYaml.read((c) => c.storage.rules).once()) ?? []
    // Pubkey lists are kept in sync across categories — read whichever has them.
    const pubkeys = rules.find((r) => r.pubkeys && r.pubkeys.length)?.pubkeys
    return { pubkeys: pubkeys ?? [] }
  },

  async ({ effects, input }) => {
    const existing =
      (await configYaml.read((c) => c.storage.rules).once()) ?? []
    const expirationFor = (cat: RuleCategory) =>
      existing.find((r) => r.type === cat)?.expiration ?? '1 week'

    const newRules = RULE_CATEGORIES.map((cat) => ({
      type: cat,
      expiration: expirationFor(cat),
      ...(input.pubkeys.length ? { pubkeys: input.pubkeys } : {}),
    }))

    await configYaml.merge(effects, { storage: { rules: newRules } })
  },
)
