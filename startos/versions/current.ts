import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.4.1:0',
  releaseNotes: {
    en_US:
      'Updates Blossom Server to 6.4.1. Stored web pages are downloaded instead of displayed, and uploads and deletes must be signed for the exact file.',
    es_ES:
      'Actualiza Blossom Server a 6.4.1. Las páginas web almacenadas se descargan en lugar de mostrarse, y las subidas y eliminaciones deben firmarse para el archivo exacto.',
    de_DE:
      'Aktualisiert Blossom Server auf 6.4.1. Gespeicherte Webseiten werden heruntergeladen statt angezeigt, und Uploads und Löschungen müssen für genau die betreffende Datei signiert sein.',
    pl_PL:
      'Aktualizuje Blossom Server do wersji 6.4.1. Zapisane strony internetowe są pobierane zamiast wyświetlane, a przesyłanie i usuwanie musi być podpisane dla konkretnego pliku.',
    fr_FR:
      "Met à jour Blossom Server vers la version 6.4.1. Les pages web stockées sont téléchargées au lieu d'être affichées, et les téléversements et suppressions doivent être signés pour le fichier exact.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
