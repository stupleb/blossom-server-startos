import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const toggleOwnerlessCleanup = sdk.Action.withoutInput(
  'toggle-ownerless-cleanup',

  async ({ effects }) => {
    const enabled =
      (await configYaml
        .read((c) => c.storage.removeWhenNoOwners)
        .const(effects)) ?? false
    return {
      name: enabled
        ? i18n('Disable Ownerless Cleanup')
        : i18n('Enable Ownerless Cleanup'),
      description: enabled
        ? i18n(
            'Ownerless cleanup is currently ON — blobs with no remaining owners are deleted on every prune cycle, regardless of retention rules. Run this action to keep ownerless blobs.',
          )
        : i18n(
            'Ownerless cleanup is currently OFF — blobs are only deleted when their retention rule expires, even if no Nostr user claims ownership. Run this action to also delete ownerless blobs immediately.',
          ),
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    const enabled =
      (await configYaml.read((c) => c.storage.removeWhenNoOwners).once()) ??
      false
    await configYaml.merge(effects, {
      storage: { removeWhenNoOwners: !enabled },
    })
  },
)
