import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.4.1:1',
  releaseNotes: {
    en_US:
      "Requires StartOS 0.4.0.2. A brief network outage does not add Set Public Domain to the service's tasks when the public domain is the server's .local address.",
    es_ES:
      'Requiere StartOS 0.4.0.2. Una caída breve de la red no añade Establecer dominio público a las tareas del servicio cuando el dominio público es la dirección .local del servidor.',
    de_DE:
      'Erfordert StartOS 0.4.0.2. Ein kurzer Netzwerkausfall fügt Set Public Domain nicht zu den Aufgaben des Dienstes hinzu, wenn die öffentliche Domain die .local-Adresse des Servers ist.',
    pl_PL:
      'Wymaga StartOS 0.4.0.2. Krótka przerwa w działaniu sieci nie dodaje Set Public Domain do zadań usługi, gdy domeną publiczną jest adres .local serwera.',
    fr_FR:
      "Nécessite StartOS 0.4.0.2. Une brève coupure réseau n'ajoute pas Set Public Domain aux tâches du service lorsque le domaine public est l'adresse .local du serveur.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
