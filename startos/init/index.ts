import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { watchAdminPassword } from './watchAdminPassword'
import { watchAllowedPubkeys } from './watchAllowedPubkeys'
import { watchPrimaryUrl } from './watchPrimaryUrl'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  dependencies,
  actions,
  watchAdminPassword,
  watchPrimaryUrl,
  watchAllowedPubkeys,
)

export const uninit = sdk.setupUninit(versionGraph)
