import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.4.0:2',
  releaseNotes: {
    en_US:
      'If the public address goes missing, Blossom keeps running and shows a Set Public Domain reminder, which clears itself once the address is back. New installs choose the .local address as their public domain.',
    es_ES:
      'Si la dirección pública desaparece, Blossom sigue funcionando y muestra un recordatorio de "Establecer dominio público", que se borra solo cuando la dirección vuelve. Las instalaciones nuevas eligen la dirección .local como dominio público.',
    de_DE:
      'Fällt die öffentliche Adresse weg, läuft Blossom weiter und zeigt eine Erinnerung „Set Public Domain“, die von selbst verschwindet, sobald die Adresse wieder da ist. Neue Installationen wählen die .local-Adresse als öffentliche Domain.',
    pl_PL:
      'Jeśli adres publiczny zniknie, Blossom działa dalej i pokazuje przypomnienie „Set Public Domain”, które znika samo, gdy adres wróci. Nowe instalacje wybierają adres .local jako domenę publiczną.',
    fr_FR:
      "Si l'adresse publique disparaît, Blossom continue de fonctionner et affiche un rappel « Set Public Domain », qui disparaît de lui-même quand l'adresse revient. Les nouvelles installations choisissent l'adresse .local comme domaine public.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
