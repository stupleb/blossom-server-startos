import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'blossom-server',
  title: 'Blossom Server',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/blossom-server-startos',
  upstreamRepo: 'https://github.com/hzrd149/blossom-server',
  marketingUrl: 'https://github.com/hzrd149/blossom',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    'blossom-server': {
      source: { dockerTag: 'ghcr.io/hzrd149/blossom-server:6.1.5' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
