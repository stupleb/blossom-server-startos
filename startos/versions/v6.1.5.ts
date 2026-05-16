import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v6_1_5 = VersionInfo.of({
  version: '6.1.5:0',
  releaseNotes: {
    en_US: 'Initial StartOS release of Blossom Server.',
    es_ES: 'Lanzamiento inicial de Blossom Server en StartOS.',
    de_DE: 'Erstveröffentlichung von Blossom Server für StartOS.',
    pl_PL: 'Pierwsza wersja Blossom Server dla StartOS.',
    fr_FR: 'Première version de Blossom Server pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
