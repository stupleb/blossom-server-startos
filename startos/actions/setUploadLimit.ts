import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const BYTES_PER_MB = 1024 * 1024

const inputSpec = InputSpec.of({
  maxSizeMb: Value.number({
    name: i18n('Max Upload Size (MB)'),
    description: i18n(
      'Largest file the server stores as sent, whether uploaded or mirrored from another server.',
    ),
    required: true,
    default: 2048,
    min: 1,
    max: 102400,
    step: 1,
    integer: true,
    units: 'MB',
  }),
  mediaMaxSizeMb: Value.number({
    name: i18n('Max Size for Optimization (MB)'),
    description: i18n(
      'Largest file a client may send for the server to optimize before storing it, as the landing page does with "Optimize media" ticked. Optimizing a large video takes a lot of processing time.',
    ),
    required: true,
    default: 1024,
    min: 1,
    max: 102400,
    step: 1,
    integer: true,
    units: 'MB',
  }),
})

export const setUploadLimit = sdk.Action.withInput(
  'set-upload-limit',

  async () => ({
    name: i18n('Set Max Upload Size'),
    description: i18n(
      'Change the largest file the server stores, and the largest it will optimize.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) =>
    (await configYaml
      .read(({ upload, media }) => ({
        maxSizeMb: Math.round(upload.maxSize / BYTES_PER_MB),
        mediaMaxSizeMb: Math.round(media.maxSize / BYTES_PER_MB),
      }))
      .once()) ?? undefined,

  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      upload: { maxSize: input.maxSizeMb * BYTES_PER_MB },
      media: { maxSize: input.mediaMaxSizeMb * BYTES_PER_MB },
    })
  },
)
