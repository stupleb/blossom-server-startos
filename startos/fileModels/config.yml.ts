import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const DATA_DIR = '/app/data'
export const BLOBS_DIR = `${DATA_DIR}/blobs`
export const DB_PATH = `${DATA_DIR}/sqlite.db`

export const ruleShape = z.looseObject({
  type: z.string().catch('*'),
  expiration: z.string().catch('1 week'),
  pubkeys: z.array(z.string()).optional().catch(undefined),
  nip05Domains: z.array(z.string()).optional().catch(undefined),
  enabled: z.boolean().optional().catch(undefined),
  note: z.string().optional().catch(undefined),
})

const defaultRules = [
  { type: 'image/*', expiration: '1 month' },
  { type: 'video/*', expiration: '1 week' },
  { type: 'audio/*', expiration: '1 week' },
  { type: '*', expiration: '1 week' },
]

const localStorageShape = z.looseObject({
  dir: z.literal(BLOBS_DIR).catch(BLOBS_DIR),
})

const storageShape = z.looseObject({
  backend: z.literal('local').catch('local'),
  local: localStorageShape.catch(() => localStorageShape.parse({})),
  rules: z.array(ruleShape).catch(defaultRules),
  removeWhenNoOwners: z.boolean().catch(false),
})

const uploadShape = z.looseObject({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
  maxSize: z
    .number()
    .int()
    .positive()
    .catch(2 * 1024 * 1024 * 1024),
  requirePubkeyInRule: z.boolean().catch(true),
})

const mirrorShape = z.looseObject({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
})

const deleteShape = z.looseObject({
  requireAuth: z.boolean().catch(true),
})

const listShape = z.looseObject({
  enabled: z.boolean().catch(false),
  requireAuth: z.literal(true).catch(true),
  allowListOthers: z.literal(false).catch(false),
})

const landingShape = z.looseObject({
  enabled: z.literal(true).catch(true),
  title: z.string().catch('Blossom Server'),
  showStats: z.boolean().catch(true),
})

const mediaShape = z.looseObject({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
  requirePubkeyInRule: z.boolean().catch(true),
  maxSize: z
    .number()
    .int()
    .positive()
    .catch(1024 * 1024 * 1024),
})

const dashboardShape = z.looseObject({
  enabled: z.literal(true).catch(true),
  username: z.string().catch('admin'),
  password: z.string().catch(''),
})

const reportShape = z.looseObject({
  enabled: z.boolean().catch(false),
})

const networkShape = z.looseObject({
  trustedProxies: z.array(z.string()).catch([]),
  clientIpHeader: z.literal('x-forwarded-for').catch('x-forwarded-for'),
})

const databaseShape = z.looseObject({
  path: z.literal(DB_PATH).catch(DB_PATH),
})

const shape = z.looseObject({
  publicDomain: z.string().catch(''),
  host: z.literal('0.0.0.0').catch('0.0.0.0'),
  port: z.literal(3000).catch(3000),
  database: databaseShape.catch(() => databaseShape.parse({})),
  storage: storageShape.catch(() => storageShape.parse({})),
  upload: uploadShape.catch(() => uploadShape.parse({})),
  mirror: mirrorShape.catch(() => mirrorShape.parse({})),
  delete: deleteShape.catch(() => deleteShape.parse({})),
  list: listShape.catch(() => listShape.parse({})),
  landing: landingShape.catch(() => landingShape.parse({})),
  media: mediaShape.catch(() => mediaShape.parse({})),
  dashboard: dashboardShape.catch(() => dashboardShape.parse({})),
  report: reportShape.catch(() => reportShape.parse({})),
  network: networkShape.catch(() => networkShape.parse({})),
})

export const configYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: 'config.yml' },
  shape,
)

export type StorageRule = z.infer<typeof ruleShape>

export const ALLOWLIST_NOTE =
  'Allowed pubkeys: edited by the Manage Allowed Pubkeys action in StartOS'

export const isAllowlist = (rule: StorageRule) => rule.note === ALLOWLIST_NOTE

export const hasAllowlist = (rules: StorageRule[]) =>
  rules.some(
    (r) =>
      r.enabled !== false && !!(r.pubkeys?.length || r.nip05Domains?.length),
  )
