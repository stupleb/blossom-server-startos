import { configYaml } from '../fileModels/config.yml'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await configYaml.merge(effects, {})
})
