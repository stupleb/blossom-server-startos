import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import {
  ALLOWLIST_NOTE,
  configYaml,
  isAllowlist,
} from '../fileModels/config.yml'

export const current = VersionInfo.of({
  version: '6.5.0:0',
  releaseNotes: {
    en_US:
      'Blossom Server 6.5.0: retention rules are edited in the admin dashboard, which replaces Set Retention Periods. Manage Allowed Pubkeys accepts npub keys, and new actions turn on file listing, customize the landing page and limit the size of files sent for optimization.',
    es_ES:
      'Blossom Server 6.5.0: las reglas de retención se editan en el panel de administración, que sustituye a "Establecer períodos de retención". "Gestionar pubkeys permitidas" acepta claves npub, y nuevas acciones activan el listado de archivos, personalizan la página de inicio y limitan el tamaño de los archivos enviados para optimizar.',
    de_DE:
      'Blossom Server 6.5.0: Aufbewahrungsregeln werden im Admin-Dashboard bearbeitet, das „Aufbewahrungsfristen festlegen“ ersetzt. „Zugelassene Pubkeys verwalten“ nimmt npub-Schlüssel an, und neue Aktionen schalten die Dateiliste ein, passen die Startseite an und begrenzen die Größe von Dateien, die zur Optimierung gesendet werden.',
    pl_PL:
      'Blossom Server 6.5.0: reguły przechowywania edytuje się w panelu administratora, który zastępuje „Ustaw okresy retencji”. „Zarządzaj dozwolonymi kluczami publicznymi” przyjmuje klucze npub, a nowe akcje włączają listę plików, dostosowują stronę główną i ograniczają rozmiar plików wysyłanych do optymalizacji.',
    fr_FR:
      "Blossom Server 6.5.0 : les règles de conservation se modifient dans le tableau de bord d'administration, qui remplace « Définir les durées de rétention ». « Gérer les pubkeys autorisées » accepte les clés npub, et de nouvelles actions activent la liste des fichiers, personnalisent la page d'accueil et limitent la taille des fichiers envoyés pour optimisation.",
  },
  migrations: {
    up: async ({ effects }) => {
      const rules = await configYaml.read((c) => c.storage.rules).once()
      const last = rules?.at(-1)
      if (
        rules &&
        last?.type === '*' &&
        last.pubkeys?.length &&
        !rules.some(isAllowlist)
      )
        await configYaml.merge(effects, {
          storage: {
            rules: rules.map((r) =>
              r === last ? { ...r, note: ALLOWLIST_NOTE } : r,
            ),
          },
        })
    },
    down: IMPOSSIBLE,
  },
})
