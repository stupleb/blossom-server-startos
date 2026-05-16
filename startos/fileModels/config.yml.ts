import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const DATA_DIR = '/app/data'
export const BLOBS_DIR = `${DATA_DIR}/blobs`
export const DB_PATH = `${DATA_DIR}/sqlite.db`
export const S3_TMP_DIR = `${DATA_DIR}/s3-tmp`

export const ruleShape = z.object({
  type: z.string().catch('*'),
  expiration: z.string().catch('1 week'),
  pubkeys: z.array(z.string()).optional().catch(undefined),
})

export const RULE_CATEGORIES = ['image/*', 'video/*', 'audio/*', '*'] as const
export type RuleCategory = (typeof RULE_CATEGORIES)[number]

export const defaultRules = [
  { type: 'image/*', expiration: '1 month' },
  { type: 'video/*', expiration: '1 week' },
  { type: 'audio/*', expiration: '1 week' },
  { type: '*', expiration: '1 week' },
]

const localStorageShape = z.object({
  dir: z.literal(BLOBS_DIR).catch(BLOBS_DIR),
})

const storageShape = z
  .object({
    backend: z.literal('local').catch('local'),
    local: localStorageShape.catch(() => localStorageShape.parse({})),
    rules: z.array(ruleShape).catch(defaultRules),
    removeWhenNoOwners: z.boolean().catch(false),
  })
  .catch(() =>
    z
      .object({
        backend: z.literal('local'),
        local: localStorageShape,
        rules: z.array(ruleShape),
        removeWhenNoOwners: z.boolean(),
      })
      .parse({
        backend: 'local',
        local: { dir: BLOBS_DIR },
        rules: defaultRules,
        removeWhenNoOwners: false,
      }),
  )

const uploadShape = z.object({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
  maxSize: z
    .number()
    .int()
    .positive()
    .catch(2 * 1024 * 1024 * 1024),
  requirePubkeyInRule: z.boolean().catch(true),
})

const mirrorShape = z.object({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
})

const deleteShape = z.object({
  requireAuth: z.boolean().catch(true),
})

const listShape = z.object({
  enabled: z.boolean().catch(false),
  requireAuth: z.boolean().catch(false),
  allowListOthers: z.boolean().catch(true),
})

const landingShape = z.object({
  enabled: z.literal(true).catch(true),
  title: z.string().catch('Blossom Server'),
})

const mediaShape = z.object({
  enabled: z.boolean().catch(true),
  requireAuth: z.boolean().catch(true),
  maxSize: z
    .number()
    .int()
    .positive()
    .catch(1024 * 1024 * 1024),
})

const dashboardShape = z.object({
  enabled: z.literal(true).catch(true),
  username: z.string().catch('admin'),
  password: z.string().catch(''),
})

const reportShape = z.object({
  enabled: z.boolean().catch(true),
})

const databaseShape = z.object({
  path: z.literal(DB_PATH).catch(DB_PATH),
})

const shape = z.object({
  publicDomain: z.string().catch(''),
  host: z.literal('0.0.0.0').catch('0.0.0.0'),
  port: z.literal(3000).catch(3000),
  database: databaseShape.catch(() => databaseShape.parse({})),
  storage: storageShape,
  upload: uploadShape.catch(() => uploadShape.parse({})),
  mirror: mirrorShape.catch(() => mirrorShape.parse({})),
  delete: deleteShape.catch(() => deleteShape.parse({})),
  list: listShape.catch(() => listShape.parse({})),
  landing: landingShape.catch(() => landingShape.parse({})),
  media: mediaShape.catch(() => mediaShape.parse({})),
  dashboard: dashboardShape.catch(() => dashboardShape.parse({})),
  report: reportShape.catch(() => reportShape.parse({})),
})

export const configYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: 'config.yml' },
  shape,
)

export type StorageRule = z.infer<typeof ruleShape>
