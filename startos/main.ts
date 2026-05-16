import { configYaml } from './fileModels/config.yml'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

const APP_DIR = '/app'
const DATA_MOUNT = `${APP_DIR}/data`
const CONFIG_MOUNT = `${APP_DIR}/config.yml`

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Blossom Server!'))

  // Reactive reads — the daemon restarts when any of these change.
  await configYaml.read((c) => c.publicDomain).const(effects)
  await configYaml.read((c) => c.dashboard.password).const(effects)
  await configYaml.read((c) => c.dashboard.username).const(effects)
  await configYaml.read((c) => c.storage.rules).const(effects)
  await configYaml.read((c) => c.storage.removeWhenNoOwners).const(effects)
  await configYaml.read((c) => c.upload.maxSize).const(effects)
  await configYaml.read((c) => c.upload.requirePubkeyInRule).const(effects)
  await configYaml.read((c) => c.upload.requireAuth).const(effects)
  await configYaml.read((c) => c.list.enabled).const(effects)
  await configYaml.read((c) => c.media.enabled).const(effects)
  await configYaml.read((c) => c.mirror.enabled).const(effects)

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: 'data',
      mountpoint: DATA_MOUNT,
      readonly: false,
    })
    .mountVolume({
      volumeId: 'main',
      subpath: 'config.yml',
      mountpoint: CONFIG_MOUNT,
      readonly: true,
      type: 'file',
    })

  const sub = await sdk.SubContainer.of(
    effects,
    { imageId: 'blossom-server' },
    mounts,
    'blossom-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer: sub,
      exec: {
        command: ['chown', '-R', 'deno:deno', DATA_MOUNT],
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: sub,
      exec: {
        command: sdk.useEntrypoint([CONFIG_MOUNT]),
      },
      ready: {
        display: i18n('Blossom Server'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('Blossom Server is ready'),
            errorMessage: i18n('Blossom Server is not ready'),
          }),
      },
      requires: ['chown'],
    })
})
