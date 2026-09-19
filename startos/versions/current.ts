import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.3.1:0',
  releaseNotes: {
    en_US:
      'Update to Blossom Server 6.3.1: large duplicate re-uploads now reliably receive their success response, and range requests that extend past the end of a blob are clamped instead of failing with error 416.',
    es_ES:
      'Actualización a Blossom Server 6.3.1: las resubidas duplicadas grandes ahora reciben su respuesta de éxito de forma fiable, y las solicitudes de rango que exceden el final de un blob se ajustan en lugar de fallar con el error 416.',
    de_DE:
      'Aktualisierung auf Blossom Server 6.3.1: große doppelte erneute Uploads erhalten jetzt zuverlässig ihre Erfolgsantwort, und Range-Anfragen über das Ende eines Blobs hinaus werden begrenzt statt mit Fehler 416 abgelehnt.',
    pl_PL:
      'Aktualizacja do Blossom Server 6.3.1: duże ponowne przesłania duplikatów niezawodnie otrzymują teraz odpowiedź o powodzeniu, a żądania zakresu wykraczające poza koniec bloba są przycinane zamiast kończyć się błędem 416.',
    fr_FR:
      "Mise à jour vers Blossom Server 6.3.1 : les renvois de doublons volumineux reçoivent désormais leur réponse de succès de manière fiable, et les requêtes de plage dépassant la fin d'un blob sont tronquées au lieu d'échouer avec l'erreur 416.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
