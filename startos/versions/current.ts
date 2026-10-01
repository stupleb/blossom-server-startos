import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { configYaml } from '../fileModels/config.yml'

export const current = VersionInfo.of({
  version: '6.4.0:0',
  releaseNotes: {
    en_US:
      'Updates Blossom Server to 6.4.0. With Private Mode off, visitors can upload from the landing page without a Nostr key of their own; the landing page and admin dashboard serve their styles from your server, and mirroring from private network addresses is refused.',
    es_ES:
      'Actualiza Blossom Server a 6.4.0. Con el modo privado desactivado, los visitantes pueden subir contenido desde la página de inicio sin una clave Nostr propia; la página de inicio y el panel de administración sirven sus estilos desde el propio servidor, y se rechazan las solicitudes de espejo desde direcciones de red privadas.',
    de_DE:
      'Aktualisiert Blossom Server auf 6.4.0. Ist „Private Mode“ deaktiviert, können Besucher über die Startseite ohne eigenen Nostr-Schlüssel hochladen; Startseite und Admin-Dashboard liefern ihre Stylesheets vom eigenen Server, und das Spiegeln von privaten Netzwerkadressen wird abgelehnt.',
    pl_PL:
      'Aktualizuje Blossom Server do wersji 6.4.0. Gdy „Private Mode” jest wyłączony, odwiedzający mogą przesyłać pliki ze strony głównej bez własnego klucza Nostr; strona główna i panel administracyjny serwują swoje style z własnego serwera, a tworzenie kopii lustrzanych z prywatnych adresów sieciowych jest odrzucane.',
    fr_FR:
      "Met à jour Blossom Server vers la version 6.4.0. Lorsque « Private Mode » est désactivé, les visiteurs peuvent téléverser depuis la page d'accueil sans clé Nostr personnelle ; la page d'accueil et le tableau de bord d'administration servent leurs styles depuis le serveur lui-même, et la mise en miroir depuis des adresses de réseau privé est refusée.",
  },
  migrations: {
    up: async ({ effects }) => {
      const requirePubkeyInRule = await configYaml
        .read((c) => c.upload.requirePubkeyInRule)
        .once()
      if (requirePubkeyInRule !== null)
        await configYaml.merge(effects, { media: { requirePubkeyInRule } })
    },
    down: IMPOSSIBLE,
  },
})
