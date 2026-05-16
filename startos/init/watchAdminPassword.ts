import { setAdminPassword } from '../actions/setAdminPassword'
import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchAdminPassword = sdk.setupOnInit(async (effects) => {
  const password = await configYaml
    .read((c) => c.dashboard.password)
    .const(effects)

  if (!password) {
    await sdk.action.createOwnTask(effects, setAdminPassword, 'critical', {
      reason: i18n('Set an admin password before signing in to /admin'),
    })
  }
})
