import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.2.0:0',
  releaseNotes: {
    en_US:
      'Update to Blossom Server 6.2.0: blob descriptors now include NIP-94 metadata tags (MIME type, hash, size, dimensions), and media uploads get automatic best-effort thumbnails. The non-standard X-Dimensions response header was removed upstream in favor of the dim tag. Rebuilt on StartOS SDK 2.0.9.',
    es_ES:
      'Actualización a Blossom Server 6.2.0: los descriptores de blobs ahora incluyen etiquetas de metadatos NIP-94 (tipo MIME, hash, tamaño, dimensiones), y las subidas de medios reciben miniaturas automáticas. La cabecera no estándar X-Dimensions fue eliminada por upstream en favor de la etiqueta dim. Reconstruido con StartOS SDK 2.0.9.',
    de_DE:
      'Aktualisierung auf Blossom Server 6.2.0: Blob-Deskriptoren enthalten jetzt NIP-94-Metadaten-Tags (MIME-Typ, Hash, Größe, Abmessungen), und Medien-Uploads erhalten automatische Vorschaubilder. Der nicht standardisierte X-Dimensions-Header wurde upstream zugunsten des dim-Tags entfernt. Neu erstellt mit StartOS SDK 2.0.9.',
    pl_PL:
      'Aktualizacja do Blossom Server 6.2.0: deskryptory blobów zawierają teraz tagi metadanych NIP-94 (typ MIME, hash, rozmiar, wymiary), a przesyłane multimedia otrzymują automatyczne miniatury. Niestandardowy nagłówek X-Dimensions został usunięty upstream na rzecz tagu dim. Przebudowano na StartOS SDK 2.0.9.',
    fr_FR:
      "Mise à jour vers Blossom Server 6.2.0 : les descripteurs de blobs incluent désormais des balises de métadonnées NIP-94 (type MIME, hash, taille, dimensions), et les téléversements de médias reçoivent des miniatures automatiques. L'en-tête non standard X-Dimensions a été supprimé en amont au profit de la balise dim. Reconstruit avec le SDK StartOS 2.0.9.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
