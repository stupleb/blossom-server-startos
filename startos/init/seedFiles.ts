import { configYaml } from '../fileModels/config.yml'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  // Create or refresh config.yml with schema defaults. Loose mode preserves
  // any keys the user (or upstream) wrote that aren't in our shape.
  await configYaml.merge(effects, {})
})
