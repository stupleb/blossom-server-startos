import { i18n } from './i18n'
import { sdk } from './sdk'
import { PRIMARY_INTERFACE_ID, uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multi = sdk.MultiHost.of(effects, 'ui-multi')
  const origin = await multi.bindPort(uiPort, {
    protocol: 'http',
  })

  const primary = sdk.createInterface(effects, {
    name: i18n('Blossom Server'),
    id: PRIMARY_INTERFACE_ID,
    description: i18n(
      'Public Blossom endpoint — accepts blob uploads, downloads, and the BUD protocol APIs. Nostr clients connect to this URL.',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const admin = sdk.createInterface(effects, {
    name: i18n('Admin Dashboard'),
    id: 'admin',
    description: i18n(
      'Operator dashboard for browsing blobs, managing users, and reviewing reports. Protected by HTTP Basic Auth.',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '/admin',
    query: {},
  })

  return [await origin.export([primary, admin])]
})
