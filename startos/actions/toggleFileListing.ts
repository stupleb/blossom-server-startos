import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const toggleFileListing = sdk.Action.withoutInput(
  'toggle-file-listing',

  async ({ effects }) => {
    const enabled =
      (await configYaml.read((c) => c.list.enabled).const(effects)) ?? false
    return {
      name: enabled
        ? i18n('Disable File Listing')
        : i18n('Enable File Listing'),
      description: enabled
        ? i18n(
            'File listing is currently ON — a Nostr client signed in with a key can list the files that key uploaded. Run this action to turn it off.',
          )
        : i18n(
            'File listing is currently OFF. Run this action to let a Nostr client signed in with a key list the files that key uploaded. Some Blossom clients need this to show your files.',
          ),
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    await configYaml.merge(effects, {
      list: {
        enabled: !(await configYaml.read((c) => c.list.enabled).once()),
      },
    })
  },
)
