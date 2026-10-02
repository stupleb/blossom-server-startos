import {
  allowlistOf,
  configYaml,
  expirationIn,
  rulesOf,
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

  async ({ effects }) => ({
    pubkeys: allowlistOf(
      (await configYaml.read((c) => c.storage.rules).once()) ?? [],
    ),
  }),

  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      storage: {
        rules: rulesOf(
          expirationIn(
            (await configYaml.read((c) => c.storage.rules).once()) ?? [],
          ),
          input.pubkeys,
        ),
      },
    })
  },
)
