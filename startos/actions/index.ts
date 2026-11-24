import { sdk } from '../sdk'
import { setAdminPassword } from './setAdminPassword'
import { setAllowedPubkeys } from './setAllowedPubkeys'
import { setPrimaryUrl } from './setPrimaryUrl'
import { setLandingPage } from './setLandingPage'
import { setUploadLimit } from './setUploadLimit'
import { showAdminCredentials } from './showAdminCredentials'
import { toggleFileListing } from './toggleFileListing'
import { toggleOwnerlessCleanup } from './toggleOwnerlessCleanup'
import { togglePrivateMode } from './togglePrivateMode'

export const actions = sdk.Actions.of()
  .addAction(showAdminCredentials)
  .addAction(setAdminPassword)
  .addAction(setPrimaryUrl)
  .addAction(setAllowedPubkeys)
  .addAction(setUploadLimit)
  .addAction(togglePrivateMode)
  .addAction(toggleOwnerlessCleanup)
  .addAction(toggleFileListing)
  .addAction(setLandingPage)
