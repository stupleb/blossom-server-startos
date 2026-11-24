import { configYaml, hasAllowlist } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const togglePrivateMode = sdk.Action.withoutInput(
  'toggle-private-mode',

  async ({ effects }) => {
    const enabled =
      (await configYaml
        .read((c) => c.upload.requirePubkeyInRule)
        .const(effects)) ?? false
    const allowlisted = await configYaml
      .read((c) => hasAllowlist(c.storage.rules))
      .const(effects)

    return {
      name: enabled
        ? i18n('Disable Private Mode')
        : i18n('Enable Private Mode'),
      description: enabled
        ? i18n(
            'Private mode is currently ON — only the pubkeys in your allowlist may upload, and reports are refused. Run this action to allow any authenticated pubkey and accept reports from anyone. Your allowlist is kept for when you turn Private Mode back on.',
          )
        : allowlisted
          ? i18n(
              'Private mode is currently OFF — any authenticated Nostr pubkey may upload, and anyone may report a stored file. Run this action to restrict uploads to your allowlist and refuse reports.',
            )
          : i18n(
              'Private mode is currently OFF. Add at least one pubkey via "Manage Allowed Pubkeys" before enabling it.',
            ),
      warning: enabled
        ? i18n(
            'Anyone who can reach this server will be able to upload files to it and report the files it stores.',
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

    if (
      !enabled &&
      !(await configYaml.read((c) => hasAllowlist(c.storage.rules)).once())
    ) {
      throw new Error(
        i18n(
          'Cannot enable Private Mode: the allowed-pubkeys list is empty. Add at least one pubkey via "Manage Allowed Pubkeys" first.',
        ),
      )
    }

    await configYaml.merge(effects, {
      upload: { requirePubkeyInRule: !enabled },
      media: { requirePubkeyInRule: !enabled },
      report: { enabled },
    })
  },
)
