import { setPrimaryUrl } from '../actions/setPrimaryUrl'
import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getAvailableHostnames } from '../utils'

export const watchPrimaryUrl = sdk.setupOnInit(async (effects) => {
  const current = await configYaml.read((c) => c.publicDomain).const(effects)
  const available = await getAvailableHostnames(effects)

  if (!current) {
    // First install: pick a sensible default if one exists.
    const fallback =
      available.find((h) => h.endsWith('.local')) ?? available[0] ?? ''
    if (fallback) {
      await configYaml.merge(
        effects,
        { publicDomain: fallback },
        { allowWriteAfterConst: true },
      )
    } else {
      await sdk.action.createOwnTask(effects, setPrimaryUrl, 'critical', {
        reason: i18n(
          'Choose a public domain so Blossom can build blob URLs for clients',
        ),
      })
    }
  } else if (!available.includes(current)) {
    await sdk.action.createOwnTask(effects, setPrimaryUrl, 'critical', {
      reason: i18n(
        'The configured public domain is no longer available. Select a new one.',
      ),
    })
  }
})
