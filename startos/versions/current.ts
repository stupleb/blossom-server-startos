import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import {
  allowlistOf,
  configYaml,
  expirationIn,
  RULE_CATEGORIES,
  rulesOf,
} from '../fileModels/config.yml'

export const current = VersionInfo.of({
  version: '6.4.0:1',
  releaseNotes: {
    en_US:
      'Disable Private Mode opens uploads to every Nostr key and keeps your allowlist, and retention periods apply to every file, whoever uploaded it. If your server had Private Mode off with keys still on its allowlist, this update turns Private Mode on; run Disable Private Mode to open it.',
    es_ES:
      'Desactivar el modo privado abre las subidas a cualquier clave Nostr y conserva tu lista permitida, y los períodos de retención se aplican a todos los archivos, los haya subido quien los haya subido. Si tu servidor tenía el modo privado desactivado con claves todavía en su lista permitida, esta actualización activa el modo privado; ejecuta "Desactivar modo privado" para abrirlo.',
    de_DE:
      '„Disable Private Mode“ öffnet Uploads für jeden Nostr-Schlüssel und behält die Liste der erlaubten Schlüssel, und die Aufbewahrungsfristen gelten für jede Datei, egal wer sie hochgeladen hat. War auf dem Server „Private Mode“ ausgeschaltet, während die Liste noch Schlüssel enthielt, schaltet dieses Update „Private Mode“ ein; „Disable Private Mode“ ausführen, um den Server zu öffnen.',
    pl_PL:
      '„Disable Private Mode” otwiera przesyłanie dla każdego klucza Nostr i zachowuje listę dozwolonych kluczy, a okresy przechowywania dotyczą każdego pliku, bez względu na to, kto go przesłał. Jeśli na serwerze „Private Mode” był wyłączony, a na liście nadal były klucze, ta aktualizacja włącza „Private Mode”; uruchom „Disable Private Mode”, aby otworzyć serwer.',
    fr_FR:
      "« Disable Private Mode » ouvre les téléversements à toute clé Nostr et conserve la liste des clés autorisées, et les durées de conservation s'appliquent à tous les fichiers, quel que soit leur auteur. Si « Private Mode » était désactivé sur votre serveur alors que la liste contenait encore des clés, cette mise à jour active « Private Mode » ; exécutez « Disable Private Mode » pour ouvrir le serveur.",
  },
  migrations: {
    up: async ({ effects }) => {
      const rules = (await configYaml.read((c) => c.storage.rules).once()) ?? []
      const pubkeys = allowlistOf(rules)
      if (
        pubkeys.length &&
        rules.length === RULE_CATEGORIES.length &&
        rules.every(
          (r, i) =>
            r.type === RULE_CATEGORIES[i] &&
            r.pubkeys?.join() === pubkeys.join(),
        )
      )
        await configYaml.merge(effects, {
          storage: { rules: rulesOf(expirationIn(rules), pubkeys) },
          // with the list on every rule the server was restricted whatever these said
          upload: { requirePubkeyInRule: true },
          media: { requirePubkeyInRule: true },
        })
    },
    down: IMPOSSIBLE,
  },
})
