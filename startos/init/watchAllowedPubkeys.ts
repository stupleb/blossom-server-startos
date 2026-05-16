import { setAllowedPubkeys } from '../actions/setAllowedPubkeys'
import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchAllowedPubkeys = sdk.setupOnInit(async (effects) => {
  const privateMode = await configYaml
    .read((c) => c.upload.requirePubkeyInRule)
    .const(effects)
  const rules = await configYaml.read((c) => c.storage.rules).const(effects)

  const hasPubkeys = !!rules?.some((r) => r.pubkeys && r.pubkeys.length > 0)

  if (privateMode && !hasPubkeys) {
    await sdk.action.createOwnTask(effects, setAllowedPubkeys, 'critical', {
      reason: i18n(
        'Add at least one allowed pubkey before anyone can upload — Private Mode is on but the allowlist is empty.',
      ),
    })
  }
})
