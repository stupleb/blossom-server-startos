import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { configYaml } from '../fileModels/config.yml'

export const current = VersionInfo.of({
  version: '6.4.1:3',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2. Reports about stored files are accepted only while Private Mode is off.',
    es_ES:
      'Requiere StartOS 0.4.2. Los informes sobre archivos almacenados solo se aceptan mientras el modo privado está desactivado.',
    de_DE:
      'Erfordert StartOS 0.4.2. Meldungen zu gespeicherten Dateien werden nur angenommen, solange der Privatmodus aus ist.',
    pl_PL:
      'Wymaga StartOS 0.4.2. Zgłoszenia dotyczące przechowywanych plików są przyjmowane tylko przy wyłączonym trybie prywatnym.',
    fr_FR:
      'Nécessite StartOS 0.4.2. Les signalements de fichiers stockés ne sont acceptés que lorsque le mode privé est désactivé.',
  },
  migrations: {
    up: async ({ effects }) => {
      const requirePubkeyInRule = await configYaml
        .read((c) => c.upload.requirePubkeyInRule)
        .once()
      if (requirePubkeyInRule !== null)
        await configYaml.merge(effects, {
          report: { enabled: !requirePubkeyInRule },
        })
    },
    down: IMPOSSIBLE,
  },
})
