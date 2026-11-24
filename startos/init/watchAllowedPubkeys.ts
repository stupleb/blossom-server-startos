import { setAllowedPubkeys } from '../actions/setAllowedPubkeys'
import { configYaml, hasAllowlist } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchAllowedPubkeys = sdk.setupOnInit(async (effects) => {
  const privateMode = await configYaml
    .read((c) => c.upload.requirePubkeyInRule)
    .const(effects)
  const allowlisted = await configYaml
    .read((c) => hasAllowlist(c.storage.rules))
    .const(effects)

  if (privateMode && !allowlisted) {
    await sdk.action.createOwnTask(effects, setAllowedPubkeys, 'critical', {
      reason: i18n(
        'Add at least one allowed pubkey before anyone can upload — Private Mode is on but the allowlist is empty.',
      ),
    })
  } else {
    await sdk.action.clearTask(effects, 'blossom-server:set-allowed-pubkeys')
  }
})
