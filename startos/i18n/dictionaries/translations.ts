import { LangDict } from './default'

export default {
  es_ES: {
    // main.ts
    0: '¡Iniciando Blossom Server!',
    1: 'Blossom Server',
    2: 'Blossom Server está listo',
    3: 'Blossom Server no está listo',

    // interfaces.ts
    4: 'Punto de acceso público de Blossom — acepta subidas y descargas de blobs y las APIs del protocolo BUD. Los clientes Nostr se conectan a esta URL.',
    5: 'Panel de administración',
    6: 'Panel de operador para explorar blobs, editar reglas de almacenamiento, gestionar usuarios y revisar informes. Protegido con autenticación HTTP básica.',

    // setAdminPassword + showAdminCredentials
    10: 'Establecer contraseña de administrador',
    11: 'Genera una nueva contraseña aleatoria para el panel de administración. Reemplaza cualquier contraseña existente.',
    12: 'Credenciales del panel de administración',
    13: 'Usa estas credenciales para iniciar sesión en el panel de administración en /admin.',
    14: 'Usuario',
    15: 'Contraseña',
    16: 'Mostrar credenciales de administrador',
    17: 'Muestra el usuario y la contraseña actuales del panel de administración.',
    18: 'No se ha establecido ninguna contraseña de administrador. Ejecuta "Establecer contraseña de administrador" para generar una.',

    // setPrimaryUrl
    20: 'Dominio público',
    21: 'El nombre de host que los clientes usarán para acceder a este servidor Blossom. Se devuelve en cada URL de descriptor de blob y se valida contra la etiqueta "server" de BUD-11 en los eventos de autenticación Nostr.',
    22: 'Establecer dominio público',
    23: 'Elige cuál de los nombres de host de este servidor es el canónico. Las URLs de blobs devueltas a los clientes usarán este nombre, y los eventos de autenticación Nostr se validarán contra él.',

    // setUploadLimit
    30: 'Tamaño máximo de subida (MB)',
    31: 'Archivo más grande que el servidor guarda tal como se envía, ya sea subido o copiado desde otro servidor.',
    32: 'Establecer tamaño máximo de subida',
    33: 'Cambia el archivo más grande que guarda el servidor y el más grande que optimizará.',
    34: 'Tamaño máximo para optimizar (MB)',
    35: 'Archivo más grande que un cliente puede enviar para que el servidor lo optimice antes de guardarlo, como hace la página de inicio con "Optimize media" marcado. Optimizar un vídeo grande lleva mucho tiempo de procesamiento.',

    // togglePrivateMode
    40: 'Activar modo privado',
    41: 'Desactivar modo privado',
    42: 'El modo privado está ACTIVADO actualmente — solo las pubkeys de tu lista permitida pueden subir contenido y se rechazan los informes. Ejecuta esta acción para permitir cualquier pubkey autenticada y aceptar informes de cualquiera. Tu lista permitida se conserva para cuando vuelvas a activar el modo privado.',
    43: 'El modo privado está DESACTIVADO actualmente — cualquier pubkey Nostr autenticada puede subir contenido y cualquiera puede enviar un informe sobre un archivo almacenado. Ejecuta esta acción para restringir las subidas a tu lista permitida y rechazar los informes.',
    44: 'El modo privado está DESACTIVADO actualmente. Añade al menos una pubkey mediante "Gestionar pubkeys permitidas" antes de activarlo.',
    46: 'No se puede activar el modo privado: la lista de pubkeys permitidas está vacía. Añade al menos una pubkey mediante "Gestionar pubkeys permitidas" primero.',
    47: 'Cualquiera que pueda acceder a este servidor podrá subir archivos a él y enviar informes sobre los archivos que almacena.',

    // toggleOwnerlessCleanup
    50: 'Activar limpieza de blobs sin dueño',
    51: 'Desactivar limpieza de blobs sin dueño',
    52: 'La limpieza de blobs sin dueño está ACTIVADA actualmente — los blobs sin propietarios restantes se eliminan en cada ciclo de purga, independientemente de las reglas de retención. Ejecuta esta acción para conservar los blobs sin dueño.',
    53: 'La limpieza de blobs sin dueño está DESACTIVADA actualmente — los blobs solo se eliminan cuando expira su regla de retención, incluso si ningún usuario Nostr reclama la propiedad. Ejecuta esta acción para eliminar también los blobs sin dueño inmediatamente.',

    // setAllowedPubkeys
    80: 'Pubkeys permitidas',
    81: 'Claves públicas Nostr autorizadas para subir contenido cuando el modo privado está activado, en formato npub o hexadecimal. Déjala vacía para eliminar la lista.',
    82: 'Un npub, o 64 caracteres hexadecimales en minúscula (0–9, a–f).',
    83: 'Gestionar pubkeys permitidas',
    84: 'Edita la lista de pubkeys Nostr autorizadas para subir contenido cuando el modo privado está activado. Las reglas añadidas en el panel de administración no se modifican.',

    // toggleFileListing
    100: 'Activar listado de archivos',
    101: 'Desactivar listado de archivos',
    102: 'El listado de archivos está ACTIVADO: un cliente Nostr que haya iniciado sesión con una clave puede listar los archivos que subió esa clave. Ejecuta esta acción para desactivarlo.',
    103: 'El listado de archivos está DESACTIVADO. Ejecuta esta acción para que un cliente Nostr que haya iniciado sesión con una clave pueda listar los archivos que subió esa clave. Algunos clientes de Blossom lo necesitan para mostrar tus archivos.',

    // setLandingPage
    104: 'Personalizar página de inicio',
    105: 'Establece el título de la página que ven los visitantes en la dirección de este servidor y si muestra las estadísticas del servidor.',
    106: 'Título',
    107: 'El nombre que aparece en la parte superior de la página de inicio y en la pestaña del navegador.',
    108: 'Mostrar estadísticas del servidor',
    109: 'Muestra cuántos archivos guarda el servidor, el almacenamiento que ocupan y las subidas de las últimas 24 horas.',

    // init watchers
    90: 'Establece una contraseña de administrador antes de iniciar sesión en /admin',
    91: 'Elige un dominio público para que Blossom pueda construir URLs de blobs para los clientes',
    92: 'El dominio público configurado ya no está disponible. Selecciona uno nuevo.',
    93: 'Añade al menos una pubkey permitida antes de que alguien pueda subir contenido — el modo privado está activado pero la lista de permitidos está vacía.',
  },
  de_DE: {
    // main.ts
    0: 'Blossom Server wird gestartet!',
    1: 'Blossom Server',
    2: 'Blossom Server ist bereit',
    3: 'Blossom Server ist nicht bereit',

    // interfaces.ts
    4: 'Öffentlicher Blossom-Endpunkt — nimmt Blob-Uploads und -Downloads sowie die APIs des BUD-Protokolls entgegen. Nostr-Clients verbinden sich mit dieser URL.',
    5: 'Admin-Dashboard',
    6: 'Betreiber-Dashboard zum Durchsuchen von Blobs, Bearbeiten von Speicherregeln, Verwalten von Nutzern und Prüfen von Meldungen. Geschützt durch HTTP-Basic-Auth.',

    // setAdminPassword + showAdminCredentials
    10: 'Admin-Passwort festlegen',
    11: 'Erzeugt ein neues zufälliges Passwort für das Admin-Dashboard. Ersetzt ein vorhandenes Passwort.',
    12: 'Zugangsdaten für das Admin-Dashboard',
    13: 'Mit diesen Zugangsdaten meldest du dich im Admin-Dashboard unter /admin an.',
    14: 'Benutzername',
    15: 'Passwort',
    16: 'Admin-Zugangsdaten anzeigen',
    17: 'Zeigt den aktuellen Benutzernamen und das Passwort des Admin-Dashboards an.',
    18: 'Es wurde noch kein Admin-Passwort festgelegt. Führe „Admin-Passwort festlegen“ aus, um eines zu erzeugen.',

    // setPrimaryUrl
    20: 'Öffentliche Domain',
    21: 'Der Hostname, über den Clients diesen Blossom-Server erreichen. Er wird in jeder Blob-Descriptor-URL zurückgegeben und mit dem BUD-11-Tag „server“ in Nostr-Auth-Events abgeglichen.',
    22: 'Öffentliche Domain festlegen',
    23: 'Wähle, welcher Hostname dieses Servers der kanonische ist. Blob-URLs, die an Clients zurückgegeben werden, verwenden diesen Hostnamen, und Nostr-Auth-Events werden mit ihm abgeglichen.',

    // setUploadLimit
    30: 'Maximale Upload-Größe (MB)',
    31: 'Größte Datei, die der Server unverändert speichert, ob hochgeladen oder von einem anderen Server gespiegelt.',
    32: 'Maximale Upload-Größe festlegen',
    33: 'Ändert die größte Datei, die der Server speichert, und die größte, die er optimiert.',
    34: 'Maximale Größe zur Optimierung (MB)',
    35: 'Größte Datei, die ein Client senden darf, damit der Server sie vor dem Speichern optimiert, wie es die Startseite bei aktiviertem „Optimize media“ tut. Das Optimieren eines großen Videos braucht viel Rechenzeit.',

    // togglePrivateMode
    40: 'Privatmodus aktivieren',
    41: 'Privatmodus deaktivieren',
    42: 'Der Privatmodus ist derzeit AN — nur die Pubkeys auf deiner Zulassungsliste dürfen hochladen, und Meldungen werden abgelehnt. Führe diese Aktion aus, um jeden authentifizierten Pubkey zuzulassen und Meldungen von allen anzunehmen. Deine Zulassungsliste bleibt erhalten, bis du den Privatmodus wieder einschaltest.',
    43: 'Der Privatmodus ist derzeit AUS — jeder authentifizierte Nostr-Pubkey darf hochladen, und jeder darf eine gespeicherte Datei melden. Führe diese Aktion aus, um Uploads auf deine Zulassungsliste zu beschränken und Meldungen abzulehnen.',
    44: 'Der Privatmodus ist derzeit AUS. Füge über „Zugelassene Pubkeys verwalten“ mindestens einen Pubkey hinzu, bevor du ihn aktivierst.',
    46: 'Privatmodus kann nicht aktiviert werden: Die Liste der zugelassenen Pubkeys ist leer. Füge zuerst über „Zugelassene Pubkeys verwalten“ mindestens einen Pubkey hinzu.',
    47: 'Jeder, der diesen Server erreichen kann, kann Dateien darauf hochladen und die gespeicherten Dateien melden.',

    // toggleOwnerlessCleanup
    50: 'Bereinigung besitzerloser Blobs aktivieren',
    51: 'Bereinigung besitzerloser Blobs deaktivieren',
    52: 'Die Bereinigung besitzerloser Blobs ist derzeit AN — Blobs ohne verbleibende Besitzer werden bei jedem Prune-Durchlauf gelöscht, unabhängig von den Aufbewahrungsregeln. Führe diese Aktion aus, um besitzerlose Blobs zu behalten.',
    53: 'Die Bereinigung besitzerloser Blobs ist derzeit AUS — Blobs werden nur gelöscht, wenn ihre Aufbewahrungsregel abläuft, auch wenn kein Nostr-Nutzer sie mehr beansprucht. Führe diese Aktion aus, um besitzerlose Blobs zusätzlich sofort zu löschen.',

    // setAllowedPubkeys
    80: 'Zugelassene Pubkeys',
    81: 'Öffentliche Nostr-Schlüssel, die bei aktivem Privatmodus hochladen dürfen, als npub oder Hex. Leer lassen, um die Liste zu entfernen.',
    82: 'Ein npub oder 64 hexadezimale Kleinbuchstaben (0–9, a–f).',
    83: 'Zugelassene Pubkeys verwalten',
    84: 'Bearbeite die Liste der Nostr-Pubkeys, die bei aktivem Privatmodus hochladen dürfen. Im Admin-Dashboard hinzugefügte Regeln bleiben unverändert.',

    // toggleFileListing
    100: 'Dateiliste aktivieren',
    101: 'Dateiliste deaktivieren',
    102: 'Die Dateiliste ist derzeit AN — ein Nostr-Client, der mit einem Schlüssel angemeldet ist, kann die Dateien auflisten, die dieser Schlüssel hochgeladen hat. Führe diese Aktion aus, um sie auszuschalten.',
    103: 'Die Dateiliste ist derzeit AUS. Führe diese Aktion aus, damit ein Nostr-Client, der mit einem Schlüssel angemeldet ist, die Dateien auflisten kann, die dieser Schlüssel hochgeladen hat. Manche Blossom-Clients brauchen das, um deine Dateien anzuzeigen.',

    // setLandingPage
    104: 'Startseite anpassen',
    105: 'Lege den Titel der Seite fest, die Besucher unter der Adresse dieses Servers sehen, und ob sie die Statistiken des Servers zeigt.',
    106: 'Titel',
    107: 'Der Name oben auf der Startseite und im Browser-Tab.',
    108: 'Serverstatistiken anzeigen',
    109: 'Zeigt, wie viele Dateien der Server enthält, wie viel Speicher sie belegen und die Uploads der letzten 24 Stunden.',

    // init watchers
    90: 'Lege ein Admin-Passwort fest, bevor du dich unter /admin anmeldest',
    91: 'Wähle eine öffentliche Domain, damit Blossom Blob-URLs für Clients erstellen kann',
    92: 'Die konfigurierte öffentliche Domain ist nicht mehr verfügbar. Wähle eine neue aus.',
    93: 'Füge mindestens einen zugelassenen Pubkey hinzu, bevor jemand hochladen kann — der Privatmodus ist an, aber die Zulassungsliste ist leer.',
  },
  pl_PL: {
    // main.ts
    0: 'Uruchamianie Blossom Server!',
    1: 'Blossom Server',
    2: 'Blossom Server jest gotowy',
    3: 'Blossom Server nie jest gotowy',

    // interfaces.ts
    4: 'Publiczny punkt dostępowy Blossom — przyjmuje wysyłanie i pobieranie blobów oraz API protokołu BUD. Klienty Nostr łączą się z tym adresem URL.',
    5: 'Panel administracyjny',
    6: 'Panel operatora do przeglądania blobów, edycji reguł przechowywania, zarządzania użytkownikami i przeglądania zgłoszeń. Chroniony uwierzytelnianiem HTTP Basic.',

    // setAdminPassword + showAdminCredentials
    10: 'Ustaw hasło administratora',
    11: 'Generuje nowe losowe hasło do panelu administracyjnego. Zastępuje dotychczasowe hasło.',
    12: 'Dane logowania do panelu administracyjnego',
    13: 'Użyj tych danych, aby zalogować się do panelu administracyjnego pod adresem /admin.',
    14: 'Nazwa użytkownika',
    15: 'Hasło',
    16: 'Pokaż dane logowania administratora',
    17: 'Wyświetla bieżącą nazwę użytkownika i hasło panelu administracyjnego.',
    18: 'Nie ustawiono hasła administratora. Uruchom „Ustaw hasło administratora”, aby je wygenerować.',

    // setPrimaryUrl
    20: 'Domena publiczna',
    21: 'Nazwa hosta, pod którą klienty łączą się z tym serwerem Blossom. Jest zwracana w każdym adresie URL deskryptora blobu i porównywana z tagiem „server” z BUD-11 w zdarzeniach uwierzytelniających Nostr.',
    22: 'Ustaw domenę publiczną',
    23: 'Wybierz, która nazwa hosta tego serwera jest kanoniczna. Adresy URL blobów zwracane klientom będą jej używać, a zdarzenia uwierzytelniające Nostr będą z nią porównywane.',

    // setUploadLimit
    30: 'Maksymalny rozmiar przesyłania (MB)',
    31: 'Największy plik, który serwer przechowuje w postaci, w jakiej go otrzymał, przesłany lub skopiowany z innego serwera.',
    32: 'Ustaw maksymalny rozmiar przesyłania',
    33: 'Zmienia największy plik, który serwer przechowuje, i największy, który zoptymalizuje.',
    34: 'Maksymalny rozmiar do optymalizacji (MB)',
    35: 'Największy plik, który klient może wysłać, aby serwer go zoptymalizował przed zapisaniem, tak jak robi to strona główna z zaznaczonym „Optimize media”. Optymalizacja dużego filmu zajmuje dużo czasu przetwarzania.',

    // togglePrivateMode
    40: 'Włącz tryb prywatny',
    41: 'Wyłącz tryb prywatny',
    42: 'Tryb prywatny jest obecnie WŁĄCZONY — przesyłać mogą tylko klucze publiczne z Twojej listy dozwolonych, a zgłoszenia są odrzucane. Uruchom tę akcję, aby dopuścić każdy uwierzytelniony klucz publiczny i przyjmować zgłoszenia od każdego. Twoja lista dozwolonych zostanie zachowana na czas ponownego włączenia trybu prywatnego.',
    43: 'Tryb prywatny jest obecnie WYŁĄCZONY — przesyłać może każdy uwierzytelniony klucz publiczny Nostr, a każdy może zgłosić przechowywany plik. Uruchom tę akcję, aby ograniczyć przesyłanie do listy dozwolonych i odrzucać zgłoszenia.',
    44: 'Tryb prywatny jest obecnie WYŁĄCZONY. Przed jego włączeniem dodaj co najmniej jeden klucz publiczny w „Zarządzaj dozwolonymi kluczami publicznymi”.',
    46: 'Nie można włączyć trybu prywatnego: lista dozwolonych kluczy publicznych jest pusta. Najpierw dodaj co najmniej jeden klucz publiczny w „Zarządzaj dozwolonymi kluczami publicznymi”.',
    47: 'Każdy, kto ma dostęp do tego serwera, będzie mógł przesyłać na niego pliki i zgłaszać przechowywane na nim pliki.',

    // toggleOwnerlessCleanup
    50: 'Włącz czyszczenie blobów bez właściciela',
    51: 'Wyłącz czyszczenie blobów bez właściciela',
    52: 'Czyszczenie blobów bez właściciela jest obecnie WŁĄCZONE — bloby, które nie mają już żadnego właściciela, są usuwane przy każdym cyklu czyszczenia, niezależnie od reguł retencji. Uruchom tę akcję, aby zachowywać bloby bez właściciela.',
    53: 'Czyszczenie blobów bez właściciela jest obecnie WYŁĄCZONE — bloby są usuwane dopiero po wygaśnięciu ich reguły retencji, nawet jeśli żaden użytkownik Nostr ich nie posiada. Uruchom tę akcję, aby od razu usuwać także bloby bez właściciela.',

    // setAllowedPubkeys
    80: 'Dozwolone klucze publiczne',
    81: 'Klucze publiczne Nostr, które mogą przesyłać pliki przy włączonym trybie prywatnym, jako npub lub w formacie szesnastkowym. Zostaw puste, aby usunąć listę.',
    82: 'npub lub 64 małe znaki szesnastkowe (0–9, a–f).',
    83: 'Zarządzaj dozwolonymi kluczami publicznymi',
    84: 'Edytuj listę kluczy publicznych Nostr, które mogą przesyłać pliki przy włączonym trybie prywatnym. Reguły dodane w panelu administratora pozostają bez zmian.',

    // toggleFileListing
    100: 'Włącz listę plików',
    101: 'Wyłącz listę plików',
    102: 'Lista plików jest obecnie WŁĄCZONA — klient Nostr zalogowany kluczem może wyświetlić listę plików przesłanych tym kluczem. Uruchom tę akcję, aby ją wyłączyć.',
    103: 'Lista plików jest obecnie WYŁĄCZONA. Uruchom tę akcję, aby klient Nostr zalogowany kluczem mógł wyświetlić listę plików przesłanych tym kluczem. Niektóre klienty Blossom potrzebują tego, aby pokazać twoje pliki.',

    // setLandingPage
    104: 'Dostosuj stronę główną',
    105: 'Ustaw tytuł strony, którą odwiedzający widzą pod adresem tego serwera, oraz to, czy pokazuje statystyki serwera.',
    106: 'Tytuł',
    107: 'Nazwa wyświetlana u góry strony głównej i na karcie przeglądarki.',
    108: 'Pokaż statystyki serwera',
    109: 'Pokazuje, ile plików przechowuje serwer, ile miejsca zajmują i ile przesłano w ciągu ostatnich 24 godzin.',

    // init watchers
    90: 'Ustaw hasło administratora przed zalogowaniem się do /admin',
    91: 'Wybierz domenę publiczną, aby Blossom mógł tworzyć adresy URL blobów dla klientów',
    92: 'Skonfigurowana domena publiczna nie jest już dostępna. Wybierz nową.',
    93: 'Dodaj co najmniej jeden dozwolony klucz publiczny, zanim ktokolwiek będzie mógł przesyłać pliki — tryb prywatny jest włączony, ale lista dozwolonych jest pusta.',
  },
  fr_FR: {
    // main.ts
    0: 'Démarrage de Blossom Server !',
    1: 'Blossom Server',
    2: 'Blossom Server est prêt',
    3: "Blossom Server n'est pas prêt",

    // interfaces.ts
    4: 'Point de terminaison Blossom public — accepte les téléversements et téléchargements de blobs ainsi que les API du protocole BUD. Les clients Nostr se connectent à cette URL.',
    5: "Tableau de bord d'administration",
    6: "Tableau de bord de l'opérateur pour parcourir les blobs, modifier les règles de stockage, gérer les utilisateurs et examiner les signalements. Protégé par une authentification HTTP Basic.",

    // setAdminPassword + showAdminCredentials
    10: 'Définir le mot de passe administrateur',
    11: "Génère un nouveau mot de passe aléatoire pour le tableau de bord d'administration. Remplace le mot de passe existant.",
    12: "Identifiants du tableau de bord d'administration",
    13: "Utilisez ces identifiants pour vous connecter au tableau de bord d'administration à l'adresse /admin.",
    14: "Nom d'utilisateur",
    15: 'Mot de passe',
    16: 'Afficher les identifiants administrateur',
    17: "Affiche le nom d'utilisateur et le mot de passe actuels du tableau de bord d'administration.",
    18: "Aucun mot de passe administrateur n'a été défini. Exécutez « Définir le mot de passe administrateur » pour en générer un.",

    // setPrimaryUrl
    20: 'Domaine public',
    21: "Le nom d'hôte que les clients utilisent pour joindre ce serveur Blossom. Il figure dans chaque URL de descripteur de blob et est comparé à la balise « server » de BUD-11 dans les événements d'authentification Nostr.",
    22: 'Définir le domaine public',
    23: "Choisissez lequel des noms d'hôte de ce serveur est canonique. Les URL de blobs renvoyées aux clients utiliseront ce nom d'hôte, et les événements d'authentification Nostr seront validés par rapport à lui.",

    // setUploadLimit
    30: 'Taille maximale de téléversement (Mo)',
    31: "Plus gros fichier que le serveur stocke tel quel, qu'il soit téléversé ou copié depuis un autre serveur.",
    32: 'Définir la taille maximale de téléversement',
    33: "Modifie le plus gros fichier que le serveur stocke et le plus gros qu'il optimisera.",
    34: "Taille maximale pour l'optimisation (Mo)",
    35: "Plus gros fichier qu'un client peut envoyer pour que le serveur l'optimise avant de le stocker, comme le fait la page d'accueil lorsque « Optimize media » est coché. Optimiser une grosse vidéo demande beaucoup de temps de traitement.",

    // togglePrivateMode
    40: 'Activer le mode privé',
    41: 'Désactiver le mode privé',
    42: 'Le mode privé est actuellement ACTIVÉ — seules les pubkeys de votre liste autorisée peuvent téléverser, et les signalements sont refusés. Exécutez cette action pour autoriser toute pubkey authentifiée et accepter les signalements de quiconque. Votre liste autorisée est conservée pour le moment où vous réactiverez le mode privé.',
    43: "Le mode privé est actuellement DÉSACTIVÉ — toute pubkey Nostr authentifiée peut téléverser, et n'importe qui peut signaler un fichier stocké. Exécutez cette action pour limiter les téléversements à votre liste autorisée et refuser les signalements.",
    44: 'Le mode privé est actuellement DÉSACTIVÉ. Ajoutez au moins une pubkey via « Gérer les pubkeys autorisées » avant de l’activer.',
    46: "Impossible d'activer le mode privé : la liste des pubkeys autorisées est vide. Ajoutez d'abord au moins une pubkey via « Gérer les pubkeys autorisées ».",
    47: 'Toute personne pouvant joindre ce serveur pourra y téléverser des fichiers et signaler les fichiers qu’il stocke.',

    // toggleOwnerlessCleanup
    50: 'Activer le nettoyage des blobs sans propriétaire',
    51: 'Désactiver le nettoyage des blobs sans propriétaire',
    52: "Le nettoyage des blobs sans propriétaire est actuellement ACTIVÉ — les blobs qui n'ont plus de propriétaire sont supprimés à chaque cycle de purge, quelles que soient les règles de rétention. Exécutez cette action pour conserver les blobs sans propriétaire.",
    53: "Le nettoyage des blobs sans propriétaire est actuellement DÉSACTIVÉ — les blobs ne sont supprimés qu'à l'expiration de leur règle de rétention, même si aucun utilisateur Nostr ne les possède. Exécutez cette action pour supprimer aussi immédiatement les blobs sans propriétaire.",

    // setAllowedPubkeys
    80: 'Pubkeys autorisées',
    81: 'Clés publiques Nostr autorisées à téléverser lorsque le mode privé est activé, au format npub ou hexadécimal. Laissez vide pour supprimer la liste.',
    82: 'Un npub, ou 64 caractères hexadécimaux en minuscules (0–9, a–f).',
    83: 'Gérer les pubkeys autorisées',
    84: "Modifiez la liste des pubkeys Nostr autorisées à téléverser lorsque le mode privé est activé. Les règles ajoutées dans le tableau de bord d'administration restent inchangées.",

    // toggleFileListing
    100: 'Activer la liste des fichiers',
    101: 'Désactiver la liste des fichiers',
    102: 'La liste des fichiers est actuellement ACTIVÉE — un client Nostr connecté avec une clé peut lister les fichiers téléversés par cette clé. Exécutez cette action pour la désactiver.',
    103: 'La liste des fichiers est actuellement DÉSACTIVÉE. Exécutez cette action pour permettre à un client Nostr connecté avec une clé de lister les fichiers téléversés par cette clé. Certains clients Blossom en ont besoin pour afficher vos fichiers.',

    // setLandingPage
    104: "Personnaliser la page d'accueil",
    105: "Définissez le titre de la page que les visiteurs voient à l'adresse de ce serveur, et si elle affiche les statistiques du serveur.",
    106: 'Titre',
    107: "Le nom affiché en haut de la page d'accueil et dans l'onglet du navigateur.",
    108: 'Afficher les statistiques du serveur',
    109: "Affiche combien de fichiers le serveur contient, l'espace qu'ils occupent et les téléversements des dernières 24 heures.",

    // init watchers
    90: 'Définissez un mot de passe administrateur avant de vous connecter à /admin',
    91: 'Choisissez un domaine public pour que Blossom puisse construire les URL de blobs pour les clients',
    92: "Le domaine public configuré n'est plus disponible. Sélectionnez-en un nouveau.",
    93: 'Ajoutez au moins une pubkey autorisée avant que quiconque puisse téléverser — le mode privé est activé, mais la liste autorisée est vide.',
  },
} satisfies Record<string, LangDict>
