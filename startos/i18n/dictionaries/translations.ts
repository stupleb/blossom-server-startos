import { LangDict } from './default'

// Translations are optional — missing keys fall back to the default (English)
// dictionary. Contributions for other locales are welcome.
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
    6: 'Panel de operador para explorar blobs, gestionar usuarios y revisar informes. Protegido con autenticación HTTP básica.',

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
    31: 'Tamaño máximo de blob aceptado por el endpoint de subida. Se aplica a partir de la cabecera Content-Length antes de leer ningún byte del cuerpo.',
    32: 'Establecer tamaño máximo de subida',
    33: 'Cambia el tamaño máximo de blob aceptado por los endpoints de subida y de espejo.',

    // togglePrivateMode
    40: 'Activar modo privado',
    41: 'Desactivar modo privado',
    42: 'El modo privado está ACTIVADO actualmente — solo las pubkeys de tu lista permitida pueden subir contenido. Ejecuta esta acción para permitir cualquier pubkey autenticada.',
    43: 'El modo privado está DESACTIVADO actualmente — cualquier pubkey Nostr autenticada puede subir contenido. Ejecuta esta acción para restringir las subidas a tu lista permitida.',
    44: 'El modo privado está DESACTIVADO actualmente. Para activarlo, primero añade al menos una pubkey mediante "Gestionar pubkeys permitidas" — de lo contrario nadie podrá subir contenido.',
    45: 'La lista de pubkeys permitidas está vacía. Activar el modo privado ahora bloqueará a todos los usuarios. Añade pubkeys primero mediante "Gestionar pubkeys permitidas".',
    46: 'No se puede activar el modo privado: la lista de pubkeys permitidas está vacía. Añade al menos una pubkey mediante "Gestionar pubkeys permitidas" primero.',

    // toggleOwnerlessCleanup
    50: 'Activar limpieza de blobs sin dueño',
    51: 'Desactivar limpieza de blobs sin dueño',
    52: 'La limpieza de blobs sin dueño está ACTIVADA actualmente — los blobs sin propietarios restantes se eliminan en cada ciclo de purga, independientemente de las reglas de retención. Ejecuta esta acción para conservar los blobs sin dueño.',
    53: 'La limpieza de blobs sin dueño está DESACTIVADA actualmente — los blobs solo se eliminan cuando expira su regla de retención, incluso si ningún usuario Nostr reclama la propiedad. Ejecuta esta acción para eliminar también los blobs sin dueño inmediatamente.',

    // setRetentionPeriods
    60: 'Imágenes',
    61: 'Vídeos',
    62: 'Audio',
    63: 'Otros',
    64: 'Cuánto tiempo conservar blobs de imagen (image/*) tras su último acceso.',
    65: 'Cuánto tiempo conservar blobs de vídeo (video/*) tras su último acceso.',
    66: 'Cuánto tiempo conservar blobs de audio (audio/*) tras su último acceso.',
    67: 'Cuánto tiempo conservar blobs de cualquier otro tipo MIME tras su último acceso. Actúa como categoría general.',
    68: 'Establecer períodos de retención',
    69: 'Elige cuánto tiempo se conserva cada tipo de blob tras su último acceso. Los blobs cuyo tipo MIME no coincida con ninguna categoría usan el período "Otros".',
    70: 'Esta acción reescribe tus reglas de retención a exactamente cuatro categorías (Imágenes, Vídeos, Audio, Otros). Cualquier regla personalizada editada directamente en config.yml será reemplazada.',
    71: 'Formato: "<número> <unidad>" donde la unidad es second, minute, hour, day, week, month o year (en inglés, con o sin "s" final). Ejemplos: "1 week", "30 days", "1 month".',

    // setAllowedPubkeys
    80: 'Pubkeys permitidas',
    81: 'Claves públicas Nostr codificadas en hexadecimal autorizadas para subir contenido cuando el modo privado está activado. Visita https://damus.io/key/ para convertir una npub a hexadecimal. Déjalo vacío para eliminar la lista.',
    82: '64 caracteres hexadecimales en minúscula (0–9, a–f). Usa damus.io/key/ para convertir desde npub.',
    83: 'Gestionar pubkeys permitidas',
    84: 'Edita la lista de pubkeys Nostr autorizadas para subir contenido cuando el modo privado está activado. La lista se aplica de forma uniforme a todas las categorías de retención.',

    // init watchers
    90: 'Establece una contraseña de administrador antes de iniciar sesión en /admin',
    91: 'Elige un dominio público para que Blossom pueda construir URLs de blobs para los clientes',
    92: 'El dominio público configurado ya no está disponible. Selecciona uno nuevo.',
    93: 'Añade al menos una pubkey permitida antes de que alguien pueda subir contenido — el modo privado está activado pero la lista de permitidos está vacía.',
  },
} satisfies Record<string, LangDict>
