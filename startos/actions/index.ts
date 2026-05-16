import { sdk } from '../sdk'
import { setAdminPassword } from './setAdminPassword'
import { setAllowedPubkeys } from './setAllowedPubkeys'
import { setPrimaryUrl } from './setPrimaryUrl'
import { setRetentionPeriods } from './setRetentionPeriods'
import { setUploadLimit } from './setUploadLimit'
import { showAdminCredentials } from './showAdminCredentials'
import { toggleOwnerlessCleanup } from './toggleOwnerlessCleanup'
import { togglePrivateMode } from './togglePrivateMode'

export const actions = sdk.Actions.of()
  .addAction(showAdminCredentials)
  .addAction(setAdminPassword)
  .addAction(setPrimaryUrl)
  .addAction(setRetentionPeriods)
  .addAction(setAllowedPubkeys)
  .addAction(setUploadLimit)
  .addAction(togglePrivateMode)
  .addAction(toggleOwnerlessCleanup)
