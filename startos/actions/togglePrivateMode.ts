import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

async function readPubkeysCount(effects: any): Promise<number> {
  const rules = (await configYaml.read((c) => c.storage.rules).once()) ?? []
  return rules.find((r) => r.pubkeys && r.pubkeys.length)?.pubkeys?.length ?? 0
}

export const togglePrivateMode = sdk.Action.withoutInput(
  'toggle-private-mode',

  async ({ effects }) => {
    const enabled =
      (await configYaml
        .read((c) => c.upload.requirePubkeyInRule)
        .const(effects)) ?? false
    const pubkeyCount = await readPubkeysCount(effects)

    return {
      name: enabled
        ? i18n('Disable Private Mode')
        : i18n('Enable Private Mode'),
      description: enabled
        ? i18n(
            'Private mode is currently ON — only the pubkeys in your allowlist may upload. Run this action to allow any authenticated pubkey.',
          )
        : pubkeyCount === 0
          ? i18n(
              'Private mode is currently OFF. To enable it, first add at least one pubkey via "Manage Allowed Pubkeys" — otherwise nobody will be able to upload.',
            )
          : i18n(
              'Private mode is currently OFF — any authenticated Nostr pubkey may upload. Run this action to restrict uploads to your allowlist.',
            ),
      warning:
        !enabled && pubkeyCount === 0
          ? i18n(
              'The allowed-pubkeys list is empty. Enabling Private Mode now will lock out every uploader. Add pubkeys first via "Manage Allowed Pubkeys".',
            )
          : null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    const enabled =
      (await configYaml.read((c) => c.upload.requirePubkeyInRule).once()) ??
      false

    if (!enabled) {
      const pubkeyCount = await readPubkeysCount(effects)
      if (pubkeyCount === 0) {
        throw new Error(
          i18n(
            'Cannot enable Private Mode: the allowed-pubkeys list is empty. Add at least one pubkey via "Manage Allowed Pubkeys" first.',
          ),
        )
      }
    }

    await configYaml.merge(effects, {
      upload: { requirePubkeyInRule: !enabled },
    })
  },
)
